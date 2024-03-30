import { Header } from "../header";

export default function MainLayout({ children }: { children: React.ReactElement | React.ReactElement[] }) {
    return (
        <section className="relative w-full min-h-screen font-roboto-mono text-primary-dark-color bg-bg-color">
            <Header />
            {children}
        </section>
    )
}