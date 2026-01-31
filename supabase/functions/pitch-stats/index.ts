import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all pitches for aggregate statistics
    const { data: pitches, error: pitchesError } = await supabase
      .from("pitches")
      .select("*")
      .order("created_at", { ascending: false });

    if (pitchesError) {
      throw pitchesError;
    }

    // Calculate statistics
    const totalPitches = pitches?.length || 0;
    const totalValue = pitches?.reduce((sum, p) => sum + (parseFloat(p.asking_price) || 0), 0) || 0;
    const totalViews = pitches?.reduce((sum, p) => sum + (p.views || 0), 0) || 0;
    const completedPitches = pitches?.filter(p => p.status === 'completed').length || 0;
    const inProgressPitches = pitches?.filter(p => p.status === 'in_progress').length || 0;

    // Calculate property type distribution
    const propertyTypes: Record<string, number> = {};
    pitches?.forEach(p => {
      const type = p.property_type || 'other';
      propertyTypes[type] = (propertyTypes[type] || 0) + 1;
    });

    // Get top 5 recent pitches
    const recentPitches = pitches?.slice(0, 5).map(p => ({
      id: p.id,
      title: p.title,
      propertyName: p.property_name,
      location: `${p.city}, ${p.state}`,
      value: p.asking_price,
      status: p.status,
      views: p.views,
      createdAt: p.created_at,
    })) || [];

    // Calculate weekly views (simulated trending data)
    const weeklyData = [
      { day: "Mon", views: Math.floor(totalViews * 0.12) },
      { day: "Tue", views: Math.floor(totalViews * 0.15) },
      { day: "Wed", views: Math.floor(totalViews * 0.13) },
      { day: "Thu", views: Math.floor(totalViews * 0.18) },
      { day: "Fri", views: Math.floor(totalViews * 0.14) },
      { day: "Sat", views: Math.floor(totalViews * 0.20) },
      { day: "Sun", views: Math.floor(totalViews * 0.08) },
    ];

    const stats = {
      totalPitches,
      totalValue,
      totalViews,
      completedPitches,
      inProgressPitches,
      conversionRate: totalPitches > 0 ? Math.round((completedPitches / totalPitches) * 100) : 0,
      propertyTypes,
      recentPitches,
      weeklyData,
      lastUpdated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    console.error("Error fetching pitch stats:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
