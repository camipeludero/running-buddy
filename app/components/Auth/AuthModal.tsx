'use client';

import React, { useState } from 'react';
import Modal from '@/app/components/Basic/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<'login' | 'register'>(defaultView);

  const handleSuccess = () => {
    onClose();
  };

  const switchToLogin = () => setCurrentView('login');
  const switchToRegister = () => setCurrentView('register');

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={currentView === 'login' ? 'Sign In' : 'Create Account'}
      size="md"
    >
      {currentView === 'login' ? (
        <LoginForm 
          onSuccess={handleSuccess} 
          onSwitchToRegister={switchToRegister}
        />
      ) : (
        <RegisterForm 
          onSuccess={handleSuccess} 
          onSwitchToLogin={switchToLogin}
        />
      )}
    </Modal>
  );
}