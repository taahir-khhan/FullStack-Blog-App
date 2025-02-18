import { motion } from "framer-motion";
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
        if (post) {
          setPost(post);
        } else {
          navigate("/all-post");
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/all-post");
      }
    });
  };

  return post ? (
    <Container className='w-full max-w-4xl mx-auto py-8 px-4 md:px-8'>
      {/* Featured Image with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full overflow-hidden rounded-xl shadow-lg'
      >
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className='w-full h-auto max-h-[300px] md:max-h-[500px] object-cover rounded-xl transform hover:scale-105 transition-transform duration-300'
        />
      </motion.div>

      {/* Post Title with Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-3xl sm:text-4xl md:text-5xl font-bold mt-6 text-white text-center md:text-left'
      >
        {post.title}
      </motion.h1>

      {/* Post Content with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='mt-4 text-base sm:text-lg text-gray-300 leading-relaxed text-center md:text-left'
      >
        {parse(post.content)}
      </motion.div>

      {/* Buttons for Author (Edit and Delete) */}
      {isAuthor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='mt-8 flex flex-wrap gap-4 justify-center md:justify-start'
        >
          <Link to={`/edit-post/${post.$id}`}>
            <Button
              bgColor='bg-green-700'
              hoverColor='hover:bg-white'
              className='px-6 py-2 rounded-lg'
            >
              Edit
            </Button>
          </Link>
          <Button
            bgColor='bg-red-600'
            hoverColor='hover:bg-white'
            onClick={deletePost}
            className='px-6 py-2 rounded-lg'
          >
            Delete
          </Button>
        </motion.div>
      )}
    </Container>
  ) : null;
}
