import "./HeaderOption.css"
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function HeaderOption({ avatar, Icon, title, onClick }) {
    const user = useSelector(selectUser)
    return (
        <div className='headerOption' onClick={onClick}>
            {Icon && <Icon className="headerOption__icon" />}
            {avatar && <Avatar className="headerOption__icon" src={user.photoURL} >{user.email[0].toUpperCase()}</Avatar>}
            {title ? <h3 className="headerOption__title">{title}</h3> : <h3 className="headerOption__title">{user.displayName}</h3>}
        </div>
    )
}

export default HeaderOption