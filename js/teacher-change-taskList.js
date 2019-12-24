import {getQueryVariable} from './queryVarieble.js';
import {styleLoad, checkMonthDay} from './style-loading.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

document.forms[0].onsubmit = function(e) {
	e.preventDefault();
}
let action = getQueryVariable('a');
let id = getQueryVariable('id');

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

const subjectCourseQuery = `{
	subjectOnCourses(where:{${id}}) {
		subjectName
		courseName
	}
}`;
styleLoad(true, false);
let addSub = document.getElementById("addSub");
addSub.onclick = function (){
	let newDate = document.querySelector(".add .date").value;
	let newTask = document.querySelector(".add .task").value; 
	const addQuery = `
		mutation createTask{
	 		createTask(
		    	data:{
		    		completionDate:"${newDate}"
		    		task:"${newTask}"
        			subjectOnCourse:{connect:{id: "${id}"}}
	    	}) 
	    	{
		    	id
	  		}
		}`

	axios.post(url, {query: addQuery})
		.then(response => {
			let addTask = response.data.data.createTask;
			if (addTask) {
				alert("Задание успешно добавлено!");
			}
		})
}
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
		  		alert("Изменение задания произведено успешно!");
		 	}
	
		});

}

let task;
switch(action){
	case "add":
		document.getElementsByClassName("add")[0].classList.toggle("close");
		axios.post(url, {query: subjectCourseQuery})
		.then(response => {
		  subjCourse = response.data.data.subjectOnCourses[0];
		  title += " - " +subjCourse.subjectName + " на " +subjCourse.courseName + " курсе";	
		});
		break;
	case "edit":
		document.getElementsByClassName("edit")[0].classList.toggle("close");
		axios.post(url, {query: editDeleteQuery})
		.then(response => {
		  task = response.data.data.tasks[0];
		  document.getElementsByTagName("title")[0].innerHTML += " " +task.subjectOnCourse.subjectName + " на " + task.subjectOnCourse.courseName + " курсе";
		  document.getElementById("subject").innerHTML = task.subjectOnCourse.subjectName +  " на " + task.subjectOnCourse.courseName + " курсе";
		  let compDate = new Date (task.completionDate);
		  document.getElementById("dateElEdit").value = compDate.getFullYear() + "-" + checkMonthDay(compDate.getMonth()+1)+"-" + checkMonthDay(compDate.getDate());
		  document.getElementById("taskElEdit").value = task.task;
		});
		break;
	case "delete": {

	}
}

