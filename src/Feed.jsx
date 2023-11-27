import "./Feed.css";
import Post from './Post';
import ModeIcon from '@mui/icons-material/Mode';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import { useState, useEffect } from 'react';
import { db } from './Firebase';
import { getDocs, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore'; // Import Firestore functions
import { serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Feed() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
            const postData = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            setPosts(postData);
            setInput("");
        });

        return () => {
            // Unsubscribe when the component unmounts
            unsubscribe();
        };
    }, []);

    const sendPost = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                name: user.displayName,
                description: user.email,
                message: input,
                photoUrl: user.photoURL || "",
                timestamp: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

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
            {posts.map(({ id, data: { name, description, message, photoUrl }, currentUser }) => (
                <Post
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl}
                    id={id}
                    currentUser={user} />
            ))}
        </div>
    );
}

export default Feed;
