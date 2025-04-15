import * as React from "react"
import Link from "next/link";

function MenuList({ variant }: { variant?: "vertical" | "horizontal" }) {
    const isVertical = variant === "vertical";
    return (
        <nav>
            <ul className={isVertical ? "space-y-4" : "flex justify-around"}>
                <li><Link href="/" className="text-blue-500">Home</Link></li>
                <li><a href="/cocktails" className="text-blue-500">Les cocktails</a></li>
                <li><a href="/calendrier" className="text-blue-500">Le calendrier</a></li>
            </ul>
        </nav>
    );
}

export default MenuList;