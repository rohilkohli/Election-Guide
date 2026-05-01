"use client";

import React, { createContext, useContext, useState } from "react";

interface ELI18ContextType {
  eli18Mode: boolean;
  toggleEli18Mode: () => void;
}

const ELI18Context = createContext<ELI18ContextType>({
  eli18Mode: false,
  toggleEli18Mode: () => {},
});

export function ELI18Provider({ children }: { children: React.ReactNode }) {
  const [eli18Mode, setEli18Mode] = useState(false);

  const toggleEli18Mode = () => setEli18Mode((prev) => !prev);

  return (
    <ELI18Context.Provider value={{ eli18Mode, toggleEli18Mode }}>
      {children}
    </ELI18Context.Provider>
  );
}

export function useELI18() {
  return useContext(ELI18Context);
}
