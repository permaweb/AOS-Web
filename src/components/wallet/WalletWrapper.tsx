import { ArweaveWalletKit } from "arweave-wallet-kit";

export default function WalletWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ArweaveWalletKit
            config={{
                permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
                ensurePermissions: true,
            }}
        >
            {children}
        </ArweaveWalletKit>
    )
}