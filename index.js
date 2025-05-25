const btn1 = document.querySelectorAll(".btn1");

btn1.forEach(element => {
    element.addEventListener("hover", event => showPin(event.target.getBoundingClientRect()));
});

function showPin(btnPos){
    
}