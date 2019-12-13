import {getQueryVariable} from './teacher-queryVarieble.js';
import {styleLoad} from './teacher-style-loading.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

document.forms[0].onsubmit = function(e) {
	e.preventDefault();
}
let action = getQueryVariable('a');
let id = getQueryVariable('id');
let lastName = getQueryVariable('t'); 
const teacherQuery = `
      {
        teachers (where:{lastName: "${lastName}"}){
          firstName
          lastName
          subjectOnCourses{
            id
            subjectName
            courseName
          }
       }
      }`;

const editDeleteQuery = `
      {
        tasks (where:{id: "${id}"}){
        	id
        	completionDate
        	task
        	subjectOnCourse {
        		subjectName
        		courseName
        	}
        }
      }`;

let teacher;
let title=document.getElementsByTagName("title")[0];
axios.post(url, {query: teacherQuery})
.then(response => {
  teacher = response.data.data.teachers[0];
  styleLoad(teacher, 1, 1);
  title.innerHTML = teacher.firstName + " "+ teacher.lastName;
});


let editSub = document.getElementById("editSub");
editSub.onclick = function (){
	let newDate = document.querySelector(".edit .date").value;
	let newTask = document.querySelector(".edit .task").value;
	const updateQuery = `
		mutation updateTask{
	 		updateTask(where: {id:"${id}"},
	    		data:{
	    	completionDate:"${newDate}"
	    	task:"${newTask}"
	    }) 
	    {
		    id
		    task
		    completionDate
	  }
	}`;
	axios.post(url, {query: updateQuery})
		.then(response => {
		  	let updateTask = response.data.data.updateTask; 
		  	if (updateTask) {
		  		alert("Изменение данных произведено успешно!");
		 	}
	
		});

}
let task;
switch(action){
	case "add":

		break;
	case "edit":
		axios.post(url, {query: editDeleteQuery})
		.then(response => {
		  document.getElementsByClassName("edit")[0].classList.toggle("close");
		  task = response.data.data.tasks[0];
		  console.log(task);
		  title += " " +task.subjectOnCourse.subjectName + +  " на " + task.subjectOnCourse.courseName + " курсе";
		  document.getElementById("subject").innerHTML = task.subjectOnCourse.subjectName +  " на " + task.subjectOnCourse.courseName + " курсе";
		  document.getElementsByTagName("title").innerHTML = "Edit task";
		  let compDate = new Date (task.completionDate);
		  document.getElementById("dateElEdit").value = compDate.getFullYear() + "-" + (compDate.getMonth()+1)+"-" + compDate.getDate();;
		  document.getElementById("taskElEdit").value = task.task;
	
		});
		break;
	case "delete": {

	}
}

//document.getElementById("dateElEdit").onchange = (value => console.log(value));

/*
mutation createTask{
	 		createTask(
	    	data:{
	    	completionDate:"25-12-2019"
	    	task:"2 свитка о Дыбоволосом зелье"
        subjectOnCourse:{connect:{id:"ck0rozwnua4os0b0454jbxqim"
}}
        
	    }) 
	    {
		    id
		    task
		    completionDate
	  }
}*/