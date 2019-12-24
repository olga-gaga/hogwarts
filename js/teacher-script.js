import {styleLoad, getDataFromCookie} from './style-loading.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let lastName = getDataFromCookie('lastName'); 
const teacherQuery = `
      {
        teachers (where:{lastName:"${lastName}"}){
          img {
            url
          }
       }
      }`;

let teacher;
styleLoad(true, false);
axios.post(url, {query: teacherQuery})
.then(response => {
    teacher = response.data.data.teachers[0];
    let img = document.getElementById("img").innerHTML += `<img id="profile-photo" src="${teacher.img.url}"/> `;
})	
