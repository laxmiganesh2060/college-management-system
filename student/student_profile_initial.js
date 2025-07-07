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
const profile = document.getElementById("username") ?? 'img.jpg';

const avatar = document.getElementById('avatar');

const buffer = new Image();
buffer.src = profile;
buffer.onload = () => avatar.src = buffer.src;

nameField.textContent = `${firstName} ${lastName}`;