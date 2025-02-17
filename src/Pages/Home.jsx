import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "../components";

function Home() {
  const navigate = useNavigate();

  return (
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

export default Home;
