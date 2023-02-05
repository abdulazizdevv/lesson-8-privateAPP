import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "../../components/Modal/Modal";
import { UserContext } from "../../context/UserContext";

export const Posts = () => {
  const { user } = useContext(UserContext);
  const titleRef = useRef();
  const bodyRef = useRef();
  const [postModal, setPostModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState();

  const getPosts = async () => {
    const data = await axios.get("http://localhost:8080/posts");
    if (data) {
      setPosts(data.data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handlePost = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:8080/posts", {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        author: user.first_name + " " + user.last_name,
      })
      .then((res) => {
        if (res.status === 201) {
          setPostModal(false);
          getPosts();
        }
      })
      .catch((err) => console.log(err));

    axios
      .put(`http://localhost:8080/posts/${id}`, {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        author: user.first_name + " " + user.last_name,
      })
      .then((res) => {
        if (res.status === 200) {
          getPosts();
        }
      })
      .catch((err) => console.log(err));
    setPostModal(false);
  };
  const deletPost = (id) => {
    axios
      .delete(`http://localhost:8080/posts/${id}`)
      .then((data) => {
        if (data) {
          getPosts();
        }
      })
      .catch((err) => console.log(err));
  };

  const editPost = (id) => {
    setPostModal(true);

    setId(id);
  };

  const handleEdit = (evt) => {
    if (evt.target) {
      const postId = evt.target.dataset.postId;
      editPost(postId);
    }
  };

  const handleDelete = (evt) => {
    if (evt.target) {
      const postId = evt.target.dataset.postId;
      deletPost(postId);
    }
  };

  return (
    <div>
      <button
        onClick={() => setPostModal(true)}
        className="btn btn-secondary mt-4"
      >
        ADD POST +
      </button>

      <h2 className="h2 text-center my-5">Posts</h2>
      {posts.length ? (
        <div className="d-flex flex-wrap gap-3 justify-content-center  ">
          {posts.map((post) => (
            <div className="card w-25 p-3 shadow" key={post.id}>
              <h3>{post.title}</h3>
              <h5>{post.body}</h5>
              <p>{post.author}</p>
              <div className="d-flex gap-3">
                <button
                  onClick={handleEdit}
                  data-post-id={post.id}
                  className="btn btn-warning"
                >
                  EDIT
                </button>
                <button
                  onClick={handleDelete}
                  data-post-id={post.id}
                  className="btn btn-danger"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {postModal ? (
        <Modal title={"ADD POST"} modal={postModal} setModal={setPostModal}>
          <form onSubmit={handlePost}>
            <input
              className="form-control my-3"
              ref={titleRef}
              type="text"
              placeholder="Title"
            />
            <input
              className="form-control my-3"
              ref={bodyRef}
              type="text"
              placeholder="Body"
            />
            <button className="btn btn-success">SEND</button>
          </form>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};
