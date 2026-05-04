import { createContext, useContext, useState } from 'react';

interface FormSyncContextType {
  isSubmitting: boolean;
  acquire: () => void;
  release: () => void;
}

const FormSyncContext = createContext<FormSyncContextType | undefined>(
  undefined,
);

export function FormSyncProvider({ children }: { children: React.ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const acquire = () => {
    setIsSubmitting(true);
  };
  const release = () => {
    setIsSubmitting(false);
  };

  const value: FormSyncContextType = { isSubmitting, acquire, release };

  return (
    <FormSyncContext.Provider value={value}>
      {children}
    </FormSyncContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFormSync = () => {
  const context = useContext(FormSyncContext);
  if (context === undefined) {
    throw new Error('useFormSync must be used within a FormSyncProvider');
  }
  return context;
};
