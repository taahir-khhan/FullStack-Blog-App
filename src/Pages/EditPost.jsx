import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((data) => {
        if (data) {
          setPost(data);
          console.log(data);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
