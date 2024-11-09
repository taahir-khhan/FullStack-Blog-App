import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-[200px] md:w-[350px] bg-white rounded-xl pb-4">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="rounded-t-xl"
        />

        <h2 className="text-xl md:text-2xl font-bold mt-4 ml-2">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
