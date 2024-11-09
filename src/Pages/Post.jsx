import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <Container className="w-1/2 mx-auto ">
      <div>
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl"
        />
      </div>

      <div>
        <h1 className="text-4xl font-medium mt-3">{post.title}</h1>
        <p className="text-[1.1rem] text-gray-600 mt-2">
          {parse(post.content)}
        </p>
      </div>

      <div>
        {isAuthor && (
          <div>
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-green-500"
                hoverColor="hover:bg-green-700"
                className="mr-3"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-500"
              hoverColor="hover:bg-red-700"
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </Container>
  ) : null;
}
