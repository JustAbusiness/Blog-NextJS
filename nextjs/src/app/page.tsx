import Link from "next/link";
import wibu from "@/styles/wibu.module.css";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";


export default function Home() {
 
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("http://localhost:8000/blogs");
  //     const data = await res.json();
  //     console.log(data);
  //   }
  //   fetchData();
  // }, [])

  return (
    <main>
      <h1> NextJS Series</h1>
      <ul>
        <li className={wibu["green"]}>
          <a href={"/blogs"}>Blogs</a>
        </li>
        <li className={wibu["red"]}>
          <a href={"/product"}>Product</a>
        </li>
      </ul>

    {/* TABLE DATA */}
     {/* <AppTable blogs={data?.sort((a: any, b:any) => b.id  - a.id)}  /> */}

    </main>
  );
}
