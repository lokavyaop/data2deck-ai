import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, quality } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use high-quality model for better images, or fast model for quick generation
    const model = quality === "high" 
      ? "google/gemini-3-pro-image-preview" 
      : "google/gemini-2.5-flash-image";

    console.log(`Generating image with model: ${model}, prompt: ${prompt}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: `Generate a professional, high-quality real estate visualization image: ${prompt}. The image should be photorealistic, modern, and suitable for a professional real estate pitch deck presentation.`
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response structure:", JSON.stringify(data, null, 2));

    // Try multiple paths to find the image
    let imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    // Also check for inline_data format
    if (!imageUrl && data.choices?.[0]?.message?.images?.[0]?.inline_data) {
      const inlineData = data.choices[0].message.images[0].inline_data;
      imageUrl = `data:${inlineData.mime_type || 'image/png'};base64,${inlineData.data}`;
    }

    // Check content array format
    if (!imageUrl && Array.isArray(data.choices?.[0]?.message?.content)) {
      const imagePart = data.choices[0].message.content.find((part: any) => 
        part.type === 'image_url' || part.image_url || part.inline_data
      );
      if (imagePart?.image_url?.url) {
        imageUrl = imagePart.image_url.url;
      } else if (imagePart?.inline_data) {
        imageUrl = `data:${imagePart.inline_data.mime_type || 'image/png'};base64,${imagePart.inline_data.data}`;
      }
    }

    const textResponse = typeof data.choices?.[0]?.message?.content === 'string' 
      ? data.choices[0].message.content 
      : "Image generated successfully";

    if (!imageUrl) {
      console.error("Could not find image in response:", JSON.stringify(data));
      throw new Error("No image found in AI response");
    }

    console.log("Successfully extracted image URL (length:", imageUrl.length, ")");

    return new Response(
      JSON.stringify({ 
        imageUrl,
        description: textResponse || "Image generated successfully"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
