import ContactForm from '@/components/contact-form'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import AnimatedSection from '@/components/animated-section'

export const metadata = {
  title: 'Contacto | LRP Proyectos Técnicos',
  description: 'Contacte con nosotros para su proyecto de arquitectura o ingeniería. Estamos disponibles para atenderle.',
}

export default function Contacto() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Contacto</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Estamos aquí para ayudarle con su proyecto
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedSection>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Información de Contacto
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                    <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                      <a
                        href="mailto:info@lrpproyectostecnicos.com"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        info@lrpproyectostecnicos.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                    <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
                      <p className="text-gray-600">+34 XXX XXX XXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Ubicación</h3>
                      <p className="text-gray-600">España</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                    <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Horario</h3>
                      <p className="text-gray-600">Lunes - Viernes: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-3">Protección de Datos</h3>
                  <p className="text-sm text-gray-600">
                    Los datos proporcionados serán almacenados de forma segura y utilizados únicamente
                    para responder a su consulta. Puede solicitar su eliminación en cualquier momento.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Envíenos un Mensaje
                </h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
