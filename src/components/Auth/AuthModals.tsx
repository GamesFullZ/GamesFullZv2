import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

export const AuthModals: React.FC = () => {
  const {
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
    setUser,
  } = useApp();

  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!loginForm.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!loginForm.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (loginForm.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate login
      setUser({
        id: '1',
        username: loginForm.email.split('@')[0],
        email: loginForm.email,
        isLoggedIn: true,
      });
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '', remember: false });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!registerForm.username) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (registerForm.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!registerForm.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(registerForm.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!registerForm.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (registerForm.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!registerForm.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate registration
      setUser({
        id: '1',
        username: registerForm.username,
        email: registerForm.email,
        isLoggedIn: true,
      });
      setShowRegisterModal(false);
      setRegisterForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      });
    }
  };

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
    setErrors({});
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
    setErrors({});
  };

  return (
    <>
      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-dark-secondary rounded-2xl p-8 border border-neon-blue/20 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-dark-tertiary transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  icon={Mail}
                  error={errors.email}
                />

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tu contraseña"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    icon={Lock}
                    error={errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={loginForm.remember}
                      onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                      className="w-4 h-4 rounded border-dark-tertiary bg-dark-tertiary text-neon-blue focus:ring-neon-blue focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">Recordarme</span>
                  </label>
                  <a href="#" className="text-sm text-neon-blue hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Iniciar Sesión
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  ¿No tienes cuenta?{' '}
                  <button
                    onClick={switchToRegister}
                    className="text-neon-blue hover:underline font-medium"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowRegisterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-dark-secondary rounded-2xl p-8 border border-neon-blue/20 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Crear Cuenta</h2>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-dark-tertiary transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  icon={User}
                  error={errors.username}
                />

                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  icon={Mail}
                  error={errors.email}
                />

                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  icon={Lock}
                  error={errors.password}
                />

                <Input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  icon={Lock}
                  error={errors.confirmPassword}
                />

                <div className="space-y-2">
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={registerForm.acceptTerms}
                      onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded border-dark-tertiary bg-dark-tertiary text-neon-blue focus:ring-neon-blue focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">
                      Acepto los{' '}
                      <a href="#" className="text-neon-blue hover:underline">
                        términos y condiciones
                      </a>{' '}
                      y la{' '}
                      <a href="#" className="text-neon-blue hover:underline">
                        política de privacidad
                      </a>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-500">{errors.acceptTerms}</p>
                  )}
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Crear Cuenta
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={switchToLogin}
                    className="text-neon-blue hover:underline font-medium"
                  >
                    Inicia sesión aquí
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
