import React, { useEffect, useState } from 'react';

// Mobile
// Laptop 
// Tablet
// Dslr
// Smart watches
// Headphones
// Earbuds
const category = [
    {
        name: "Mobile",
        items: ["Samsung", "iPhone"]
    },
    {
        name: "Laptop",
        items: ["HP", "Dell", "Asus"]
    },
    {
        name: "Tablet",
        items: ["Samsung"]
    },
    {
        name: "Dslr",
        items: ["Canon"]
    },
    {
        name: "Smart watches",
        items: ["Noise", "Apple", "Samsung"]
    },
    {
        name: "Headphones",
        items: ["Boat", "U & I"]
    },
    {
        name: "Earbuds",
        items: ["Boat", "Bose"]
    },
];

const DropDownMenu = ({ isDark }) => {
    const [data, setData] = useState({ data: [], isOpen: false, index: -1 });
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let a = fetch("https://tech-tonics.onrender.com/product")
            .then(e => e.json())
            .then(data => {
                let a = Object.keys(data.data).map(e => ({ name: e, items: Object.keys(data.data[e]).map(a => a) }))
                setCategory(a)
            })
            .finally(() => setLoading(false))
    }, [])


    return (
        <div
            onMouseLeave={() => {
                setData({ data: [], isOpen: false, index: -1 });
            }}
            className='relative z-10'
        >
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3'>
                {category.map((ele, index) => (
                    <button
                        key={index}
                        className={`relative ${isDark ? "bg-gray-700" : "bg-gray-300"} ${isDark ? "text-gray-200" : "text-gray-700"} font-semibold py-2 px-4 rounded inline-flex items-center`}
                        onMouseMove={() => {
                            setData({ data: ele.items, isOpen: true, index: index });
                        }}
                    >
                        <span>{ele.name}</span>
                        {data.isOpen && data.index === index && (
                            <div
                                onMouseLeave={() => {
                                    setData({ data: [], isOpen: false, index: -1 });
                                }}
                                className={`absolute left-0 top-full w-full ${isDark ? "bg-gray-800" : "bg-white"} rounded-md shadow-lg z-10`}
                            >
                                <div className='py-1'>
                                    {data.data.map((e, i) => (
                                        <a
                                            key={i}
                                            href={`#${e.toLowerCase()}`}
                                            onClick={() => setData({ data: [], isOpen: false, index: -1 })}
                                            className={`px-4 py-2 flex w-full justify-between ${isDark ? "text-gray-200" : "text-gray-800"} ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                                        >
                                            <p>{e}</p>
                                            <i className="fa-solid fa-chevron-up fa-rotate-90"></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropDownMenu;
