export function styleLoad(teacher, teacherBool, houseBool) {
  let profileName = document.getElementById("profile-name");
  if (profileName.localName === "a") {
    profileName.href += `?st=${teacher.lastName}`;
  }
  if (teacherBool) {
    document.getElementById("profile-name").innerHTML += teacher.firstName + " " + teacher.lastName;
    document.getElementById("profile-name").href += `?t=${teacher.lastName}`;
  }
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