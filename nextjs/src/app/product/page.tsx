'use client'
import React from "react";
import {useRouter} from "next/navigation"

const Productpage = () => {
    const router = useRouter();
    const handleLink = () => {
      router.push("/")
    };
  return <div>
     Product page
    <ul>
        <li>Tomato</li>
        <li> Orange </li>
        <li> Water Melon </li>
    </ul>
    <button className="px-2 py-3 bg-red-400 rounded-md mt-3" onClick={() => handleLink()}> HomePage Link</button>
  </div>;
};

export default Productpage;
