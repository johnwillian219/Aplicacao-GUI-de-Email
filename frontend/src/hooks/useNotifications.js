import { useState, useEffect } from "react";

export function useNotifications() {
  const [enabled, setEnabled] = useState(true);

  // Carrega o estado salvo ao abrir qualquer página
  useEffect(() => {
    const saved = localStorage.getItem("notificationsEnabled");
    if (saved !== null) {
      setEnabled(saved === "true");
    }
  }, []);

  // Salva toda vez que mudar
  const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    localStorage.setItem("notificationsEnabled", newState);
  };

  return { enabled, toggle };
}
