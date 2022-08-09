import "./App.css";
import Login from "./Components/Login";
// import Home from "./Components/Home";
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { getTokenfromUrl } from "./Components/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Components/Player";
import { useDataLayerValue } from "./Components/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenfromUrl();
    console.log("HASH >>", hash);
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("4aUXflW1ZtTv7AHXpwwYaZ").then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          bluePill: response,
        });
      });
    }
  }, []);

  console.log("USER >> --", user);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
    // <Router>
    //   <div className="app">
    //     <Switch>
    //       <Route path="/login">
    //         <Login />
    //       </Route>
    //       <Route path={["/home", "/"]}>
    //         <Home />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;
