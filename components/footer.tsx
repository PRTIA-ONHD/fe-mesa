import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className=" p-2 flex items-center justify-between max-w-lg w-full text-black">
            <div className="flex items-center">
                <Image
                    src="/Call.png"
                    width={20}
                    height={20}
                    alt="call logo"
                />
                <span className="ml-2 text-sm">01 234 5678</span>
            </div>
            <Link href="https://www.facebook.com" target="_blank">
                <Image
                    src="/facebook.png"
                    width={20}
                    height={30}
                    alt="facebook logo"
                />
            </Link>
        </div>
    );
}
