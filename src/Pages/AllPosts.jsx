import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await appwriteService.getAllPost([]);
        if (fetchedPosts) {
          setPosts(fetchedPosts.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return posts.length != 0 ? (
    <div className="flex items-center justify-center flex-wrap gap-4 md:py-10">
      {posts.map((post) => (
        <div key={post.$id}>
          <PostCard {...post} />
        </div>
      ))}
    </div>
  ) : (
    <div className="text-5xl text-center text-red-700 p-5">
      No Post is available
    </div>
  );
}

export default AllPosts;
