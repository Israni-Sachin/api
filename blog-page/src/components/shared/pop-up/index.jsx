import React from 'react';

const DescriptionPopUp = ({ setShow, data, isDark }) => {
    return (
        <>
            <div className={`fixed back inset-0 flex items-center justify-center p-5 z-[99] overflow-hidden`}>
                <div onClick={() => setShow(false)} className={`absolute inset-0 animate-[modalOverlayAnimation_0.2s_ease-in-out] bg-[rgba(0,9,26,0.80)] blur-[1px] [animation-fill-mode:forwards]`}></div>
                <div className={`animate-[modalDialogAnimation_0.2s_ease-in-out] [animation-fill-mode:forwards] pointer-events-none relative translate-y-[-50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[800px] transform-none opacity-100 w-full max-h-[80vh] overflow-auto`}>
                    <div className={`px-10 overflow-x-hidden z-40 over-y-auto max-w-full py-8 shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] rounded-lg pointer-events-auto relative flex w-full flex-col border-none ${isDark ? "bg-black" : "bg-white"} bg-clip-padding text-current shadow-lg outline-none`}>
                        <div onClick={() => setShow(false)} className={`absolute z-50 right-2 top-2 cursor-pointer w-7 h-7 rounded-full  flex justify-center items-center`}>
                            <i className={`fa-solid fa-xmark ${isDark ? "text-white" : "text-black"} text-3xl`}></i>
                        </div>
                        <div className=''>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 items-center'>
                                <img
                                    src={data.img}
                                    onError={(e) => {
                                        e.target.src = 'assets/images/default.png';
                                    }}
                                    alt={data.title}
                                    className="h-60 object-contain"
                                />
                                <div>
                                    <h1 className={`font-semibold text-4xl ${isDark ? "text-white" : "text-black"}`}>{data.name}</h1>
                                </div>
                            </div>
                            <div className="">
                                {data.desc && (
                                    <>
                                        <p className={`${isDark ? "text-gray-100" : "text-gray-700"} text-xl pt-5 py-3`}>Introduction</p>
                                        <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>{data.desc}</p>
                                    </>
                                )}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 p-3'>
                                    {data.features.map((feature, index) => (
                                        <div key={index}>
                                            <p className={`text-red-600 inline-block hover:scale-x-105 duration-200 font-bold text-xl pt-5 py-3`}>
                                                {feature.title}
                                            </p>
                                            {feature.features_desc && Object.keys(feature.features_desc).map((e, i) => (
                                                e !== "" &&
                                                <div key={index} className="flex">
                                                    <div className='w-1/3 overflow-hidden'>{e.replaceAll("_", " ")}</div>
                                                    <span className=''>:</span>
                                                    <div className='ps-5'>
                                                        {feature.features_desc[e]}</div>
                                                </div>
                                            ))}
                                            <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>{data.unboxing}</p>
                                        </div>
                                    ))}
                                    {/* {data.unboxing && (
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DescriptionPopUp;
