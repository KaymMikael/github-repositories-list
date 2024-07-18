import { formatDate } from "./utils/date.js";

const URL = "https://api.github.com/users/KaymMikael/repos?sort=created";

async function loadData() {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error("An error occurred while fetching the data");
  }
}

function tableRowItem(repo) {
  return `<tr>
              <td>${repo.name}</td>
              <td>
                <a
                  href="${repo.html_url}"
                  target="_blank"
                  >${repo.html_url}</a
                >
              </td>
              <td>${formatDate(repo.created_at)}</td>
              <td>${repo.language}</td>
            </tr>`;
}

function renderRepositories(arr) {
  const tableBody = document.querySelector(".table-body");
  if (!tableBody) {
    console.error("Table body element not found");
    return;
  }

  let tableRowHTML = "";

  arr.forEach((repo) => {
    if (repo.language) {
      tableRowHTML += tableRowItem(repo);
    }
  });

  tableBody.innerHTML = tableRowHTML;
}

loadData()
  .then((data) => {
    renderRepositories(data);
  })
  .catch((e) => {
    console.error(e.message);
    alert(e.message); // Optionally alert the user
  });
