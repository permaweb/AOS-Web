import { Link } from "react-router-dom";
import AOSLogo from "../icons/AOSLogo";

export default function Header() {
    return (
        <div className="bg-white flex justify-between items-center p-2 border-b-1 border-light-gray-color">
            <Link to={"/"}>
                <AOSLogo />
            </Link>

            <div className="px-4 py-2.5 flex items-center gap-2 font-dm-sans text-base border-1 transition leading-none rounded-smd border-light-gray-color base-transition">
                <div className="rounded-full bg-dark-gray-color aspect-square w-5"></div>
                <div className="truncate max-w-24">Placeholder Name</div>
            </div>

            <button
                className="px-4 py-2.5 font-dm-sans text-base border-1 transition leading-none rounded-smd text-[#FF0E0E] bg-[#FBDADA] border-[#DD8686] base-transition"
            >
                Connect Wallet
            </button>
        </div>
    )
}