'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

type ManageQuestionsContextType = {
  addButtonPressed: boolean;
  setAddButtonPressed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ManageQuestionsContext = createContext<ManageQuestionsContextType | null>(null);

type ManageQuestionsProviderProps = {
  children: ReactNode;
};

export function ManageQuestionsProvider({ children }: ManageQuestionsProviderProps) {
  const [addButtonPressed, setAddButtonPressed] = useState(false);

  return (
    <ManageQuestionsContext.Provider value={{ addButtonPressed, setAddButtonPressed }}>
      {children}
    </ManageQuestionsContext.Provider>
  );
}

export function useAddButtonPress() {
  const context = useContext(ManageQuestionsContext);

  if (context === null) {
    throw new Error("useAddButtonPress must be used within a ManageQuestionsProvider");
  }

  return context;
}
