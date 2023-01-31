import * as React from "react";
import { SnackBar } from "@fairdoor/shared-code";
import type { ISnack, ISnackContext } from "types/index";

const defaultState = {
  message: "Welcome to Fairdoor !",
  variant: "success",
  open: false,
} as ISnack;

const SnackBarContext = React.createContext<ISnackContext | null>(null);

const useSnack = () => {
  const context = React.useContext(SnackBarContext);
  if (!context) {
    throw new Error(`useSnack must be used within a SnackProvider`);
  }
  return context;
};

const SnackProvider = ({ children }: { children: React.ReactNode }) => {
  const [snack, setSnack] = React.useState<ISnack>(defaultState);
  const autoHideDuration = 3000;
  return (
    <SnackBarContext.Provider value={{ snack, setSnack, autoHideDuration }}>
      <SnackBar
        snack={snack}
        setSnack={setSnack}
        autoHideDuration={autoHideDuration}
      />
      {children}
    </SnackBarContext.Provider>
  );
};

export { useSnack, SnackProvider };
