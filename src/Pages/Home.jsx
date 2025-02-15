import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getAllPost().then((data) => {
      if (data) {
        setPosts(data.documents);
      }
    });
  });

  if (posts.length === 0) {
    return (
      // <Container
      //   className={
      //     "w-full bg-indigo-200 h-auto flex herom:flex-col  gap-10  herob:flex-row justify-around py-16 px-20"
      //   }
      // >
      //   <div>
      //     <h1 className='herob:text-5xl herom:text-3xl font-medium mb-10'>
      //       Read Latest Blog from different Topics, <br /> Login to Exlpore
      //       more.
      //     </h1>
      //     <p className='text-base md:text-lg text-gray-500'>
      //       Checkout Sports, Art, Tech, Music, Poetry, Global Upadates etc. from
      //       all across the world.
      //     </p>

      //     <Button
      //       bgColor='bg-indigo-600'
      //       textColor='text-white'
      //       hoverColor='hover:bg-indigo-800'
      //     >
      //       Login to Explore
      //     </Button>
      //   </div>

      //   <img
      //     src='https://cdn-icons-png.flaticon.com/128/3291/3291662.png'
      //     alt='Blogging image'
      //     className='w-[150px] md:w-[200px] rounded-lg object-cover'
      //   />
      // </Container>
      <Container
        className={
          "w-full bg-black h-auto flex flex-col md:flex-row gap-10 justify-around items-center py-20 px-10 md:px-20"
        }
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-center md:text-left'
        >
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            Read the Latest Blogs <br />
            <span className='bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent'>
              Explore the World of Ideas
            </span>
          </h1>
          <p className='text-lg md:text-xl text-gray-300 mb-8'>
            Dive into Sports, Art, Tech, Music, Poetry, and Global Updates from
            all across the world.
          </p>
          <Button
            onClick={() => navigate("/login")}
            bgColor='bg-yellow-400'
            textColor='text-black'
            hoverColor='hover:bg-white'
            className='mx-auto md:mx-0 transition-shadow duration-300 shadow-lg hover:shadow-white/50'
          >
            Login to Explore
          </Button>
        </motion.div>

        {/* Animated Gradient Sphere */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='relative w-64 h-64 md:w-80 md:h-80'
        >
          <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-2xl opacity-50 animate-pulse' />
          <div className='relative w-full h-full bg-black rounded-full flex items-center justify-center'>
            <div className='text-white text-2xl md:text-3xl font-bold text-center'>
              <span className='bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent'>
                Blog
              </span>
              <br />
              <span className='text-gray-300'>Universe</span>
            </div>
          </div>
        </motion.div>
      </Container>
    );
  }

  return (
    // <div className='w-full py-8'>
    //   <Container>
    //     <div className='flex flex-wrap'>
    //       {posts.map((post) => (
    //         <div key={post.$id} className='p-2 w-1/4'>
    //           <PostCard {...post} />
    //         </div>
    //       ))}
    //     </div>
    //   </Container>
    // </div>
    <div className='w-full py-12 bg-black'>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='flex flex-wrap justify-center gap-6'
        >
          {posts.map((post) => (
            <motion.div
              key={post.$id}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(255, 223, 0, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className='p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
            >
              <PostCard
                {...post}
                className='bg-white/10 backdrop-blur-md rounded-lg border border-white/10 hover:border-yellow-400 transition-all duration-300'
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}

export default Home;
