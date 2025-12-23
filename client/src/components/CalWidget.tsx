import { useState, createContext, useContext } from 'react';
import { AppointmentModal } from './AppointmentModal';

interface AppointmentContextType {
  openModal: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | null>(null);

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within AppointmentProvider');
  }
  return context;
}

export default function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <AppointmentContext.Provider value={{ openModal }}>
      {children}
      <AppointmentModal open={isOpen} onOpenChange={setIsOpen} />
    </AppointmentContext.Provider>
  );
}
