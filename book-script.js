import {styleLoad} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
/*function getQueryVariable(variable) 
{
   let query = window.location.search.substring(1);
   let vars = query.split("&");
   for (let i=0;i<vars.length;i++) {
       let pair = vars[i].split("=");
       if(pair[0] === variable){return pair[1];}
   }
   return(false);
}*/

let lastName = getQueryVariable('st'); 
const studentQuery = `
      {
        students (where:{lastName:"${lastName}"}){
          firstName
          lastName
          subjectOnCourses {
            tasks{
                completionDate
              }
            subject{
              subjectName
            }
            courseBooks{
                title
                author
            }
          }
          house {
            houseName
            backgroundImg {
              url
            }
          }
       }
      }`;
let student;
axios.post(url, {query: studentQuery})
.then(response => {
    student = response.data.data.students[0];
    console.log(student);
    styleLoad(student, 0)
   /* document.body.style.background = "url(" + student.house.backgroundImg.url + ")";
    document.body.style.backgroundSize = "cover";
    let mainPage = document.getElementById("main-page");
    mainPage.classList.toggle(student.house.houseName);

    let titles = document.getElementById("titles");
   
    titles.innerHTML += ` <h1 id="profile-name"> ${student.firstName} ${student.lastName} </h1> `;
    */
    let tbody = document.getElementById("add-books");
   for (let subjOnCourse of student.subjectOnCourses) {
     for(let i = 0; i < subjOnCourse.courseBooks.length; i++){
      let itemBook = subjOnCourse.courseBooks[i];
        
        if (i === 0) { tbody.innerHTML +=`<tr><td rowspan="${subjOnCourse.courseBooks.length}"> ${subjOnCourse.subject.subjectName} </td>
<td> ${itemBook.title} </td><td> ${itemBook.author} </td> </tr>`} 
else {tbody.innerHTML +=`<tr><td> ${itemBook.title} </td><td> ${itemBook.author} </td> </tr>`}
      }
    }

   /*for (let subjOnCourse of student.course.subjectOnCourses) {
     for(let itemBook of subjOnCourse.courseBooks){
         tbody.innerHTML += `<tr> <td> ${subjOnCourse.subject.subjectName} </td> 
          <td> ${itemBook.title} </td>
          <td> ${itemBook.author} </td>

          </tr>`
      }
    }*/

})  

