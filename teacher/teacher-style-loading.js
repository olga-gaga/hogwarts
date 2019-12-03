export function styleLoad(teacher, studentBool, houseBool) {
	
  //mainPage.classList.toggle(student.house.houseName);
  let profileName = document.getElementById("profile-name");
  if (studentBool) {
    document.getElementById("profile-name").innerHTML += teacher.firstName + " " + teacher.lastName;
  }
  /*if(houseBool) {
  	document.getElementById("house-name").innerHTML += teacher.house.houseName;
  }*/
}