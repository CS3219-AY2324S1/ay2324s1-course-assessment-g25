'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

type DifficultySelectionContextType = {
  difficultySelected: string;
  setDifficultySelected: React.Dispatch<React.SetStateAction<string>>;
  sessionExists: string;
  setSessionExists: React.Dispatch<React.SetStateAction<string>>;
};

const DifficultySelectionContext = createContext<DifficultySelectionContextType | null>(null);

type DifficultySelectionProviderProps = {
  children: ReactNode;
};

export function DifficultySelectionProvider({ children }: DifficultySelectionProviderProps) {
  const [difficultySelected, setDifficultySelected] = useState("");
  const [sessionExists, setSessionExists] = useState("")

  return (
    <DifficultySelectionContext.Provider value={{ difficultySelected, setDifficultySelected, sessionExists, setSessionExists }}>
      {children}
    </DifficultySelectionContext.Provider>
  );
}

export function useSetDifficulty() {
  const context = useContext(DifficultySelectionContext);

  if (context === null) {
    throw new Error("useSetDifficulty must be used within a DifficultySelectionProvider");
  }

  return context;
}