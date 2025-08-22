const baseUrl = "http://127.0.0.1:3000";

function getCookieValue(cookieName) {
    const res = document.cookie.split(";").filter((value, ind, arr) => {
        if (value.match(cookieName)) return true;
        else return false;
    });

    if (res.length == 0) {
        return "";
    } else {
        console.log(res);
        var token = res.pop();
        token = token.replace(`${cookieName}=`, "");
        return token;
    }
}

const firstName = getCookieValue('firstName');
const lastName = getCookieValue('lastName');
const image = getCookieValue('image');
const nameField = document.getElementById("username");

const avatar = document.getElementById('avatar');

console.log(firstName, lastName, image);

const buffer = new Image();
buffer.src = image ?? 'img1.jpg';
buffer.onload = () => avatar.src = buffer.src;

nameField.textContent = `${firstName} ${lastName}`;

async function getData() {
  try {
    const response = await fetch(`${baseUrl}/api/notices?targetAudience=STUDENTS`);
    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }
    const json = await response.json();

    console.log(json.data);

    if (json.status === "success") {
      const notices = json.data;
      const container = document.getElementById("notices-container");

      // Clear container first
      container.innerHTML = "";

      // Loop through each notice and create HTML
      notices.forEach((notice) => {
        const noticeDiv = document.createElement("div");
        noticeDiv.classList.add("notice");

        noticeDiv.innerHTML = `
        
        <h2>${notice.title}</h2>
        <p>${notice.content}</p>
        ${
          notice.attachments
            ? `<img src="${
                baseUrl + "/" + notice.attachments
              }" width="100%" crossorigin="anonymous">`
            : ""
        }
        <hr>
        `;

        container.appendChild(noticeDiv);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData();

