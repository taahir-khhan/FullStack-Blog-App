import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getAllPost().then((data) => {
      if (data) {
        setPosts(data.documents);
      }
    });
  });

  if (posts.length === 0) {
    return (
      <Container
        className={
          "w-full bg-indigo-200 h-auto flex herom:flex-col  gap-10  herob:flex-row justify-around py-16 px-20"
        }
      >
        <div>
          <h1 className="herob:text-5xl herom:text-3xl font-medium mb-10">
            Read Latest Blog from different Topics, <br /> Login to Exlpore
            more.
          </h1>
          <p className="text-base md:text-lg text-gray-500">
            Checkout Sports, Art, Tech, Music, Poetry, Global Upadates etc. from
            all across the world.
          </p>

          <Button
            bgColor="bg-indigo-600"
            textColor="text-white"
            hoverColor="hover:bg-indigo-800"
          >
            Login to Explore
          </Button>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/128/3291/3291662.png"
          alt="Blogging image"
          className="w-[150px] md:w-[200px] rounded-lg object-cover"
        />
      </Container>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
