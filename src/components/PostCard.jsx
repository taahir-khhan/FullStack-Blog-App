import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full max-w-[350px] bg-black/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-yellow-400'>
        {/* Featured Image */}
        <div className='w-full h-48 md:h-56 overflow-hidden'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-300'
          />
        </div>

        {/* Card Content */}
        <div className='p-4'>
          <h2 className='text-xl md:text-2xl font-bold text-white mb-2 truncate'>
            {title}
          </h2>
          <p className='text-sm text-gray-400'>Read more →</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
