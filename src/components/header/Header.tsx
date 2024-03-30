import { Link } from "react-router-dom";
import AOSLogo from "../icons/AOSLogo";
import { ConnectButton } from "arweave-wallet-kit";

export default function Header() {
    return (
        <div className="bg-white flex justify-between items-center p-2 border-b-1 border-light-gray-color">
            <Link to={"/"}>
                <AOSLogo />
            </Link>

            <ConnectButton />
        </div>
    )
}