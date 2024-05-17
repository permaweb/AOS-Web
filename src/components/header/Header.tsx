import { Link } from "react-router-dom";
import AOSLogo from "../icons/AOSLogo";
import { ConnectButton } from "arweave-wallet-kit";
import QuestsButton from "../QuestsButton";
import AOSLogoSmall from "../icons/AOSLogoSmall";

export default function Header() {
  return (
    <div className="bg-white flex justify-between items-center p-2 border-b-1 border-light-gray-color">
      <Link to={"/"}>
        <div className="hidden md:block">
          <AOSLogo />
        </div>
        <div className="block md:hidden">
          <AOSLogoSmall />
        </div>
      </Link>
      <div className="flex gap-4">
        <QuestsButton />
        <ConnectButton />
      </div>
    </div>
  );
}
