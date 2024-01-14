import React, { useState, ChangeEvent, FormEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write: React.FC = () => {
  const state = useLocation().state;
  const [value, setValue] = useState<string>(state?.title || "");
  const [title, setTitle] = useState<string>(state?.desc || "");
  const [file, setFile] = useState<File | null>(null);
  const [cat, setCat] = useState<string>(state?.cat || "");

  const navigate = useNavigate();

  const upload = async (): Promise<string | undefined> => {
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="add flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="content flex flex-col items-center w-3/4 bg-white rounded shadow-lg p-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer w-full mt-4">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu flex flex-col items-center w-3/4 bg-white rounded shadow-lg p-4 mt-4">
        <div className="item flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold text-blue-500 mb-4">Publish</h1>
          <span className="text-gray-700">
            <b>Status: </b> Draft
          </span>
          <span className="text-gray-700">
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={handleFileChange}
          />
          <label className="file mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:shadow-xl cursor-pointer" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons flex space-x-2 mt-4">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Save as a draft</button>
            <button onClick={handleClick} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:shadow-xl">Publish</button>
          </div>
        </div>
        <div className="item flex flex-col items-center w-full mt-4">
          <h1 className="text-2xl font-bold text-blue-500 mb-4">Category</h1>
          {/* ... (rest of the code remains unchanged) */}
        </div>
      </div>
    </div>
  );
};

export default Write;
