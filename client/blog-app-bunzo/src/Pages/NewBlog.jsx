import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Editor from "react-simple-wysiwyg";

const NewBlog = () => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [content, setContent] = useState("Write your <b>Blog</b> here");

  const handleChange = (e) => {
    setTags(e.map((x) => x.value)); //map() returns a array(LOOK IT UP!!!)
    console.log(e);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };
  const data = [
    { value: "anime", label: "Anime" },
    { value: "movie", label: "Movie" },
    { value: "tvshows", label: "TV Show" },
    { value: "sports", label: "Sports" },
    { value: "egames", label: "E Games" },
    { value: "tech", label: "Tech" },
    { value: "automobiles", label: "Automobiles" },
    { value: "stockmarket", label: "Stock Market" },
  ];
  const postBlog = async ({ title, selectedDate, content, author, tags }) => {
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        author,
        selectedDate: new Date().toISOString().substring(0, 10),
        tags,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => console.log("sent..."), navigate("/all"))
      .catch((err) => console.error(err));
    console.log(title, selectedDate, content, author, tags);
  };
  return (
    <>
      <div
        className="container green lighten-5 mt-2"
        style={{ maxWidth: "32rem", borderRadius: "12px" }}
      >
        <h2 className="center">His</h2>
        <form action="" className="p-2">
          {" "}
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text-black bordered text-darken-4"
          />
          <Editor
            value={content}
            containerProps={{ style: { backgroundColor: "#EEF7FF" } }}
            name="content"
            onChange={onChangeContent}
            className="grey lighten-2 bordered darken-4 white"
          />
          <input
            type="text"
            name="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="text-black"
          />
          <input
            type="date"
            name="Date"
            placeholder={new Date().toISOString().substring(0, 10)}
            value={new Date().toISOString().substring(0, 10) || selectedDate} //set to `today's` current date
            className="text-black"
          />
          <Select
            placeholder="Choose tags"
            options={data}
            value={data.filter((obj) => tags.includes(obj.value))} // set selected values
            onChange={handleChange}
            isMulti
          />
          <button
            type="submit"
            className="btn green my-2"
            style={{ width: "100%" }}
            onClick={(e) => {
              e.preventDefault();
              postBlog({
                title,
                content,
                author,
                selectedDate,
                tags,
              });
            }}
          >
            Save post
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBlog;
