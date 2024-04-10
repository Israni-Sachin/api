import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg"

const links = [{ name: "Home", href: "#" }, { name: "Blogs", href: "#blogs" }];

function Header({ isDark, setIsDark, search, setSearch }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [scrolling, setScrolling] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolling = window.scrollY > 5;
            setScrolling(isScrolling);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={` ${isDark ? `${scrolling ? "bg-gray-900/90" : "bg-transparent"}` : `${scrolling ? "bg-gray-100/90" : "bg-transparent"}`} fixed z-30 top-0 px-[5vw]`}>
                <header className=" w-[90vw] top-0 mx-auto flex items-center justify-between shrink-0">
                    <div className="flex items-center">
                        <div className="w-20 block">
                            <Link className="w-20 h-20" href="#">
                                <img
                                    alt="Teck Tonic"
                                    className="w-full h-full hover:scale-110 duration-200"
                                    src="assets/images/logo.png"
                                />
                            </Link>
                        </div>
                        <nav className="">
                            <Link className={`${isDark ? "text-white" : "text-black"} text-2xl font-semibold`}>
                                TechTonic
                            </Link>
                        </nav>
                    </div>
                    <div className="flex">
                        <div className="hidden bg-white rounded sm:flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
                            <button className="outline-none focus:outline-none">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <input
                                type="search"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                name=""
                                id=""
                                placeholder="Search"
                                className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
                            />
                        </div>
                        <div className="flex items-center">
                            <ul className="hidden space-x-2 md:flex md:space-x-8">
                                {links.map((ele, index) => (
                                    <li key={index} className={`${isDark ? "text-gray-100" : "text-gray-800"}`} >
                                        <a href={ele.href}>{ele.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="block md:hidden">
                        <div onClick={() => setIsNavbarOpen(pre => !pre)} className="cursor-pointer ">
                            <i className={`${!isNavbarOpen ? "fa-solid fa-bars" : "fa-solid fa-xmark"}  ${isDark ? "text-white" : "text-black"} text-xl`}></i>
                        </div>
                    </div>
                </header>
                {isNavbarOpen && (
                    <div className={`md:hidden ${isDark ? "bg-gray-900" : "bg-gray-100"} duration-300 `}>
                        <div className="flex flex-col items-center">
                            {links.map((ele, index) => (
                                <a onClick={() => setIsNavbarOpen(pre => !pre)} key={index} className={`${isDark ? "text-gray-100" : "text-gray-900"} my-2`} href="#">
                                    {ele}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Header;