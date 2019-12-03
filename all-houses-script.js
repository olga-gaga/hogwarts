//import {toggle} from './style-loading.js';
//import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/*let lastName = getQueryVariable('st'); 
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
*/
const housesQuery = `{
  houses(where:{}) {
    houseName
    color{
      hex
    }
    points
  }
}`;
/*
let student;
axios.post(url, {query: studentQuery})
.then(response => {
    student = response.data.data.students[0];
    console.log(student);
    if (!student) {
      window.location.replace('error404.html');
    }
    styleLoad(student,0, 1);
    //console.log(rating);

});	*/

let openH2 = document.getElementsByClassName("toggleH2")[0];
let form = document.forms[0];
form.onclick = toggleHw;

function toggleHw(e){
  let selectedH2 = e.target.closest("h2");
  if (selectedH2 !== openH2 ) {
    openH2.classList.toggle("toggleH2");
    selectedH2.classList.toggle("toggleH2");
    let attributeOpen= openH2.getAttribute("data-toggle");
    let attributeClose = selectedH2.getAttribute("data-toggle");
    let openDiv = document.getElementsByClassName(attributeOpen)[0];
    openDiv.classList.toggle("close");
    let closeDiv = document.getElementsByClassName(attributeClose)[0];
    closeDiv.classList.toggle("close");
    openH2 = selectedH2;
  }
}

let houses;
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
          legend: {
            display: false
          },
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

