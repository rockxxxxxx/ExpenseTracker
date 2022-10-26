import { createContext, useState } from "react";

export const ToasterContext = createContext({
  isToaster: false,
  setIsToaster: () => {},
  isMessage: {
    message: "",
    type: "",
  },
  setIsMessage: () => {},
});

export const ToasterContextProvider = ({ children }) => {
  const [isToaster, setIsToaster] = useState(false);
  const [isMessage, setIsMessage] = useState({
    message: "",
    type: "",
  });

  const value = {
    isToaster,
    setIsToaster,
    isMessage,
    setIsMessage,
  };
  return (
    <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>
  );
};
