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

export function toggle(e, element){
  let selectedH2 = e.target.closest("element");
  if (selectedH2 !== element ) {
    element.classList.toggle("toggleH2");
    selectedH2.classList.toggle("toggleH2");
    let attributeOpen= element.getAttribute("data-toggle");
    let attributeClose = selectedH2.getAttribute("data-toggle");
    let openDiv = document.getElementsByClassName(attributeOpen)[0];
    openDiv.classList.toggle("close");
    let closeDiv = document.getElementsByClassName(attributeClose)[0];
    closeDiv.classList.toggle("close");
    element = selectedH2;
  }
}