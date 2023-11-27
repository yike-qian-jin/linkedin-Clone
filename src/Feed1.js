import "./Feed.css"
import Post from './Post';
import ModeIcon from '@mui/icons-material/Mode';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import { useState, useEffect } from 'react';
import { db } from './Firebase';
import { getFirestore } from "firebase/firestore";


function Feed() {
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) =>
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
    }, [])
    const sendPost = (event) => {
        event.preventDefault()
        db.collection("posts").add({
            name: "anokata",
            description: "this is a test",
            message: input,
            photoUrl: "",
            timestamp: getFirestore.FieldValue.serverTimestamp(),

        })
    }
    return (
        <div className='feed'>
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <ModeIcon />
                    <form>
                        <input type="text" value={input} onChange={event => setInput(event.target.value)} />
                        <button type="submit" onClick={sendPost}>Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption title="Photo" Icon={ImageIcon} color="70B5F9" />
                    <InputOption title="Videos" Icon={SubscriptionsIcon} color="#E7A33E" />
                    <InputOption title="Event" Icon={EventNoteIcon} color="#C0CBCD" />
                    <InputOption title="Write acticle" Icon={CalendarViewDayIcon} color="#7FC15E" />
                </div>
            </div>
            {/* posts */}
            {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
                <Post
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl} />
            ))}
        </div>
    )
}

export default Feed

// old code for pushing posts but waiting until refresh to display them
// useEffect(() => {
//     const fetchData = async () => {
//         const querySnapshot = await getDocs(collection(db, "posts"));
//         const postData = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//         }));
//         setPosts(postData);
//     };

//     fetchData();
// }, []);


// new with pushing posts and displaying them
// useEffect(() => {
//     const fetchData = async () => {
//         const querySnapshot = await getDocs(collection(db, "posts"));
//         const postData = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//         }));
//         setPosts(postData);
//     };

//     fetchData();
// }, [posts]);