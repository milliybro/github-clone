//user page
import { ENDPOINT, LIMIT } from "./const.js";
import fetch from "./fetch.js";

const userPage = document.querySelector(".user-page");

const query = new URLSearchParams(location.search);

const userName = query.get("name");

async function getCountries() {
  try {
    userPage.innerHTML = "Loading...";

    let user = await fetch(`${ENDPOINT}users/${userName}`);
    
    user.map((user) => {
      userPage.innerHTML += `
      <div>
         <h4>${user.login}</h4>
      </div>
            `;
    });
  } catch (err) {
    alert(err);
  }
}

getCountries();
