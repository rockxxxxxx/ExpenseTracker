import { createContext, useState } from "react";

export const ModalContext = createContext({
  isModal: false,
  setIsModal: () => {},
});

export const ModalContextProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const value = {
    isModal,
    setIsModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
