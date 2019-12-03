/*let body = document.body;

//if (annyang) {
	let commands = { 
	"Привет": openLogin
	}; 
	function openLogin(){
		body.classList.toggle("muggle");
		body.getElementsByClassName("signIn").classList.toggle("close");
	}
	 
	annyang.addCommands(commands);
	annyang.setLanguage('ru'); // Устанавливаем русский язык 
	annyang.start();
//

*/
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
    indexes:["Аллаха море", "Алоха", "ало ало", "море", "ало", "аллах", "аллах отбора", "аллаха мора", "аллаха мара", "алаха мара"], // These spoken words will trigger the execution of the command
    action:function(){ // Action to be executed when a index match with spoken word
        document.getElementById("keepOut").innerHTML = "Добро пожаловать в школу чародейства и волшебства \"Hogwarts\""
		body.classList.toggle("muggle");
		body.getElementsByClassName("signIn")[0].classList.toggle("close");
    }
};

let form = document.forms[0];
form.onsubmit = logIn;

function logIn() {
	let password = form.elements[1];
	let name = form.elements[1];
	if(1 !== 1){
		document.getElementsById("error").toggle("close");
	}

}


artyom.addCommands(commandHello); // Add the command with addCommands method. Now

