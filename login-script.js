const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';

const artyom = new Artyom();

artyom.initialize({
    continuous:true,
    lang:"ru-RU",
    obeyKeyword: "аллаха мора",
    listen:true,
    debug:true
});
document.forms[0].onsubmit = function(e) {
	e.preventDefault();
}
let body = document.body;

let commandHello = {
    indexes:["Аллаха море", "Алоха", "ало ало", "море", "ало", "аллах", "аллах отбора", "аллаха мора", "аллаха мара", "алаха мара", "алохомора", "алахамора", "алахамара"], 
    action:function(){ 
        document.getElementById("keepOut").innerHTML = "Добро пожаловать в школу чародейства и волшебства \"Hogwarts\""
		body.classList.toggle("muggle");
		body.getElementsByClassName("signIn")[0].classList.toggle("close");
    }
};

document.getElementById("alohomora").onclick = function() {
	document.getElementById("keepOut").innerHTML = "Добро пожаловать в школу чародейства и волшебства \"Hogwarts\""
	body.classList.toggle("muggle");
	body.getElementsByClassName("signIn")[0].classList.toggle("close");
}

let studentQuery = `
      {
        students (where:{}){
          firstName
          lastName         
          house {
            houseName
          }
       }
      }`;

let form = document.forms[0];
form.onsubmit = logIn;
let names;
function logIn() {
  let password = form.elements[1].value;
  let name = form.elements[0].value;
  names = name.split(" ");
  if (students.indexOf(names[0]) > -1) {
    document.cookie = encodeURIComponent(firstName) + '=' + encodeURIComponent(student.firstName);
      document.cookie = encodeURIComponent(lastName) + '=' + encodeURIComponent(student.lastName);
      document.cookie = encodeURIComponent(house) + '=' + encodeURIComponent(student.house.houseName);
      window.location.replace(`student.html/st=${student.lastName}`);
  }  
}
/*
let students;
axios.post(url, {query: studentQuery})
.then(response => {
  students = response.data.data.students[0];
  console.log(response.data);
  
})*/

let students;
axios.post(url, {query: studentQuery})
.then(response => {
  students = response.data.data.students;
  console.log(response.data);
  
})

artyom.addCommands(commandHello); 