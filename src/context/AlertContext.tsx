import React, { createContext, useContext, useState, useCallback } from 'react';
import { MisinformationDetail } from '../types/misinformation';
import { RealTimeAlert } from '../components/RealTimeAlert';

interface AlertContextType {
  showAlert: (alert: MisinformationDetail) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Array<{ id: string; alert: MisinformationDetail }>>([]);

  const showAlert = useCallback((alert: MisinformationDetail) => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts((prev) => [...prev, { id, alert }]);
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-4 z-50">
        {alerts.map(({ id, alert }) => (
          <RealTimeAlert
            key={id}
            alert={alert}
            onDismiss={() => dismissAlert(id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}; 