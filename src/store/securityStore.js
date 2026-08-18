import { useState } from 'react';

const initialSecurity = {
  appLock: false,
  biometric: false,
  sensitiveDataProtection: true,
  requireReauthForExport: true,
};

export function useSecurity() {
  const [security, setSecurity] = useState(
    initialSecurity
  );

  const toggleSecurity = (key) => {
    setSecurity((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const enableAppLock = () => {
    setSecurity((current) => ({
      ...current,
      appLock: true,
    }));
  };

  const disableAppLock = () => {
    setSecurity((current) => ({
      ...current,
      appLock: false,
      biometric: false,
    }));
  };

  const enableBiometric = () => {
    setSecurity((current) => ({
      ...current,
      biometric: true,
      appLock: true,
    }));
  };

  const disableBiometric = () => {
    setSecurity((current) => ({
      ...current,
      biometric: false,
    }));
  };

  const resetSecurity = () => {
    setSecurity(initialSecurity);
  };

  return {
    security,
    toggleSecurity,
    enableAppLock,
    disableAppLock,
    enableBiometric,
    disableBiometric,
    resetSecurity,
  };
}
