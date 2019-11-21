export function styleLoad(student, studentBool, houseBool) {
	document.body.style.background = "url(" + student.house.backgroundImg.url + ")";
  	document.body.style.backgroundSize = "cover";
 	let mainPage = document.getElementById("main-page");
  	mainPage.classList.toggle(student.house.houseName);
  	let titles = document.getElementById("titles");
  	if (studentBool) {
  		titles.innerHTML += ` <h1 id="profile-name"> <a href="index.html?st=${student.lastName}"> ${student.firstName} ${student.lastName} </a> </h1> `;
  	}
  	if(houseBool) {
  		switch (houseBool) {
  			case 1: 
  				titles.innerHTML += `<h1 id="house-name"><a href="house.html?st=${student.lastName}"> ${student.house.houseName}</a> </h1>`;
  				break;
  			case 2:
  				titles.innerHTML += `<h2 id="house-name"><a href="house.html?st=${student.lastName}"> ${student.house.houseName}</a> </h2>`;
  		}
  	}
}