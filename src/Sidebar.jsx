import "./Sidebar.css"
import { Avatar } from '@mui/material'
import Mountain from "./images/unsplash-mountain.jpg"
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';


function Sidebar() {
    const user = useSelector(selectUser)
    const recentItem = (topic) => {
        return (
            <div className="sidebar__recentItem">
                <span className="siderbar__hash">#</span>
                <p>{topic}</p>
            </div>
        )
    }
    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <img src={Mountain} alt="" />
                <Avatar src={user.photoURL} className='sidebar__avatar' >{user.email[0].toUpperCase()}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className='sidebar__statNumber'>2,546</p>
                </div>
                <div className="sidebar__stat">
                    <p>Views on post</p>
                    <p className='sidebar__statNumber'>2,440</p>
                </div>
            </div>
            <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem("reactjs")}
                {recentItem("programming")}
                {recentItem("softwareengineering")}
                {recentItem("design")}
                {recentItem("developer")}
            </div>
        </div>
    )
}

export default Sidebar