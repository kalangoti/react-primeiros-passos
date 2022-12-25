import { useState } from "react";
import GitHubImage from "../src/assets/GitHub-Mark.png";

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  blog: string;
  location: string;
  bio: string;
}

function App() {
  const [search, setSearch] = useState("kalangoti");
  const [userData, setUserData] = useState<GitHubUser>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/users/${search}`)
      .then((response) => response.json())
      .then((userResponse) => {
        userResponse.login ? setUserData(userResponse) : setUserData(undefined);
      });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { currentTarget } = event;
    if (currentTarget) setSearch(currentTarget.value);
  };

  return (
    <div className="container text-center">
      <h1 className="py-5 text-uppercase">GitHub Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="search">Type your GitHub user</label>
          <div className="input-group">
            <input id="search" type="text" className="form-control" required value={search} onChange={handleChange} />

            <span className="input-group-btn">
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </span>
          </div>
        </div>
      </form>

      <div className="py-5">
        {!userData && <img src={GitHubImage} alt="GitHub-Mark" className="responsive rounded-circle" height="200px" />}

        {userData && (
          <div>
            <img src={userData?.avatar_url} alt="GitHub-Mark" className="responsive rounded-circle" height="200px" />

            <h1 className="pt-2">
              GitHub:{" "}
              <a href={userData?.html_url} target="_blank">
                {userData?.name}
              </a>
            </h1>

            <h3>{userData?.location}</h3>

            <p>
              <a href={userData?.blog} target="_blank">
                {userData?.blog}
              </a>
            </p>

            <div className="row justify-content-md-center">
              <p className="text-info">{userData?.bio}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
