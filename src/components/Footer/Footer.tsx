import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram, Youtube, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const footerLinks = {
    'Empresa': ['Sobre nosotros', 'Carreras', 'Prensa', 'Blog'],
    'Soporte': ['Centro de ayuda', 'Contacto', 'Estado del servicio', 'Términos'],
    'Desarrolladores': ['API', 'Documentación', 'Herramientas', 'SDK'],
    'Legal': ['Privacidad', 'Términos de uso', 'Cookies', 'DMCA'],
  };

  return (
    <footer className="bg-dark-primary border-t border-neon-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
                <span className="text-dark-primary font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-poppins font-bold text-white">
                Game<span className="text-neon-blue">Hub</span>
              </span>
            </motion.div>
            
            <motion.p
              className="text-gray-400 text-sm leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              La plataforma líder para descargar los mejores juegos de PC. 
              Descubre, descarga y disfruta de miles de juegos con la mejor experiencia gaming.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-dark-secondary rounded-lg flex items-center justify-center text-gray-400 hover:text-neon-blue hover:bg-dark-tertiary transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + categoryIndex * 0.1 }}
            >
              <h3 className="text-white font-semibold text-sm">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + categoryIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-neon-blue transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-dark-tertiary flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-400 text-sm">
            © 2025 GameHub. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            Hecho con ❤️ para la comunidad gaming
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
