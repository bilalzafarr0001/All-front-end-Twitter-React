import { Redirect, Route, Switch as Swh } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MyRouter from "./MyRouter";
import Home from "./pages/Home/Home";
import EditProfile from "./pages/Profile/EditProfile";
import Profile from "./pages/Profile/Profile";
import TweetDetail from "./pages/TweetDetail/TweetDetail";
import Lists from "./pages/Lists/Lists";
import Trends from "./pages/Trends/Trends";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      {JSON.parse(localStorage.getItem("user")) ? (
        <MyRouter />
      ) : (
        <Redirect to="/register" />
      )}
      <Swh>
        <Route exact path="/" component={Home} />
        <Route path="/accounts/edit" component={EditProfile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/lists" component={Lists} />
        <Route path="/trends" component={Trends} />
        <Route exact path={`/:handle`} component={Profile} />
        <Route
          exact
          path={`/:handle/status/:tweetId`}
          component={TweetDetail}
        />
        <Route component={NotFound} />
      </Swh>
    </>
  );
}

export default App;
