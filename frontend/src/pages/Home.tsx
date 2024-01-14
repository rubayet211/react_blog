import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Post[]>(`/posts${cat}`);
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          console.log('Error: received non-array response');
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchData();
  }, [cat]);

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="home flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="posts grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div className="post flex flex-col items-center m-2 p-2 bg-white rounded shadow-lg" key={post.id}>
            <div className="img w-64 h-64">
              <img className="object-cover rounded" src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content flex flex-col items-center mt-2">
              <Link className="link text-xl font-bold text-blue-500 hover:text-purple-600" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p className="text-gray-700">{getText(post.desc)}</p>
              <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:shadow-xl">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
