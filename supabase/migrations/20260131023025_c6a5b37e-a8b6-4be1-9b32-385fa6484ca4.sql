-- Create pitches table for storing user pitch decks
CREATE TABLE public.pitches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  property_name TEXT,
  property_type TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  asking_price DECIMAL(15, 2),
  square_footage INTEGER,
  year_built INTEGER,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed')),
  views INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pitches ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own pitches" 
ON public.pitches 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pitches" 
ON public.pitches 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pitches" 
ON public.pitches 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pitches" 
ON public.pitches 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create policy for public stats (aggregated data only)
CREATE POLICY "Anyone can view pitch stats for public display"
ON public.pitches
FOR SELECT
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pitches_updated_at
BEFORE UPDATE ON public.pitches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_pitches_user_id ON public.pitches(user_id);
CREATE INDEX idx_pitches_status ON public.pitches(status);
CREATE INDEX idx_pitches_created_at ON public.pitches(created_at DESC);

-- Insert some sample data for demonstration
INSERT INTO public.pitches (user_id, title, property_name, property_type, address, city, state, asking_price, square_footage, year_built, status, views, description) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Manhattan Luxury Condo Development', 'Park Avenue Towers', 'commercial', '245 Park Avenue', 'New York', 'NY', 24500000, 125000, 2020, 'completed', 156, 'Premier Class A office tower in Midtown Manhattan'),
  ('00000000-0000-0000-0000-000000000001', 'Miami Beach Resort Investment', 'Ocean Vista Resort', 'hospitality', '100 Ocean Drive', 'Miami Beach', 'FL', 18200000, 85000, 2018, 'in_progress', 89, 'Beachfront luxury resort with art deco architecture'),
  ('00000000-0000-0000-0000-000000000001', 'San Francisco Tech Campus', 'Bay Innovation Hub', 'commercial', '1 Market Street', 'San Francisco', 'CA', 45000000, 200000, 2022, 'completed', 234, 'Sustainable tech campus with green rooftop'),
  ('00000000-0000-0000-0000-000000000002', 'Chicago Commercial Plaza', 'Magnificent Mile Center', 'commercial', '500 N Michigan Ave', 'Chicago', 'IL', 32100000, 150000, 2019, 'completed', 312, 'Prime retail and office space on Magnificent Mile'),
  ('00000000-0000-0000-0000-000000000002', 'Austin Mixed-Use Development', 'South Congress Lofts', 'mixed-use', '1000 S Congress Ave', 'Austin', 'TX', 15800000, 75000, 2021, 'completed', 178, 'Trendy mixed-use development in SoCo district'),
  ('00000000-0000-0000-0000-000000000003', 'Seattle Waterfront Property', 'Puget Sound Towers', 'residential', '100 Alaskan Way', 'Seattle', 'WA', 28500000, 120000, 2023, 'in_progress', 145, 'Luxury waterfront condominiums with mountain views'),
  ('00000000-0000-0000-0000-000000000003', 'Denver Industrial Park', 'Rocky Mountain Logistics', 'industrial', '5000 E 56th Ave', 'Denver', 'CO', 22000000, 250000, 2020, 'completed', 98, 'Modern industrial facility near DIA'),
  ('00000000-0000-0000-0000-000000000004', 'Boston Healthcare Facility', 'Longwood Medical Center', 'healthcare', '75 Francis St', 'Boston', 'MA', 42800000, 180000, 2022, 'completed', 267, 'State-of-the-art medical office building');