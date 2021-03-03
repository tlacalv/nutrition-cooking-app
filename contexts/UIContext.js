import React, { useContext, useState } from "react";

const UIContext = React.createContext();

export function useUI() {
  return useContext(UIContext);
}

export function UIProvider({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  const value = {
    showMenu,
    setShowMenu,
  };
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
