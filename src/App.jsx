import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./Login";
import { useEffect, useState } from "react";
import { auth } from "./Firebase";
import Widgets from "./Widgets";
import Spinner from "react-spinkit";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        //user is logged out
        dispatch(logout());
      }
      setIsLoading(false);
    });
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="app__loading">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
          alt=""
        />
        <Spinner name="three-bounce" color="#0a66c2" />
      </div>
    );
  }
  return (
    <div className="app">
      {!user ? "" : <Header />}
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
