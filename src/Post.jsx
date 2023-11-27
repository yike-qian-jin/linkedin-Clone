import "./Post.css";
import { Avatar } from "@mui/material";
import InputOption from "./InputOption";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./Firebase";

function Post({ name, description, message, photoUrl, id, currentUser }) {
  const deletePost = (id) => {
    const postDoc = doc(db, "posts", id);
    deleteDoc(postDoc);
  };

  const isCurrentUserPost = currentUser && currentUser.displayName === name;
  if (!isCurrentUserPost) return null;

  return (
    <div className="post">
      <div className="post__header">
        <Avatar src={photoUrl}>{name[0].toUpperCase()}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <button id="delete" onClick={() => deletePost(id)}>
          X
        </button>
      </div>
      <div className="post__body">
        <p>{message}</p>
      </div>
      <div className="post__buttons">
        <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" />
        <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>
    </div>
  );
}

export default Post;
