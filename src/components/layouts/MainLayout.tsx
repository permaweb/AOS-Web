import { useContext, useEffect } from "react";
import { Header } from "../header";
import { ConnectedProcessContext } from "../../context/ConnectedProcess";
import { useActiveAddress } from "arweave-wallet-kit";

export default function MainLayout({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const { findProcessHistory } = useContext(ConnectedProcessContext);
  const publicKey = useActiveAddress();

  useEffect(() => {
    if (publicKey) {
      findProcessHistory(publicKey);
    }
  }, [publicKey]);
  return (
    <section className="relative w-full min-h-screen flex flex-col font-roboto-mono text-primary-dark-color bg-bg-color text-sm">
      <Header />
      {children}
    </section>
  );
}
