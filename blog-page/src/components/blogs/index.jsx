import React, { useEffect, useState } from 'react'
import DescriptionPopUp from '../shared/pop-up';


const Blogs = ({ isDark, productData, setProductData, searchProducts, search }) => {
    const [show, setShow] = useState(false);
    const [detailsData, setDetailsData] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch("https://tech-tonics.onrender.com/product");
            const result = await response.json();
            setProductData(result.data);
        } catch (error) {
            console.log("ERROR: ", error)
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <section id='blogs' className={`${isDark ? "bg-gray-800" : "bg-white"} py-10 lg:pb-20 `}>
                {loading ? (
                    <div className='w-[90vw] mx-auto flex justify-center'>
                        <div
                            aria-label="Orange and tan hamster running in a metal wheel"
                            role="img"
                            className="wheel-and-hamster"
                        >
                            <div className="wheel" />
                            <div className="hamster">
                                <div className="hamster__body">
                                    <div className="hamster__head">
                                        <div className="hamster__ear" />
                                        <div className="hamster__eye" />
                                        <div className="hamster__nose" />
                                    </div>
                                    <div className="hamster__limb hamster__limb--fr" />
                                    <div className="hamster__limb hamster__limb--fl" />
                                    <div className="hamster__limb hamster__limb--br" />
                                    <div className="hamster__limb hamster__limb--bl" />
                                    <div className="hamster__tail" />
                                </div>
                            </div>
                            <div className="spoke" />
                        </div>
                    </div>
                ) : (
                    <div className="w-[90vw] mx-auto px-4">
                        {search.trim() !== "" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
                                {searchProducts.map((post, index3) => (
                                    <div className='hover:shadow-2xl border-2  border-gray-700 '>
                                        <div
                                            onClick={() => {
                                                setShow(true)
                                                setDetailsData(post)
                                            }}
                                            key={index3}
                                            className={`cursor-pointer relative ${isDark ? "bg-gray-800" : "bg-white"} rounded-sm overflow-hidden`}>
                                            <img
                                                src={post.img}
                                                onError={(e) => {
                                                    e.target.src = 'assets/images/default.png';
                                                }}
                                                alt="image"
                                                className="w-full h-60 object-contain"
                                            />
                                            <div className='absolute w-full bottom-0 text-center bg-gray-400/25'>
                                                <h3 className="text-lg lg:text-xl font-semibold mb-4">
                                                    <h2 className="text-black hover:text-primary hover:scale-125 duration-300 transition">
                                                        {post.name}
                                                    </h2>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {productData && Object.keys(productData).map((gadget, index1) => (
                                    <div key={index1} className="mb-12">
                                        <h2 id={gadget.toLowerCase()} className={`text-3xl lg:text-4xl border-b-4 ${isDark ? "border-gray-200" : "border-gray-800"} font-bold pb-2 pt-10`}>
                                            <p className={`${isDark ? "text-white" : "text-black"} inline-block hover:scale-x-125 duration-300`}>{gadget}</p>
                                        </h2>
                                        {Object.keys(productData[gadget]).map((subcategory, index2) => (
                                            <div id={subcategory.toLowerCase()} key={index2} className="pt-6">
                                                <h2 className="text-xl lg:text-2xl font-semibold py-3">
                                                    <p className={`inline-block hover:scale-y-125 duration-300 ${isDark ? "text-gray-100" : "text-gray-800"}`}>{subcategory}</p>
                                                </h2>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
                                                    {/* {console.log(productData[gadget][subcategory])} */}
                                                    {productData[gadget][subcategory].map((post, index3) => (
                                                        <div
                                                            onClick={() => {
                                                                setShow(true)
                                                                setDetailsData(post)
                                                            }}
                                                            key={index3}
                                                            className={`cursor-pointer relative border-2 border-gray-700 ${isDark ? "bg-gray-800" : "bg-white"} rounded-sm overflow-hidden hover:shadow-2xl`}>
                                                            <img
                                                                src={post.img}
                                                                onError={(e) => {
                                                                    e.target.src = 'assets/images/default.png';
                                                                }}
                                                                alt="image"
                                                                className="w-full h-60 object-contain"
                                                            />
                                                            <div className='absolute w-full bottom-0 text-center bg-gray-400/25'>
                                                                <h3 className="text-lg lg:text-xl font-semibold mb-4">
                                                                    <h2 className="text-dark hover:text-primary hover:scale-125 duration-300 transition">
                                                                        {post.name}
                                                                    </h2>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </section>
            {show && <DescriptionPopUp setShow={setShow} data={detailsData} isDark={isDark} />}
        </>
    )
}

export default Blogs