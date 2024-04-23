import { ArweaveWalletKit } from "arweave-wallet-kit";

export default function WalletWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ArweaveWalletKit
            config={{
                permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION", "ACCESS_PUBLIC_KEY"],
                ensurePermissions: true,
            }}

            theme={{
                radius: "minimal",
            }}
        >
            {children}
        </ArweaveWalletKit>
    )
}