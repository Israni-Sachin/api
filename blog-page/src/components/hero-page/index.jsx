import Footer from "../footer";
import Header from "../header";

function Mainpage() {
    return (
        <>
            {/* <Header /> */}

            <div className="w-[90vw] mx-auto">
                <div className="bg-gray-50/50 py-8 md:py-12 lg:py-16 xl:py-20">
                    <div className="container grid md:gap-4 lg:grid-cols-3 xl:gap-8">
                        <div className="space-y-4 lg:col-span-2 xl:col-span-1">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">The Gadget Enthusiast</h2>
                            <p className="text-base md:text-xl/relaxed text-gray-500 dark:text-gray-400">
                                Your source for the latest news, reviews, and updates on the coolest gadgets. Whether you're into
                                smartphones, wearables, or smart home tech, we've got you covered.
                            </p>
                            <div className="flex flex-col md:flex-row gap-2 md:min-w-[600px]">
                                <a className="btn" href="#">Subscribe</a>
                                <a className="btn" href="#">Start Reading</a>
                            </div>
                        </div>
                        <div className="grid gap-4 sm:gap-6 lg:order-first lg:col-span-1">
                            <div className="mx-auto flex items-center justify-center p-4 sm:p-8">
                                <img
                                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                                    height="150"
                                    width="300"
                                    src="assets/images/logo.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-8 md:py-10 lg:py-14 xl:py-16">
                    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">Featured Articles</h2>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Check out our latest and most popular articles on the coolest gadgets.
                            </p>
                        </div>
                    </div>
                    <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
                        <div className="container">
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                    <div className="bg-white rounded-lg overflow-hidden mb-10">
                                        <img
                                            src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg"
                                            alt="image"
                                            className="w-full"
                                        />
                                        <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                            <h3>
                                                <a
                                                    href="javascript:void(0)"
                                                    className=" font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary"
                                                >
                                                    Creative Card Component designs graphic elements
                                                </a>
                                            </h3>
                                            <p className="text-base text-body-color leading-relaxed mb-7">
                                                Lorem ipsum dolor sit amet pretium consectetur adipiscing elit.
                                                Lorem consectetur adipiscing elit.
                                            </p>
                                            <a
                                                href="javascript:void(0)"
                                                className=" inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition "
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                    <div className="bg-white rounded-lg overflow-hidden mb-10">
                                        <img
                                            src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-02.jpg"
                                            alt="image"
                                            className="w-full"
                                        />
                                        <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                            <h3>
                                                <a
                                                    href="javascript:void(0)"
                                                    className=" font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary"
                                                >
                                                    Creative Card Component designs graphic elements
                                                </a>
                                            </h3>
                                            <p className="text-base text-body-color leading-relaxed mb-7">
                                                Lorem ipsum dolor sit amet pretium consectetur adipiscing elit.
                                                Lorem consectetur adipiscing elit.
                                            </p>
                                            <a
                                                href="javascript:void(0)"
                                                className=" inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition "
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                    <div className="bg-white rounded-lg overflow-hidden mb-10">
                                        <img
                                            src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-03.jpg"
                                            alt="image"
                                            className="w-full"
                                        />
                                        <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                            <h3>
                                                <a
                                                    href="javascript:void(0)"
                                                    className=" font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary"
                                                >
                                                    Creative Card Component designs graphic elements
                                                </a>
                                            </h3>
                                            <p className="text-base text-body-color leading-relaxed mb-7">
                                                Lorem ipsum dolor sit amet pretium consectetur adipiscing elit.
                                                Lorem consectetur adipiscing elit.
                                            </p>
                                            <a
                                                href="javascript:void(0)"
                                                className=" inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition "
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>;


                    {/* <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:gap-10">
                        <div className="flex flex-col gap-4 min-w-[300px] md:min-w-[500px]">
                            <img
                                className="aspect-w-2 aspect-h-1 overflow-hidden rounded-lg object-cover object-center"
                                src="assets/images/placeholder.jpeg"
                                alt="Thumbnail"
                            />
                            <div className="space-y-2">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter">The Best Smart Home Devices of 2023</h3>
                                <p className="text-gray-500 dark:text-gray-400">March 15, 2023</p>
                                <p className="text-base md:text-lg text-gray-900 md:text-xl/relaxed dark:text-gray-100">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                                <a className="inline-flex items-center underline hover:text-gray-900 dark:hover:text-gray-50" href="#">
                                    Read More
                                    <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 min-w-[300px] md:min-w-[500px]">
                            <img
                                className="aspect-w-2 aspect-h-1 overflow-hidden rounded-lg object-cover object-center"
                                src="assets/images/placeholder.jpeg"
                                alt="Thumbnail"
                            />
                            <div className="space-y-2">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter">The Best Smart Home Devices of 2023</h3>
                                <p className="text-gray-500 dark:text-gray-400">March 15, 2023</p>
                                <p className="text-base md:text-lg text-gray-900 md:text-xl/relaxed dark:text-gray-100">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                                <a className="inline-flex items-center underline hover:text-gray-900 dark:hover:text-gray-50" href="#">
                                    Read More
                                    <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 min-w-[300px] md:min-w-[500px]">
                            <img
                                className="aspect-w-2 aspect-h-1 overflow-hidden rounded-lg object-cover object-center"
                                src="assets/images/placeholder.jpeg"
                                alt="Thumbnail"
                            />
                            <div className="space-y-2">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter">The Best Smart Home Devices of 2023</h3>
                                <p className="text-gray-500 dark:text-gray-400">March 15, 2023</p>
                                <p className="text-base md:text-lg text-gray-900 md:text-xl/relaxed dark:text-gray-100">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                                <a className="inline-flex items-center underline hover:text-gray-900 dark:hover:text-gray-50" href="#">
                                    Read More
                                    <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
                                </a>
                            </div>
                        </div>
                    </div> */}

                </div>
                <div className="border-t border-gray-200 dark:border-gray-800">
                    <div className="container py-8 md:py-12 lg:py-16 grid items-center justify-center gap-4 text-center md:px-6 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
                                Want to stay up to date with the latest gadgets?
                            </h2>
                            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                                Subscribe to our newsletter for news, reviews, and exclusive insights.
                            </p>
                        </div>
                        <form className="mx-auto max-w-sm space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="sr-only" htmlFor="email">
                                    Email
                                </label>
                                <input className="max-w-lg mx-auto" id="email" placeholder="Enter your email" type="email" />
                                <button type="submit" className="btn">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="w-[90vw] mx-auto">
                <div className="bg-gray-50/50 py-12 lg:py-16 xl:py-20">
                    <div className="container grid md:gap-4 lg:grid-cols-3 xl:gap-8">
                        <div className="space-y-4 lg:col-span-2 xl:col-span-1">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Gadget Enthusiast</h2>
                            <p className="text-base text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                                Your source for the latest news, reviews, and updates on the coolest gadgets. Whether you're into
                                smartphones, wearables, or smart home tech, we've got you covered.
                            </p>
                            <div className="flex flex-col gap-2 min-[600px]:flex-row">
                                <a
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:gap-1"
                                    href="#"
                                >
                                    Subscribe
                                </a>
                                <a
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:gap-1"
                                    href="#"
                                >
                                    Start Reading
                                </a>
                            </div>
                        </div>
                        <div className="grid max-w-sm gap-4 sm:max-w-none sm:grid-cols-3 md:gap-6 lg:order-first">
                            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                <img
                                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                                    height="150"
                                    width="300"
                                    src="assets/images/logo.png"
                                    alt="" />

                            </div>
                            {/* <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                            <img
                                alt="Logo"
                                className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                                height="150"
                                src="/images/placeholder.svg"
                                width="300"
                            />
                        </div>
                        <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                            <img
                                alt="Logo"
                                className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                                height="150"
                                src="/images/placeholder.svg"
                                width="300"
                            />
                        </div>
                        <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                            <img
                                alt="Logo"
                                className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                                height="150"
                                src="/images/placeholder.svg"
                                width="300"
                            />
                        </div> */}
                        </div>
                    </div>
                </div>
                <div className="py-10 lg:py-14 xl:py-16">
                    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Articles</h2>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Check out our latest and most popular articles on the coolest gadgets.
                            </p>
                        </div>
                    </div>
                    <div className="container grid lg:grid-cols-3 lg:gap-8 xl:gap-10">
                        <div className="flex flex-col gap-2 min-[500px]:grid min-[300px]:flex-row items-start">
                            <img
                                alt="Thumbnail"
                                className="overflow-hidden rounded-lg object-cover object-center"
                                height="300"
                                src="assets/images/placeholder.jpeg"
                                style={{
                                    aspectRatio: "500/300",
                                    objectFit: "cover",
                                }}
                                width="500"
                            />
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">The Best Smart Home Devices of 2023</h3>
                                <p className="text-gray-500 dark:text-gray-400">March 15, 2023</p>
                                <p className="text-xl leading-loose text-gray-900 md:text-2xl/relaxed dark:text-gray-100">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                                <a className="inline-flex items-center underline hover:text-gray-900 dark:hover:text-gray-50" href="#">
                                    Read More
                                    <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 min-[500px]:grid min-[300px]:flex-row items-start">
                            <img
                                alt="Thumbnail"
                                className="overflow-hidden rounded-lg object-cover object-center"
                                height="300"
                                src="assets/images/placeholder.jpeg"
                                style={{
                                    aspectRatio: "500/300",
                                    objectFit: "cover",
                                }}
                                width="500"
                            />
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">The Coolest Wearables at CES 2023</h3>
                                <p className="text-gray-500 dark:text-gray-400">January 28, 2023</p>
                                <p className="text-xl leading-loose text-gray-900 md:text-2xl/relaxed dark:text-gray-100">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                                <a className="inline-flex items-center underline hover:text-gray-900 dark:hover:text-gray-50" href="#">
                                    Read More
                                    <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 min-[500px]:grid min-[300px]:flex-row items-start">
                            <img
                                alt="Thumbnail"
                                className="overflow-hidden rounded-lg object-cover object-center"
                                height="300"
                                src="assets/images/placeholder.jpeg"
                                style={{
                                    aspectRatio: "500/300",
                                    objectFit: "cover",
                                }}
                                width="500"
                            />
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">The Hottest Smartphones of 2023</h3>
                                <p className="text-gray-500 dark:text-gray-400">April 5, 2023</p>
                                <p className="text-xl leading-loose text-gray-900 md:text-2xl/relaxed dark:text-gray-100">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </p>
                                <a className="inline-flex items-center underline hover:text-gray-900 dark:hover:text-gray-50" href="#">
                                    Read More
                                    <ChevronRightIcon className="w-4 h-4 ml-1.5 peer" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800">
                    <div className="container py-12 grid items-center justify-center gap-4 text-center md:px-6 md:py-16 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Want to stay up to date with the latest gadgets?
                            </h2>
                            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                                Subscribe to our newsletter for news, reviews, and exclusive insights.
                            </p>
                        </div>
                        <form className="mx-auto max-w-sm space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="sr-only" htmlFor="email">
                                    Email
                                </label>
                                <iput className="max-w-lg mx-auto" id="email" placeholder="Enter your email" type="email" />
                                <button type="submit">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}

        </>
    )
}

export default Mainpage;

function ChevronRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
