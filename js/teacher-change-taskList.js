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
        		id
        		subjectName
        		courseName
        	}
        }
      }`;

const subjectCourseQuery = `{
	subjectOnCourses(where:{id: "${id}"}) {
		subjectName
		courseName
	}
}`;
styleLoad(true, false);
let task;
switch(action){
	case "add":
		document.getElementsByClassName("add")[0].classList.toggle("close");
		axios.post(url, {query: subjectCourseQuery})
		.then(response => {
		  let subjCourse = response.data.data.subjectOnCourses[0];
		  loadingSubjStyle(subjCourse.subjectName, subjCourse.courseName, id);	
		});
		break;
	case "edit":
		document.getElementsByClassName("edit")[0].classList.toggle("close");
		axios.post(url, {query: editDeleteQuery})
		.then(response => {
		  task = response.data.data.tasks[0];
		  loadingSubjStyle(task.subjectOnCourse.subjectName, task.subjectOnCourse.courseName, task.subjectOnCourse.id);
		  let compDate = new Date (task.completionDate);
		  document.getElementById("dateElEdit").value = compDate.getFullYear() + "-" + checkMonthDay(compDate.getMonth()+1)+"-" + checkMonthDay(compDate.getDate());
		  document.getElementById("taskElEdit").value = task.task;
		});
		break;
	case "delete": {
		document.getElementsByClassName("delete")[0].classList.toggle("close");
		axios.post(url, {query: editDeleteQuery})
		.then(response => {
		  task = response.data.data.tasks[0];
		  loadingSubjStyle(task.subjectOnCourse.subjectName, task.subjectOnCourse.courseName, task.subjectOnCourse.id);
		  let compDate = new Date (task.completionDate);
		  document.getElementById("dateElDelete").textContent = compDate.getFullYear() + "-" + checkMonthDay(compDate.getMonth()+1)+"-" + checkMonthDay(compDate.getDate());
		  document.getElementById("taskElDelete").textContent = task.task;
		});
	}
}
function loadingSubjStyle(subject, course, idSubj){
	document.getElementsByTagName("title")[0].textContent += " " + subject + " на " + course + " курсе";
	document.getElementById("subject").textContent = subject;
	document.getElementById("subject-course").href += `?id=${idSubj}`;
	document.getElementById("course").textContent += course;
}
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
let deleteSub = document.getElementById("deleteSub");
deleteSub.onclick = function (){
	const deleteQuery = `
		mutation {
  			deleteTask(where:{id:"${id}"}){
   				task
  			}
		}`;
	axios.post(url, {query: deleteManyEntriesQuery});
	axios.post(url, {query: deleteQuery})
		.then(response => {
		  	let deleteTask = response.data.data.deleteTask; 
		  	if (deleteTask) {
		  		alert("Удаление задания произведено успешно!");
		 	}
		});
}