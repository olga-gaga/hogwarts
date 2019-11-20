import {styleLoad} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const canvas = document.getElementById("TheHouseCup");
const ctx = canvas.getContext("2d");
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
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
    styleLoad(student,0, 1);
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

