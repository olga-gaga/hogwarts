import {styleLoad} from './teacher-style-loading.js';
import {getQueryVariable} from './teacher-queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let lastName = getQueryVariable('t'); 
const teacherQuery = `
      {
        teachers (where:{lastName:"${lastName}"}){
          firstName
          lastName
          img {
            url
          }
       }
      }`;

let teacher;
axios.post(url, {query: teacherQuery})
.then(response => {
    teacher = response.data.data.teachers[0];
    console.log(teacher);
    if (!teacher) {
      window.location.replace('error404.html');
    }
    let profileName = document.getElementById("profile-name");
    profileName.innerHTML += teacher.firstName+ " " + teacher.lastName;
    document.getElementsByTagName("title")[0].textContent = profileName.textContent + " - " + document.getElementById("position").textContent;
    let img = document.getElementById("img").innerHTML += `<img id="profile-photo" src="${teacher.img.url}"/> `;
    let a = document.getElementsByClassName("sections");
    for (let item of a) {
        item.href += `?t=${lastName}`;
    }
})	
