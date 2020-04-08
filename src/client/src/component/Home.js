import React from "react";

function checkAuthenticated(props) {
  fetch("http://localhost:4000/", {
    method: "GET",
    credentials: "include"
  })
    .then((res) => {
      if (res.status !== 200) props.history.push("/signin");
    })
    .catch(console.log);
}

function Home(props) {
  checkAuthenticated(props);
  return <div>Queo cùm</div>;
}

export default Home;
