'use client';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import {mutate} from "swr";
import { IBlog } from './../../types/backend.d';

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  blog: IBlog|null;
  setBlog: (value: IBlog|null) => void;
}

const UpdateModal = (props: IProps) => {
  const {showModalUpdate, setShowModalUpdate, blog, setBlog} = props;

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // LOAD LẠI DATA CẬP NHẬT
 useEffect(() => {
    if (blog && blog.id) {
        setId(blog.id);
        setTitle(blog.title);
        setAuthor(blog.author);
        setContent(blog.content);
    }
 }, [blog]);

  const handleSubmit = () => {
    if (!title) {
      toast.error("Title not empty");
      return;
    }
    if (!author) {
      toast.error("Author not empty");
      return;
    }
    if (!content) {
      toast.error("Content not empty");
      return;
    }

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        author: author,
        content: content
      })
    }).then(res => res.json())
    .then(res => {
        if(res) {
          setTitle("");
          setAuthor("");
          setContent("");
          handleCloseModal();
          mutate("http://localhost:8000/blogs");        // GIÚP LOAD LẠI DATA ĐÃ THÊM RA MÀN HÌNH
          toast.success("Update success!");
          console.log("check data form:", title, author, content);
        }
    });
  }

  const handleCloseModal = () => {
      setTitle("");
      setAuthor("");
      setContent("");
      setBlog(null);
      setShowModalUpdate(false)
  }

  return (
    <>
      <Modal show={showModalUpdate} onHide={() => handleCloseModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Add New A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Type your title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Type your name" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Content</Form.Label>
            <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
