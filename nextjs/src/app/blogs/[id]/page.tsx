'use client'
import Link from "next/link";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR, {Fetcher} from "swr";
import { IBlog } from './../../../types/backend.d';


// params tự gọi trong docs của nextJS
const ViewDetailPage = ({ params }: { params: { id: string } }) => {
  // console.log("check id", params.id);

  const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then(res => res.json());
  const {
    data,
    error,
    isLoading
  } = useSWR(`http://localhost:8000/blogs/${params.id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  if (isLoading) {
    return <div> Loading...</div>;
  }

  return (
    <div>
      <Button className="mb-3">
        <Link href={'/blogs'} className="text-white text-decoration-none">
          Go Back
        </Link>
      </Button>
      <Card>
        <Card.Header as="h5"> Ttitle : {data?.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            {data?.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            Author: {data?.author}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ViewDetailPage;
