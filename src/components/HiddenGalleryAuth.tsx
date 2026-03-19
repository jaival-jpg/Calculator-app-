import { useState, useEffect } from 'react';
import { BasicCalculator } from './BasicCalculator';
import { HiddenGallery } from './HiddenGallery';

export function HiddenGalleryAuth() {
  const [isSetup, setIsSetup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<'enter-new' | 'confirm-new' | 'login'>('login');
  const [tempPassword, setTempPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const savedPassword = localStorage.getItem('vault_password');
    if (!savedPassword) {
      setIsSetup(true);
      setStep('enter-new');
      setShowPopup(true);
    } else {
      setStep('login');
    }
  }, []);

  const handleVaultSubmit = (password: string) => {
    setError('');
    
    if (step === 'enter-new') {
      if (password.length !== 4 || isNaN(Number(password))) {
        setError('Password must be exactly 4 digits');
        return;
      }
      setTempPassword(password);
      setStep('confirm-new');
      setShowPopup(true);
    } else if (step === 'confirm-new') {
      if (password === tempPassword) {
        // In a real app, hash this
        localStorage.setItem('vault_password', btoa(password));
        setIsSetup(false);
        setIsAuthenticated(true);
        setShowPopup(false);
      } else {
        setError('Passwords do not match. Try again.');
        setStep('enter-new');
        setTempPassword('');
        setShowPopup(true);
      }
    } else if (step === 'login') {
      const savedPassword = localStorage.getItem('vault_password');
      if (savedPassword && btoa(password) === savedPassword) {
        setIsAuthenticated(true);
      } else {
        setError('Incorrect password');
      }
    }
  };

  if (isAuthenticated) {
    return <HiddenGallery />;
  }

  return (
    <div className="relative h-full w-full">
      <BasicCalculator 
        vaultMode={true} 
        onVaultSubmit={handleVaultSubmit} 
        vaultError={error} 
      />
      
      {showPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-2xl max-w-sm w-full border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              {step === 'enter-new' ? 'Enter New Password' : 'Confirm Password'}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {step === 'enter-new' 
                ? 'Create a 4-digit passcode using the calculator buttons. Press "=" to confirm.' 
                : 'Enter the same 4-digit passcode again. Press "=" to confirm.'}
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
