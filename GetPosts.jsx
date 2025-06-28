import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../constant";
import { useNavigate } from "react-router-dom";


const GetPosts = () => {
  const navigate=useNavigate();
  const [postData, setPostData] = useState();

  useEffect(() => {
    async function postsfxn() {
      try {
        const res = await axios.get(`${base_url}posts`);
        const fData = await res.data;
        console.log(fData);
        const finalPosts = await fData.users;
        console.log("Final:", finalPosts);
        setPostData(finalPosts);
      } catch (err) {
        console.log(err);
      }
    }
    postsfxn();
  });
  async function handleDelete(id){
     try{
         await axios.delete(`${base_url}post/${id}`);
         setPostData(postData.filter(post => post._id !== id));
     }catch(err){
      console.log(err);
      
     }
  }
  return (
    <div className="flex flex-wrap mb-5">
      {postData &&
        postData.map((post) => (
          <div
            key={post._id}
            className="w-96 border-0 shadow-md shadow-black rounded-sm h-auto p-5 align-middle mt-10 ml-5"
          >
            <h2 className="font-bold text-xl">{post.title}</h2>
            <p>{post.content}</p>
            <div className="w-[90%] flex space-x-3 justify-start ml-4 mt-4">
              <button className="border-0 bg-green-700 text-white rounded-sm p=2 w-20" onClick={()=>handleDelete(post._id)} >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GetPosts;
