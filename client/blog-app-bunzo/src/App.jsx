import React from "react";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import NewBlog from "./Pages/NewBlog";
import AllBlogs from "./Pages/AllBlogs";
import EditBlog from "./Pages/EditBlog";
import "./App.css";
import Navbar from "./Components/Navbar";
import SingleBlog from "./Pages/SingleBlog";
import { EditorProvider } from "react-simple-wysiwyg";

const App = () => {
  return (
    <>
      <EditorProvider>
        <div className="container">
          <Navbar />
        </div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<NewBlog />} />
            <Route exact path="/edit" element={<EditBlog />} />
            <Route exact path="/all" element={<AllBlogs />} />
            <Route exact path="/:id" element={<SingleBlog />} />
          </Routes>
        </BrowserRouter>
      </EditorProvider>
    </>
  );
};

export default App;
