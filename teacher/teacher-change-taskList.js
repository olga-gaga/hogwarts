import {getQueryVariable} from './teacher-queryVarieble.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

document.forms[0].onsubmit = function(e) {
	e.preventDefault();
}
let information = getQueryVariable('a'); 
let informArr = information.split("+");
let action = informArr[0];
const editDeleteQuery = `
      {
        tasks (where:{id: "${informArr[1]}"}){
        	completionDate
        	task
        }
      }`;
let dateEl = document.getElementById("date");
let taskEl = document.getElementById("task");
switch(action){
	case "add":

		break;
	case "edit":
		axios.post(url, {query: subjectOnCourseQuery})
		.then(response => {
		  document.getElementByClass("edit")[0].classList.toggle("close");
		  task = response.data.data.tasks[0];
		  document.getElementByTagName("title").innerHTML = "Edit task";
		  dateEl.innerHTML = task.completionDate;
		  taskEl.innerHTML = task.task;
		  document.getElementById("submit").value="Edit";
		});
		break;
	case "delete": {

	}
}