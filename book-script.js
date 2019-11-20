import {styleLoad} from './style-loading.js';
import {getQueryVariable} from './queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
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
    styleLoad(student, 1, 2);    
    let tbody = document.getElementById("add-books");
   for (let subjOnCourse of student.subjectOnCourses) {
     for(let i = 0; i < subjOnCourse.courseBooks.length; i++){
        let itemBook = subjOnCourse.courseBooks[i];        
        if (i === 0) { 
          tbody.innerHTML +=`<tr><td rowspan="${subjOnCourse.courseBooks.length}"> ${subjOnCourse.subject.subjectName} </td>
<td> ${itemBook.title} </td><td> ${itemBook.author} </td> </tr>`;
        } 
        else {
          tbody.innerHTML +=`<tr><td> ${itemBook.title} </td><td> ${itemBook.author} </td> </tr>`;
        }
    }
  }
})  

