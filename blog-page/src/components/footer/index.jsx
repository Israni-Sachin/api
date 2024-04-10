import React from 'react'

const Footer = ({ isDark }) => {
    return (
        <>
            <footer className={`${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-300 text-gray-800"} `}>
                <div className="w-[90vw] mx-auto py-5">
                    <div className="mx-auto sm:px-4 ">
                        <div className="flex flex-wrap  items-center">
                            <div className="lg:w-1/3 md:w-1/2 pr-4 pl-4 mb-4">
                                <h1 className="mb-3 font-bold text-2xl">Teck Tonic</h1>
                                <p>A108 Adam Street NY 535022, USA</p>
                                <p className="m-0">Phone: +1 5589 55488 55</p>
                                <p>Email: info@example.com</p>
                                <a href="/">
                                    <i
                                        style={{ cursor: "pointer" }}
                                        className={`text-2xl bg-body-secondary ${isDark ? "text-white" : "text-black"} p-2 rounded-full fa-brands fa-twitter`}
                                    />
                                </a>
                                <a href="/">
                                    <i
                                        style={{ cursor: "pointer" }}
                                        className={`text-2xl bg-body-secondary ${isDark ? "text-white" : "text-black"} p-2 rounded-full fa-brands fa-facebook`}
                                    />
                                </a>
                                <a href="/">
                                    <i
                                        style={{ cursor: "pointer" }}
                                        className={`text-2xl bg-body-secondary ${isDark ? "text-white" : "text-black"} p-2 rounded-full fa-brands fa-instagram`}
                                    />
                                </a>
                                <a href="/">
                                    <i
                                        style={{ cursor: "pointer" }}
                                        className={`text-2xl bg-body-secondary ${isDark ? "text-white" : "text-black"} p-2 rounded-full fa-brands fa-linkedin`}
                                    />
                                </a>
                                <a href="/">
                                    <i
                                        style={{ cursor: "pointer" }}
                                        className={`text-2xl bg-body-secondary ${isDark ? "text-white" : "text-black"} p-2 rounded-full fa-brands fa-facebook`}
                                    />
                                </a>
                            </div>
                            <div className="lg:w-1/3 md:w-1/2 pr-4 pl-4 mb-4">
                                <h3 className="mb-3">Useful as</h3>
                                <ul className="list-inline">
                                    <li className="mb-2">
                                        <i
                                            style={{ fontSize: 10 }}
                                            className="fa-solid fa-chevron-right me-3 khakhi"
                                        />
                                        <a
                                            style={{ textDecoration: "none" }}
                                            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
                                            href="#home"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <i
                                            style={{ fontSize: 10 }}
                                            className="fa-solid fa-chevron-right me-3 khakhi"
                                        />
                                        <a
                                            style={{ textDecoration: "none" }}
                                            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
                                            href="#about-us"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <i
                                            style={{ fontSize: 10 }}
                                            className="fa-solid fa-chevron-right me-3 khakhi"
                                        />
                                        <a
                                            style={{ textDecoration: "none" }}
                                            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
                                            href="#blogs"
                                        >
                                            Blogs
                                        </a>
                                    </li>
                                    {/* <li className="mb-2">
                                        <i
                                            style={{ fontSize: 10 }}
                                            className="fa-solid fa-chevron-right me-3 khakhi"
                                        />
                                        <a
                                            style={{ textDecoration: "none" }}
                                            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
                                            href="#"
                                        >
                                            Termsof services
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <i
                                            style={{ fontSize: 10 }}
                                            className="fa-solid fa-chevron-right me-3 khakhi"
                                        />
                                        <a
                                            style={{ textDecoration: "none" }}
                                            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
                                            href="#"
                                        >
                                            Privacy policy
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="lg:w-1/3 pr-4 pl-4 md:w-1/2 pr-4 pl-4 mb-4">
                                <h3 className="mb-3">Our Newsletter</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, nisi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer