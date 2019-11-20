export function styleLoad(student, house) {
	document.body.style.background = "url(" + student.house.backgroundImg.url + ")";
  	document.body.style.backgroundSize = "cover";
 	let mainPage = document.getElementById("main-page");
  	mainPage.classList.toggle(student.house.houseName);
  	let titles = document.getElementById("titles");
  	titles.innerHTML += ` <h1 id="profile-name"> <a href="index.html?st=${student.lastName}> ${student.firstName} ${student.lastName} </a> </h1> `;
  	if (house) {
  	 	titles.innerHTML += `<h2 id="house-name"> ${student.house.houseName}</h2>`;
  	}
}