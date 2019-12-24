let arrCookie = [];
for (let item of document.cookie.split("; ")) {
    arrCookie[item.split("=")[0]] = item.split("=")[1];
}

export function styleLoad(nameBool, houseBool) {
  let mainPage = document.getElementById("main-page");
  let profileName = document.getElementById("profile-name");
  if(arrCookie["position"] === "student") {
      mainPage.classList.toggle(arrCookie["house"]);
      if (profileName.localName === "a") {
        profileName.href += `?st=${arrCookie["lastName"]}`;
      }
      if (nameBool) {
        document.getElementById("profile-name").innerHTML += arrCookie["firstName"] + " " + arrCookie["lastName"];
      }
      if(houseBool) {
        let house = document.getElementById("house-name");
        house.innerHTML += arrCookie["house"];
        house.href += `?h=${arrCookie["house"]}`;
      }
  }
  else {
      if (profileName.localName === "a") {
        profileName.href += `?t=${arrCookie["lastName"]}`;
      }
      if (nameBool) {
        document.getElementById("profile-name").innerHTML += arrCookie["firstName"] + " " + arrCookie["lastName"];
      }
  }
  document.getElementsByTagName("title")[0].textContent = document.getElementById("profile-name").textContent + " - " + document.getElementById("position").textContent;
}

export function getDataFromCookie(data){
  return arrCookie[data];
}

export function checkCompDate(date) {
  let compDate = new Date(date);
  let day = compDate.getDate();
  let month = compDate.getMonth()+1;
  let strCompDate = "";
  if (day < 10) {
    strCompDate += "0";
  }
  strCompDate += day +".";
  if (month < 10){
    strCompDate += "0";
  }
  strCompDate += month;
  return strCompDate;
}

export function checkMonthDay(date) {
  if (date < 10) {
    return "0" + date;
  }
  return date;
}


export function sortingArrByDate(array) {
  array.sort(
      function (a, b) {
        let compDateA = new Date(a.task.completionDate);
        let compDateB = new Date(b.task.completionDate);
        let time = 1000 * 3600 * 24;
        return Math.ceil((compDateA.getTime() - Date.now()) / time) - Math.ceil((compDateB.getTime() - Date.now()) / time);;
    });
}

export function createTable (id, array) {
  let tbody = document.getElementById(id);
     for (let i = 0; i < array.length ; i += 2) {
            if( i + 1 === array.length) {
              tbody.innerHTML +=`<tr>
            <td class="img"><img src="${array[i].img.url}"/> </td>
            <td class="name"> ${array[i].firstName} ${array[i].lastName}</td>`;
            }
            else {
              tbody.innerHTML +=`<tr>
            <td class="img"><img src="${array[i].img.url}"/> </td>
            <td class="name"> ${array[i].firstName} ${array[i].lastName}</td>
            <td class="img"><img src="${array[i+1].img.url}"/> </td>
            <td class="name"> ${array[i+1].firstName} ${array[i+1].lastName}</td> 
            </tr>`;
          }            
    }
}

export function toggleH2(e, openElement){
  let selectedEl = e.target.closest("h2");
  if (selectedEl !== openElement ) {
    openElement.classList.toggle("toggleH2");
    selectedEl.classList.toggle("toggleH2");
    let attributeOpen= openElement.getAttribute("data-toggle");
    let attributeClose = selectedEl.getAttribute("data-toggle");
    let openDiv = document.getElementsByClassName(attributeOpen)[0];
    openDiv.classList.toggle("close");
    let closeDiv = document.getElementsByClassName(attributeClose)[0];
    closeDiv.classList.toggle("close");
    openElement = selectedEl;
  }
  return openElement;
}
