const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
const artyom = new Artyom();
artyom.initialize({
    continuous:true,
    lang:"ru-RU",
    obeyKeyword: "алохомора",
    listen:true,
    debug:true
});
document.forms[0].onsubmit = function(e) {
	e.preventDefault();
}
let body = document.body;
let alohomora = document.getElementById("alohomora");
alohomora.onclick = doAlohomora;
function doAlohomora() {
  document.getElementById("keepOut").innerHTML = "Добро пожаловать в школу чародейства и волшебства \"Hogwarts\""
  body.classList.remove("muggle");
  alohomora.classList.add("close");
  body.getElementsByClassName("signIn")[0].classList.remove("close");
}
let commandHello = {
    indexes:["Аллаха море", "аллах отбора", "аллаха мора", "аллаха мара", "алаха мара", "алохомора", "алахамора", "алахамара"], 
    action: doAlohomora,
};
function logInCookie (wizard, wizardObj){
    document.cookie = encodeURIComponent('position') + '=' + encodeURIComponent(wizard);
    document.cookie = encodeURIComponent('firstName') + '=' + encodeURIComponent(wizardObj.firstName);
    document.cookie = encodeURIComponent('lastName') + '=' + encodeURIComponent(wizardObj.lastName);
    if (wizard == "student"){
      document.cookie = encodeURIComponent('house') + '=' + encodeURIComponent(wizardObj.house.houseName);
      window.location.replace(`${wizard}.html?st=${wizardObj.lastName}`);
    }
    else {
      window.location.replace(`${wizard}.html?t=${wizardObj.lastName}`);
    }    
}
let form = document.forms[0];
form.onsubmit = logIn;
let names;
function logIn(e) {
    e.preventDefault();
    let studentBool = form.elements[0].checked;
    let password = form.elements[3].value;
    let name = form.elements[2].value;
    names = name.split(" ");
    if (studentBool) {
      let studentQuery = `
        {
          students (where:{lastName:"${names[1]}", firstName: "${names[0]}"}){
            firstName
            lastName
            img {
              url
            }         
            house {
              houseName
              backgroundImg{
                url
              }
            }
         }
        }`;
    let student;
    axios.post(url, {query: studentQuery})
    .then(response => {
        student = response.data.data.students[0];
        if(!student) {
          document.getElementById("error").classList.remove("close");
        }
        else{
          logInCookie("student", student)
        }   
    })
    } 
    else {
      let teacherQuery = `
        {
          teachers (where:{lastName:"${names[1]}", firstName: "${names[0]}"}){
            firstName
            lastName
          }         
        }`;
    let teacher;
    axios.post(url, {query: teacherQuery})
    .then(response => {
        teacher = response.data.data.teachers[0];
        if(!teacher) {
          document.getElementById("error").classList.remove("close");
        }
        else{
          logInCookie("teacher", teacher)
        }   
    })
    }
    
}
artyom.addCommands(commandHello); 