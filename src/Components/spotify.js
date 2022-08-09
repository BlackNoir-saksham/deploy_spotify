export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUrl = "http://localhost:3000/";

const clientId = "0d09b1dcc6ef4cdb8a00de3d09cb5125";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
];

export const getTokenfromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
