import axios from "axios";
import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
}

interface MenuProps {
  cat: string;
}

const Menu: React.FC<MenuProps> = ({ cat }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Post[]>(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="fixed inset-y-0 right-0 w-64 px-8 py-4 bg-gray-100 border-l overflow-auto transform transition-all duration-500 ease-in-out">
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Other posts you may like</h1>
      {posts.map((post) => (
        <div className="flex flex-col items-center m-2 p-2 bg-white rounded shadow-lg" key={post.id}>
          <img className="w-64 h-64 object-cover rounded" src={`../upload/${post?.img}`} alt="" />
          <h2 className="text-xl font-bold mt-2">{post.title}</h2>
          <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:shadow-xl">Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
