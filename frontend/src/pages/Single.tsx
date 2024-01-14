import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

interface Post {
  img: string;
  userImg: string;
  username: string;
  date: string;
  title: string;
  desc: string;
  cat: string;
}

const Single: React.FC = () => {
  const [post, setPost] = useState<Post>({ img: "", userImg: "", username: "", date: "", title: "", desc: "", cat: "" });

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is undefined, make sure you're using the AuthContexProvider");
  }
  
  const { currentUser } = authContext;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Post>(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="single flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="content flex flex-col items-center w-3/4 bg-white rounded shadow-lg p-4">
        <img className="w-full h-96 object-cover rounded" src={`../upload/${post?.img}`} alt="" />
        <div className="user flex items-center justify-between w-full mt-4">
          {post.userImg && <img className="w-10 h-10 rounded-full" src={post.userImg} alt="" />}
          <div className="info flex flex-col items-center">
            <span className="text-xl font-bold text-blue-500">{post.username}</span>
            <p className="text-gray-700">Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit flex space-x-2">
              <Link to={`/write?edit=2`} state={post}>
                <img className="w-10 h-10 cursor-pointer hover:opacity-80" src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} className="w-10 h-10 cursor-pointer hover:opacity-80" src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
        <p
          className="mt-2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
  
};

export default Single;
