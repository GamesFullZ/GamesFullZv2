import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Envíanos un correo',
      value: 'contacto@gamehub.dev',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      description: 'Llámanos directamente',
      value: '+1 (555) 123-4567',
    },
    {
      icon: MapPin,
      title: 'Oficina',
      description: 'Visítanos en persona',
      value: 'Ciudad de México, México',
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'El asunto debe tener al menos 5 caracteres';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? 
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-poppins font-bold text-white mb-6">
                Información de Contacto
              </h2>
              <p className="text-gray-400 mb-8">
                Estamos disponibles para ayudarte. Elige la opción que más te convenga.
              </p>
            </div>

            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-4 p-6 bg-dark-secondary rounded-2xl border border-neon-blue/10 hover:border-neon-blue/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-neon rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-dark-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                  <p className="text-neon-blue font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-gradient-to-r from-neon-blue/10 to-neon-pink/10 rounded-2xl border border-neon-blue/20"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Horario de Atención
              </h3>
              <div className="space-y-1 text-gray-300">
                <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                <p>Sábados: 10:00 AM - 4:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-dark-secondary rounded-2xl p-8 border border-neon-blue/10">
              <h2 className="text-2xl font-poppins font-bold text-white mb-6">
                Envíanos un Mensaje
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-gray-400">
                    Gracias por contactarnos. Te responderemos en las próximas 24 horas.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nombre completo"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      error={errors.name}
                      disabled={isSubmitting}
                    />
                    
                    <Input
                      label="Email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={errors.email}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Input
                    label="Asunto"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    error={errors.subject}
                    disabled={isSubmitting}
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Mensaje
                    </label>
                    <textarea
                      placeholder="Escribe tu mensaje aquí..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      disabled={isSubmitting}
                      rows={6}
                      className={`
                        block w-full rounded-lg border border-dark-tertiary bg-dark-tertiary text-white placeholder-gray-400
                        focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none
                        transition-all duration-300 px-4 py-3 resize-vertical
                        ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                        ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={isSubmitting ? undefined : Send}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-400">
              Respuestas a las preguntas más comunes sobre GameHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: '¿Cómo puedo descargar juegos?',
                answer: 'Simplemente busca el juego que te interese, haz clic en "Ver detalles" y luego en "Descargar". Necesitarás crear una cuenta gratuita.',
              },
              {
                question: '¿Los juegos son seguros?',
                answer: 'Sí, todos nuestros juegos son verificados y escaneados por virus antes de ser publicados en la plataforma.',
              },
              {
                question: '¿Necesito pagar por algo?',
                answer: 'GameHub es gratuito. Algunos juegos pueden tener un costo, pero muchos son completamente gratis.',
              },
              {
                question: '¿Puedo solicitar un juego específico?',
                answer: 'Por supuesto, puedes contactarnos y solicitar que agreguemos un juego específico a nuestra plataforma.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-dark-secondary rounded-xl border border-neon-blue/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
