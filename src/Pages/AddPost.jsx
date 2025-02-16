import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className='py-12 min-h-screen bg-black text-white'>
      <Container>
        <h2 className='text-5xl font-semibold text-center mb-6 '>
          Create a New Post
        </h2>
        <div className='bg-black shadow-md rounded-lg p-6'>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
