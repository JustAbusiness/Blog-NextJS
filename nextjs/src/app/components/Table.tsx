'use client'
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import { IBlog } from './../../types/backend.d';
import CreateModal from './create.modal';
import UpdateModal from './update.modal';
import Link from 'next/link';
import {mutate} from "swr";
import { toast } from 'react-toastify';


interface IProps {
    blogs : IBlog[]
}

const AppTable = (props: IProps) => {
    const {blogs} = props;
    
    const [blog, setBlog] = useState<IBlog | null>(null);
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    const handleDelete = (id: number) => {
        if (confirm(`Do you want to delete this blog (id = ${id}) `)) {
            fetch(`http://localhost:8000/blogs/${id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json, text/plain */*',
                'Content-type': 'application/json'
              },
            }).then(res => res.json())
               .then(res => {
                if (res) {
                  toast.success("Delete success");
                  mutate("http://localhost:8000/blogs");
                }
               }) ;      
        }
    }   

  return (
    <div>
    <div className='mb-3' style={{display: "flex", justifyContent: "space-between"}}>
        <h3>Table Blogs</h3>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>Add New</Button>
    </div>

    <Table bordered hover size="sm">
      <thead className='text-center'>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          {blogs?.map((item, index) => (
            <tr key={item.id} className='text-center'>
                <td>{index}</td>
                <td>{item.author}</td>
                <td>{item.title}</td>
                <td>
                  <Button variant='primary'> 
                    <Link href={`/blogs/${item.id}`} className='text-white text-decoration-none'>
                        View
                    </Link> 
                  </Button>
                  <Button variant='warning' className='mx-3' onClick={() => {setBlog(item); setShowModalUpdate(true)}}> Edit </Button>
                  <Button variant='danger' onClick={() => handleDelete(item.id)}> Delete </Button>
                </td>
            </tr>
          ))}
      </tbody>
    </Table>

    <CreateModal  showModalCreate={showModalCreate}
    setShowModalCreate = {setShowModalCreate} 
    />

    <UpdateModal showModalUpdate={showModalUpdate}
        setShowModalUpdate = {setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
     />
    </div>
  )
}

export default AppTable