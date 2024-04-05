import { createContext, useState, ReactNode } from "react";

export type WalletProps = {
  id: string;
};

type WalletContextType = {
  myWallet: WalletProps | null;
  addWallet: (wallet: WalletProps | null) => void;
};

const WalletContext = createContext<WalletContextType>({
  myWallet: null,
  addWallet: () => {},
});

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [myWallet, setMyWallet] = useState<WalletProps | null>(null);

  const addWallet = (wallet: WalletProps | null) => {
    setMyWallet(wallet);
  };

  return (
    <WalletContext.Provider value={{ myWallet, addWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
