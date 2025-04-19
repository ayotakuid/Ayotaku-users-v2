import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export function useDialog() {
  return useContext(DialogContext);
}

export function DialogProvider({ children}) {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <DialogContext.Provider value={{ visible, showDialog, hideDialog }}>
      {children}
    </DialogContext.Provider>
  )
}