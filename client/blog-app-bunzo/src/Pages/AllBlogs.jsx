import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    var posts = await fetch("http://localhost:8080/all");
    var accData = await posts.json();
    console.log(accData);
    setPosts(accData);
  };
  return (
    <>
      <div className="container">
        {posts.map((post) => (
          <Link key={post._id} to={`http://localhost:5173/${post._id}`}>
            <div className="teal card lighten-4 my-4 p-2">
              <h5 className="">{post.title}</h5>
              <h6
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="grey-text darken-4"
              />
              <span>&nbsp;~ {post.author}</span>
              <br />
              <hr />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllBlogs;
