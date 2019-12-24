console.log("!!!");
let myProfile = document.getElementById("my-profile");
let arrCookie = [];
for (let item of document.cookie.split("; ")) {
    arrCookie[item.split("=")[0]] = item.split("=")[1];
}
if(arrCookie["position"] === "student"){
  myProfile.href = `${arrCookie["position"]}.html?st=${arrCookie["lastName"]}`;
}
else {
  myProfile.href = `${arrCookie["position"]}.html?t=${arrCookie["lastName"]}`;
}
