import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envFile = fs.readFileSync('.env.local', 'utf8')
const envConfig = {}
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envConfig[match[1]] = match[2].trim()
  }
})

const supabaseUrl = envConfig['NEXT_PUBLIC_SUPABASE_URL']
const supabaseKey = envConfig['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY']

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const initialSettings = [
  { key: 'branding.company_name', value: '"Standby Computer Program Devices LLC"' },
  { key: 'branding.brand_name', value: '"ZMAMTECH"' },
  
  { key: 'homepage.hero_badge', value: '"20+ Years of Software Excellence"' },
  { key: 'homepage.hero_heading', value: '"Transforming Ideas into Scalable, Robust Software"' },
  { key: 'homepage.hero_description', value: '"Trusted since 2006 to deliver innovative results. At Standby Computer Program Devices LLC, we transform ideas into reality with cutting-edge software solutions — from UAE to the world."' },
  { key: 'homepage.stat_experience', value: '"20+"' },
  { key: 'homepage.stat_clients', value: '"100+"' },
  { key: 'homepage.stat_countries', value: '"3"' },

  { key: 'about.heading', value: '"Building Digital Success Since 2006"' },
  { key: 'about.content', value: '"ZMAMTECH is the premier brand of **Standby Computer Program Devices LLC**, a leading software agency based in the UAE.\\n\\nWith over 20 years of experience, we specialize in designing and building scalable digital solutions for clients globally.\\n\\nOur team combines deep technical expertise with creative thinking to deliver solutions that not only look stunning but also perform exceptionally. Operating across the UAE, Oman, and Pakistan, we bring world-class enterprise software development to your doorstep."' },
  
  { key: 'about.values', value: [
      {
        title: "Quality First",
        description: "We never compromise on code quality, design standards, or user experience."
      },
      {
        title: "Client Partnership",
        description: "We work as an extension of your team, deeply invested in your success."
      },
      {
        title: "Innovation",
        description: "We stay ahead of the curve, leveraging the latest technologies and best practices."
      },
      {
        title: "Transparency",
        description: "Open communication, honest timelines, and clear expectations — always."
      }
    ] 
  },
  { key: 'about.stats', value: [
      { value: "100+", label: "Clients Served" },
      { value: "3", label: "Countries Served" },
      { value: "20+", label: "Years Experience" },
      { value: "98%", label: "Client Satisfaction" }
    ] 
  },

  { key: 'contact.heading', value: '"Let\'s Start a Conversation"' },
  { key: 'contact.description', value: '"Have a project in mind or need expert advice? Reach out to us, and we\'ll help you build the perfect solution."' },
  { key: 'contact.email', value: '"contact@zmamtech.com"' },
  { key: 'contact.phone', value: '"+971 4 123 4567"' },
  { key: 'contact.mobile', value: '"+971 50 123 4567"' },
  { key: 'contact.address', value: '"Standby Computer Program Devices LLC\\nDubai, United Arab Emirates"' },
  { key: 'contact.latitude', value: '"25.2048"' },
  { key: 'contact.longitude', value: '"55.2708"' },
  { key: 'contact.whatsapp', value: '"+971501234567"' },

  { key: 'social.facebook', value: '"https://facebook.com"' },
  { key: 'social.twitter', value: '"https://twitter.com"' },
  { key: 'social.linkedin', value: '"https://linkedin.com"' },

  { key: 'footer.description', value: '"Empowering businesses with cutting-edge software solutions. Trusted globally since 2006."' }
]

async function seed() {
  console.log("Seeding site_settings...")
  for (const setting of initialSettings) {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: setting.key, value: setting.value })
    if (error) {
      console.error(`Error inserting ${setting.key}:`, error.message)
    } else {
      console.log(`Inserted ${setting.key}`)
    }
  }
  console.log("Done.")
}

seed()
