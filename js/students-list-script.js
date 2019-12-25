import {createTable, toggleH2} from './style-loading.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
const studentsQuery = `
      {
        students (where:{}){
          firstName
          lastName
          house{
            houseName
          }
          img {
            url
          }
        }
      }`;

let openH2 = document.getElementsByClassName("toggleH2")[0];
let form = document.forms[0];
form.onclick = (e => openH2 = toggleH2(e, openH2));

let houses= {
  'Gryffindor': [],
  'Ravenclaw': [],
  'Slytherin': [],
  'Hufflepuff': [],
}
let students = [];
axios.post(url, {query: studentsQuery})
.then(response => {
    students = response.data.data.students;
    for(let item of students) {
        houses[item.house.houseName].push(item);
    }
    createTable("gryffindor-st", houses['Gryffindor']);
    createTable("ravenclaw-st", houses['Ravenclaw']);
    createTable("slytherin-st", houses['Slytherin']);
    createTable("hufflepuff-st", houses['Hufflepuff']);
});


