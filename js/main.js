import { ENDPOINT, LIMIT } from "./const.js";
import fetch from "./fetch.js";

const postsRow = document.querySelector(".posts-row");
const searchInput = document.querySelector("input");
const totalPosts = document.querySelector(".total-posts");
const pagination = document.querySelector(".pagination");

let search = "";
let activePage = 1;
async function getPosts() {
  try {
    let params = {
      q: search,
      _page: activePage,
      _limit: LIMIT,
    };
    const query = new URLSearchParams(params);

    postsRow.innerHTML = "Loading...";
    const p1 = fetch(`${ENDPOINT}users`);
    const p2 = fetch(`${ENDPOINT}${search ? "search/" : ""}users?${search? `q=${search}&` : ""}page=${activePage}&per_page=${LIMIT}`);
// https://api.github.com/search/users?q=a&page=5&per_page=100


    const [posts, pgtnPosts] = await Promise.all([p1, p2]);
    let pages = Math.ceil(pgtnPosts.total_count / LIMIT);

    if (pages) {
      pagination.innerHTML = `
        <li class="page-item ${activePage === 1 ? "disabled" : ""}">
          <button page="-" class="page-link">Previous</button>
        </li>
      `;

      pagination.innerHTML += `
        <li class="page-item ${activePage === 1 ? "d-none" : "" }">
          <button page="${activePage}" class="page-link">
             <img class="point" src="../image/3 point.png" alt="">
          </button>
        </li>
      `;

      pagination.innerHTML += `
        <li class="page-item">
          <button page="${activePage}" class="page-link">${activePage}</button>
        </li>
      `;

      pagination.innerHTML += `
        <li class="page-item ${activePage === pages ? "d-none" : "" }">
          <button page="${activePage}" class="page-link">
             <img class="point" src="../image/3 point.png" alt="">
          </button>
        </li>
      `;
      // for (let i = 1; i <= pages; i++) {
      //   //pagination.innerHTML += `
      //   <li class="page-item ${i === activePage ? "active" : ""}">
      //     <button page="${i}" class="page-link">${i}</button>
      //   </li>
      // `;
      // }

      pagination.innerHTML += `
        <li class="page-item ${activePage === pages ? "disabled" : ""}">
          <button page="+"  class="page-link">Next</button>
        </li>
      `;
    } else {
      pagination.innerHTML = "";
    }
    totalPosts.textContent = (search? pgtnPosts.total_count : pgtnPosts.length);
    postsRow.innerHTML = "";
    console.log(pgtnPosts);
    if (posts.length) {
       (search? pgtnPosts.items : pgtnPosts).map((post) => {
          postsRow.innerHTML += `
         <a href="../pages/user.html?name=${post.login}">
            <div class="users">
               <img style="width:200px" src="${post.avatar_url}" alt="">
               <h3 class="user_login">@${post.login}</h3>
               <h6 class="user_id">id:${post.id}</h6>
            </div>
         </a>    
         `;
      });
    } else {
      postsRow.innerHTML = "No posts";
    }
  } catch (err) {
    alert(err);
  }
}

getPosts();

searchInput.addEventListener("keyup", function () {
  search = this.value;
  activePage = 1;
  getPosts();
});

pagination.addEventListener("click", (e) => {
  let page = e.target.getAttribute("page");
  getPage(page);
});

function getPage(page) {
  if (page === "+") {
    activePage++;
  } else if (page === "-") {
    activePage--;
  } else {
    activePage = +page;
  }
  getPosts();
}
