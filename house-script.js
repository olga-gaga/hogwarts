import {styleLoad} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const canvas = document.getElementById("TheHouseCup");
const ctx = canvas.getContext("2d");
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

let rating = [];
let color = [];
let houseNames = [];
function getQueryVariable(variable) 
{
   let query = window.location.search.substring(1);
   let vars = query.split("&");
   for (let i=0;i<vars.length;i++) {
       let pair = vars[i].split("=");
       if(pair[0] === variable){return pair[1];}
   }
   return(false);
}

function styleLoad(student, house) {
    document.body.style.background = "url(" + student.house.backgroundImg.url + ")";
    document.body.style.backgroundSize = "cover";
    let mainPage = document.getElementById("main-page");
    mainPage.classList.toggle("Gryffindor");
    let titles = document.getElementById("titles");
    //titles.innerHTML += ` <h1 id="profile-name"> <a href="index.html?st="${student.lastName}"> ${student.firstName} ${student.lastName} </a> </h1> `;
    if (house) {
      titles.innerHTML += `<h1 id="house-name"> ${student.house.houseName}</h2>`;
    }
}

let lastName = getQueryVariable('st'); 
const studentQuery = `
    {
         students (where:{lastName:"${lastName}"}){
          firstName
          lastName
          house {
            houseName
            backgroundImg {
              url
            }
          }
          img {
            url
          }
       }
    }`;

const housesQuery = `{
  houses(where:{}) {
    houseName
    color{
      hex
    }
    points
  }
}`;

let student;
let houses;
axios.post(url, {query: studentQuery})
.then(response => {
    student = response.data.data.students[0];
    console.log(student);
    if (!student) {
      window.location.replace('error404.html');
    }
    styleLoad(student, 1);
    console.log(rating);

});	

axios.post(url, {query: housesQuery})
.then(response => {
    houses = response.data.data.houses;
    let housesResult = {
      names:[],
      color: [],
      rating:[],
    };

    for (let item of houses) {
      housesResult.rating.push(item.points);
      housesResult.color.push(item.color.hex);
      housesResult.names.push(item.houseName);
     }

    const chartHouseCup = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: housesResult.names,
          datasets: [{
              data: housesResult.rating,
              backgroundColor: housesResult.color,
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });

});  

