'use client'
import React from 'react'
import {useRouter} from "next/navigation"
import AppTable from './../components/Table';
import useSWR from "swr";


const Blogs = () => {
    const router = useRouter();
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR("http://localhost:8000/blogs", fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
        
    if(isLoading) {
      return <div> Loading...</div>
    }

    const handleLink = () => {
        router.push("/")
      };


  return (
    <div className='mt-4'>
        <div> {data?.length}</div>
        
         {/* TABLE DATA */}
        <AppTable blogs={data?.sort((a: any, b:any) => a.id  - b.id)}  />
        
        <button className="px-2 py-3 rounded-md mt-3" onClick={() => handleLink()}> HomePage Link</button>    
    </div>
  )
}

export default Blogs