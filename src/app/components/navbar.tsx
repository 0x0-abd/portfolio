import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
];

export default function AnimatedTabs() {
    const pathName = usePathname();

    return (
        <nav className="z-10 flex w-full justify-center left-0 top-0 pb-6 pt-6">
            <div className="flex rounded-full fixed bg-[#11161a]/80 md:bg-transparent md:rounded md:backdrop-blur-xl space-x-1 z-30 lg:space-x-4">
                {tabs.map((tab) => {
                    const isActive = pathName === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            aria-current={isActive ? "page" : undefined}
                            className={`${isActive ? " bg-sky-500 bg-opacity-25" : "hover:opacity-50"} duration-300 text-xl rounded-full px-3 py-1.5 font-medium text-white outline-2 outline-sky-400 focus-visible:outline lg:text-2xl lg:px-5`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
