import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

let tabs = [
    { id: "", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "links", label: "Links" },
];

export default function AnimatedTabs() {
    const pathName = usePathname();
    const isBg = pathName === "/bg"
    let path = pathName.substring(1)

    let [activeTab, setActiveTab] = useState(isBg? tabs[0].id : path);
    
    return (
        <>
            <nav className={`z-10 flex w-full justify-center left-0 top-0 pb-6 pt-6 ${isBg ? "hidden" : ""}`}>
                <div className="flex rounded fixed backdrop-blur-xl space-x-1 z-30 lg:space-x-4 ">
                    {tabs.map((tab) => (
                        <Link key={tab.id} href={`/${tab.id}`}>
                            <button
                                
                                onClick={() => setActiveTab(tab.id)}
                                className={`${activeTab === tab.id ? " bg-sky-500 bg-opacity-25" : "hover:opacity-50"} duration-300 text-xl rounded-full px-3 py-1.5 font-medium text-white outline-2 outline-sky-400 focus-visible:outline lg:text-2xl lg:px-5`}
                            >
                                {tab.label}
                            </button>
                        </Link>
                    ))}
                </div>

            </nav>
            {/* <div className="z-10 flex w-full justify-center left-0 top-0 pb-6 pt-6">
                <div className="z-20 h-5 w-5 fixed rounded-full bg-red-500">Bleh</div>
            </div> */}
        </>
    );
}