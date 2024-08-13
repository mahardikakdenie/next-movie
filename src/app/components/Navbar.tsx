import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

    return (
        <header className="p-3 border-b relative">
            <div className="p-5 flex justify-between gap-10 sticky">
                <div>
                    <Image src="/next.svg" width={180} height={300} alt="" />
                </div>
                <div className="w-[50%] relative">
                    {/* <div className="absolute"></div> */}
                    <input type="text" className="border w-full p-4 rounded-md" placeholder="Search Movie" />
                </div>
                <div className="flex gap-5 items-center">
                    <div>
                        <Link href="/">
                            <span className="text-xl font-bold">Menu</span>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <span className="text-xl">Category</span>
                        </Link>
                    </div>
                    <div>
                        <Link href="/">
                            <span className="text-xl">Account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar
