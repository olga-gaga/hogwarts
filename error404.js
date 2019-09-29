const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
function getQueryVariable(variable) 
{
   let query = window.location.search.substring(1);
   let vars = query.split("&");
   for (let i=0;i<vars.length;i++) {
       let pair = vars[i].split("=");
       if(pair[0] === variable){return pair[1];}
   }
   return(false);
}

let lastName = getQueryVariable('st'); 
const studentQuery = `
      {
        students (where:{}){
          firstName
          lastName       }
      }`;
let students=[];
axios.post(url, {query: studentQuery})
.then(response => {
    students = response.data.data.students;
    console.log(students);
    let studentsList = document.getElementById("students-list");
    for (let student of students) {
      studentsList.innerHTML += `<li> <a href="index.html?st=${student.lastName}"> ${student.firstName} ${student.lastName} </a> </li>`
    }

})	


