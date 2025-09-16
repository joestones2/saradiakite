-- Create songs table for Sara's music
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  audio_url TEXT,
  spotify_url TEXT,
  download_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (songs are public content)
CREATE POLICY "Songs are viewable by everyone" 
ON public.songs 
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
CREATE TRIGGER update_songs_updated_at
BEFORE UPDATE ON public.songs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert Sara's initial songs
INSERT INTO public.songs (title, description, duration, audio_url, spotify_url, download_url, is_featured) VALUES
('Duba bɛ na la', 'Un hymne puissant de louange en bambara qui célèbre la grandeur divine', '4:32', '/files/duba_be_na_la.mp3', 'https://open.spotify.com/track/example1', '/files/duba_be_na_la.mp3', true),
('Yesu Kununa (Live)', 'Performance live captivante qui transporte l''auditeur dans une atmosphère de recueillement', '5:18', '/files/yesu_kununa.mp3', 'https://open.spotify.com/track/example2', '/files/yesu_kununa.mp3', true);