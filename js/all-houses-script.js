import {toggleH2} from './style-loading.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const housesQuery = `{
  houses(where:{}) {
    houseName
    color{
      hex
    }
    points
  }
}`;
let openH2 = document.getElementsByClassName("toggleH2")[0];
let form = document.forms[0];
form.onclick = (e => openH2 = toggleH2(e, openH2));

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

