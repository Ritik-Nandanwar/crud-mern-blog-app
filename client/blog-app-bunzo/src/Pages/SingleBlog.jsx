import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Editor } from "react-simple-wysiwyg";
import Select from "react-select";
const SingleBlog = () => {
  var [blog, setBlog] = useState("");
  var [tags, setTags] = useState([]);
  var [title, setTitle] = useState("");
  var [author, setAuthor] = useState("");
  var [selectedDate, setSelectedDate] = useState("");

  var navigate = useNavigate();
  var [content, setContent] = useState("Write your <b>Blog</b> here");
  const [seletedOptions, setSelectedOptions] = useState();
  let params = useParams();
  var selected_options = [];
  const getOneBlogById = async () => {
    let data = await fetch(`http://localhost:8080/${params.id}`);
    let dd = await data.json();
    console.log(dd);
    setBlog(dd);
  };
  const deleteSingleBlog = async (id) => {
    console.log("to be deleted id ", id);
    fetch(
      `http://localhost:8080/deleteone/${id}`,
      {
        method: "Delete",
        body: JSON.stringify({
          id,
        }),
      },
      {
        "Content-type": "application/json",
      }
    ).then(
      () => console.log("Delete requested"),
      navigate("/all"),
      location.reload()
    );
  };
  var selected_option_build_arr = () => {
    for (var i = 0; i < blog?.tags?.length; i++) {
      selected_options.push({
        value: blog.tags[i].capitalize,
        label: blog.tags[i],
      });
    }
  };
  selected_option_build_arr();
  const handleChange = (e) => {
    setTags(e.map((x) => x.value)); //map() returns a array(LOOK IT UP!!!)
    console.log(e);
  };
  useEffect(() => {
    getOneBlogById();
  }, []);
  const updateSingleBlog = async ({
    title,
    content,
    author,
    selectedDate,
    tags,
  }) => {
    console.log("title- ", title);
    console.log("author- ", author);
    console.log("content- ", content);
    console.log("date- ", selectedDate);
    console.log("tags- ", selected_options);
    await fetch("http://localhost:8080/updateone", {
      method: "POST",
      body: JSON.stringify({ title, content, author, selectedDate, tags }),
      headers: {
        "Content-type": "application/json;",
      },
    })
      .then(() => console.log("sent update req..."))
      .catch((err) => console.error(err));
    // console.log(title, selectedDate, content, author, tags);
  };
  return (
    <>
      <div className="container">
        <form action="" className="p-2">
          <input
            type="text"
            name="Title"
            defaultValue={blog.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text-black bordered text-darken-4"
          />
          <Editor
            value={blog.content}
            containerProps={{ style: { backgroundColor: "#EEF7FF" } }}
            name="content"
            // onChange={(e) => setContent(e.target.value)}
            className="grey lighten-2 bordered darken-4 white"
          />
          <input
            type="text"
            name="Author"
            defaultValue={blog.author}
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
            disabled
          />
          <Select
            placeholder="Choose tags"
            value={selected_options} // set selected values
            onChange={handleChange}
            isMulti
            isDisabled
          />
          <button
            type="submit"
            className="btn green my-2"
            style={{ width: "100%" }}
            onClick={(e) => {
              e.preventDefault();
              updateSingleBlog({ title, content, author, selectedDate, tags });
            }}
          >
            Edit post
          </button>
          <button
            className="btn red my-2"
            style={{ width: "100%" }}
            onClick={(e) => {
              e.preventDefault();
              deleteSingleBlog(params.id);
            }}
          >
            Delete post
          </button>
        </form>
      </div>
    </>
  );
};

export default SingleBlog;
