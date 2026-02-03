import { CheckCircle, Heart, Award, Shield, Sprout, Lightbulb } from 'lucide-react'
import aboutData from '@/data/about.json'

const iconMap: Record<string, React.ElementType> = {
  'islamic-values': Heart,
  'quality': Award,
  'compassion': Heart,
  'trust': Shield,
  'sustainability': Sprout,
  'innovation': Lightbulb
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
              {aboutData.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-2 font-cairo">
              {aboutData.hero.titleAr}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-sans font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none space-y-6">
              {aboutData.story.content.map((para, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-sans font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {aboutData.mission.description}
              </p>
              <p className="text-gray-600 italic leading-relaxed font-cairo">
                {aboutData.mission.descriptionAr}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-sans font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {aboutData.vision.description}
              </p>
              <p className="text-gray-600 italic leading-relaxed font-cairo">
                {aboutData.vision.descriptionAr}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-sans font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {aboutData.values.map((value, idx) => {
              const Icon = iconMap[value.icon] || CheckCircle
              return (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 font-cairo">{value.titleAr}</p>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-sans font-bold mb-12 text-center">Why Choose HurayraPetFood.ae?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {aboutData.whyChooseUs.map((reason, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-bold mb-2">{reason.title}</h4>
                <p className="text-sm text-gray-600">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-causten font-bold mb-12 text-center">Certifications & Standards</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {aboutData.certifications.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-3 font-cairo">{cert.nameAr}</p>
                <p className="text-sm text-gray-700">
                  {cert.authority}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-causten font-bold mb-4">
            Join the HurayraPetFood.ae Family Today
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Give your cat the nutrition they deserve with our premium halal products
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  )
}
