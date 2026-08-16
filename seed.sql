-- Run this in your Supabase SQL Editor to enable access to the site_settings table and seed the initial data.

-- 1. Enable RLS and add public policies for site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public update site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public delete site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated update site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated delete site_settings" ON public.site_settings;

CREATE POLICY "Allow public select site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert site_settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update site_settings" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete site_settings" ON public.site_settings FOR DELETE TO authenticated USING (true);

-- 2. Seed initial data
INSERT INTO public.site_settings (key, value) VALUES 
('branding.company_name', '"Standby Computer Program Devices LLC"'),
('branding.brand_name', '"ZMAMTECH"'),
('homepage.hero_badge', '"20+ Years of Software Excellence"'),
('homepage.hero_heading', '"Transforming ideas into scalable, robust Software, Trusted since 2006 to deliver innovative results."'),
('homepage.hero_description', '"At Standby Computer Program Devices LLC, we are dedicated to transforming your ideas into reality with our cutting edge software solutions. Based in the UAE, we have been at the forefront of the technology landscape for over 20 years, providing businesses with customized software development, Web Development, mobile applications, and enterprise solutions tailored to meet their unique needs."'),
('about.heading', '"About Us"'),
('about.content', '"Founded in 2006, Standby Computer Program Devices LLC with the brand name ZmamTech has been a pioneering force in software development across the UAE, Oman and Pakistan, delivering cutting edge solutions to businesses of all sizes. With over 18 years of expertise, we specialize in custom software, Web Solutions, mobile applications, and enterprise solutions that drive digital transformation and enhance operational efficiency.\n\nWe combine technical innovation with industry insights to create tailor made solutions that align with the unique needs of our clients. We pride ourselves on our ability to stay ahead of emerging technologies, ensuring that we deliver future proof software that boosts productivity and accelerates business growth.\n\nAt Standby Computer Program Devices LLC, we are committed to excellence, transparency, and customer satisfaction. Our mission is to empower businesses with robust, scalable, and user friendly technology that drives success in an ever evolving digital landscape.\n\nWhether you''re looking for custom software development, Web Solution, cloud solutions or IT consultancy, our team is here to help you innovate and achieve your business goals."'),
('about.values', '[{"title": "Expertise and Experience", "description": "With a proven track record since 2006, our skilled professionals bring a wealth of knowledge and expertise to every project."}, {"title": "Client Centric Approach", "description": "We prioritize our client’s needs, ensuring that we deliver solutions that align with their goals and expectations."}, {"title": "Innovative Technologies", "description": "We stay ahead of the curve by incorporating the latest technologies and best practices into our development processes."}, {"title": "Ongoing Support", "description": "Our relationship doesn’t end with project delivery. We offer continuous support and maintenance to ensure your systems run smoothly."}]'),
('contact.heading', '"Let''s Get Started!"'),
('contact.description', '"Ready to elevate your business with our software solutions? Contact us today to discuss your project and discover how we can help you achieve your goals."'),
('contact.email', '"abidshzhad786@gmail.com"'),
('contact.phone', '"+971 6 5283763"'),
('contact.mobile', '"+971 58 2293724"'),
('contact.address', '"Um Al Tarfa Street, Ibrahim Building, Office No B 168, Floor No 1, Sharjah, UAE"'),
('contact.latitude', '"25.352892771771778"'),
('contact.longitude', '"55.38730674229798"'),
('social.facebook', '""'),
('social.twitter', '""'),
('social.linkedin', '""'),
('footer.description', '"At Standby Computer Program Devices LLC, we are dedicated to transforming your ideas into reality with our cutting edge software solutions."')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
