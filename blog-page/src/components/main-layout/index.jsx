import React, { useEffect, useState } from 'react';
import Header from '../header';
import Footer from '../footer';
import DropDownMenu from '../dropdown-menu';
// import AdSense from 'react-adsense';
import Blogs from '../blogs';


const MainLayout = () => {
    const [isDark, setIsDark] = useState(true);
    const [search, setSearch] = useState("")
    const [searchProducts, setSearchProducts] = useState([]);
    const [productData, setProductData] = useState([])

    function searchProductsByName(data, searchQuery) {
        const results = [];
        for (const category in data) {
            for (const subcategory in data[category]) {
                data[category][subcategory].forEach(product => {
                    if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        results.push(product);
                    }
                });
            }
        }
        return results;
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            const searchResults = searchProductsByName(productData, search);
            setSearchProducts(searchResults)
        }, 500);
        return () => clearTimeout(timer);
    }, [search])

    // useEffect(() => {
    //     let theme = localStorage.getItem('theme');
    //     setIsDark(theme === "dark" ? true : false);
    // }, []);

    return (
        <>
            <Header isDark={isDark} setIsDark={setIsDark} search={search} setSearch={setSearch} />

            <div className={`${isDark ? "bg-gray-800" : "bg-white"} ${isDark ? "text-white" : "text-black"} ${isDark ? "dark" : "light"}-mode pt-[80px]`}>
                <div className='w-[90vw] mx-auto block md:flex gap-5'>
                    <div className="flex bg-white rounded sm:hidden items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
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
                    <div className='w-full md:w-9/12'>
                        <div className={`${isDark ? "bg-gray-800" : "bg-gray-50"} py-8 md:py-12 lg:py-16 xl:py-20`}>
                            <div className="text-center space-y-4 lg:col-span-2 xl:col-span-1">
                                <h2 className={`${isDark ? "text-white" : "text-black"} text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter`}>The Gadget Enthusiast</h2>
                                <p className={`text-base md:text-xl/relaxed  ${isDark ? "text-gray-200" : "text-black-600"}`}>
                                    Your source for the latest news, reviews, and updates on the coolest gadgets. Whether you're into
                                    smartphones, wearables, or smart home tech, we've got you covered.
                                </p>
                                <div className="text-center">
                                    <a className={`${isDark ? "bg-white" : "bg-blue-600"} ${isDark ? "text-black" : "text-white"} rounded-full border ${isDark ? "border-blue-600" : "border-blue-600"} px-3 py-1 me-2 ${isDark ? "hover:bg-blue-600" : "hover:bg-white"} ${isDark ? "hover:text-white" : "hover:text-black"} duration-300`} href="#">Subscribe</a>
                                    <a className={`${isDark ? "bg-blue-600" : "bg-white"} ${isDark ? "text-white" : "text-black"} rounded-full px-3 py-1 me-2 ${isDark ? "hover:bg-white" : "hover:bg-blue-600"} ${isDark ? "hover:text-black" : "hover:text-white"}  hover:border hover:border-blue-600 duration-300`} href="#blogs">Start Reading</a>
                                </div>
                            </div>
                        </div>

                        <div className={`py-8 md:py-10 lg:py-14 xl:py-16 ${isDark ? "dark" : "light"}-mode`}>
                            <div className="container grid items-center mb-4 gap-4 px-4 text-center md:px-6 lg:gap-10">
                                <div className="space-y-2">
                                    <h2 className={`${isDark ? "text-white" : "text-black"} text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter`}>Featured Articles</h2>
                                    <p className={`${isDark ? "text-gray-200" : "text-black-600"} mx-auto  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed `}>
                                        Check out our latest and most popular articles on the coolest gadgets.
                                    </p>
                                </div>
                            </div>

                            <DropDownMenu isDark={isDark} />

                            <Blogs
                                search={search}
                                searchProducts={searchProducts}
                                productData={productData}
                                setProductData={setProductData}
                                isDark={isDark} />

                        </div>

                        <div className={`border-t ${isDark ? "border-gray-400" : "border-gray-600"}`}>
                            <div className="container py-8 md:py-12 lg:py-16 grid items-center justify-center gap-4 text-center md:px-6 lg:gap-10">
                                <div className="space-y-2">
                                    <h2 className={`${isDark ? "text-white" : "text-gray-900"} text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter`}>
                                        Want to stay up to date with the latest gadgets?
                                    </h2>
                                    <p className={`${isDark ? "text-gray-400" : "text-gray-600"} md:text-xl/relaxed`}>
                                        Subscribe to our newsletter for news, reviews, and exclusive insights.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-3/12'>
                        <div className="w-full pt-24 pb-12 sticky -z-10 top-0">
                            {/* <AdSense.Google
                            client='pub-8612459690712276'
                            slot='1234567890'
                            style={{ width: 300, height: 250, float: 'left' }}
                            format=''
                        /> */}
                            <div className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-md">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/022/721/557/original/google-logo-for-search-site-free-png.png"
                                    alt="image"
                                    className="w-full border-b border-gray-300"
                                />
                                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                    <h3>
                                        <a
                                            href="javascript:void(0)"
                                            className=" font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary"
                                        >
                                            Create an advertisement
                                        </a>
                                    </h3>
                                    <p className="text-base text-body-color leading-relaxed mb-7">
                                        advertisement content Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ad.
                                    </p>
                                    <a
                                        href="javascript:void(0)"
                                        className=" inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition "
                                    >
                                        View Ad
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer isDark={isDark} />
        </>
    );
};

export default MainLayout;
