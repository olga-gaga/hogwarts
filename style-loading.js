export function styleLoad(student, studentBool, houseBool) {
	document.body.style.background = "url(" + student.house.backgroundImg.url + ")";
  document.body.style.backgroundSize = "cover";
 	let mainPage = document.getElementById("main-page");
  mainPage.classList.toggle(student.house.houseName);
  let profileName = document.getElementById("profile-name");
  if (profileName.localName === "a") {
    profileName.href += `?st=${student.lastName}`;
  }
  if (studentBool) {
    document.getElementById("profile-name").innerHTML += student.firstName + " " + student.lastName;
  }
  if(houseBool) {
  	document.getElementById("house-name").innerHTML += student.house.houseName;
    let houseName = document.getElementById("house-name");
    houseName.href +=`?st=Potter`;
  }
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

