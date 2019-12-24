import {styleLoad} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';

const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
let houseName = getQueryVariable('h'); 

const housesQuery = `{
  houses(where:{houseName: "${houseName}"}) {
    houseName
    founderName
    element
    animal
    color{
      hex
    }
    backgroundImg{
      url
    }
    founderImg{
      url
    }
  }
}`;

let house;
axios.post(url, {query: housesQuery})
.then(response => {
    house = response.data.data.houses[0];
    document.body.style.background = "url(" + house.backgroundImg.url + ")";
    document.body.style.backgroundSize = "cover";
    let mainPage = document.getElementById("main-page");
    mainPage.classList.toggle(house.houseName);
    document.getElementById("house-name").innerHTML += house.houseName;
    document.getElementById("houseName").innerHTML += house.houseName;
    document.getElementById("img").innerHTML += `<img id="founder-photo" src="${house.founderImg.url}"/> `;
    document.getElementById("houseName").innerHTML = house.houseName;
    document.getElementById("founder").nextElementSibling.innerHTML = house.founderName;
    document.getElementById("element").nextElementSibling.innerHTML = house.element;
    document.getElementById("animal").nextElementSibling.innerHTML = house.animal;
});  
