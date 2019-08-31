/* 
fetch("https://puzzle.mead.io/puzzle").then(response => {
    response.json().then(data => {
        console.log(data);
    });
}); */

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const paragraph = document.querySelector("#message");

paragraph.textContent = "";

weatherForm.addEventListener("submit", e => {
    e.preventDefault();
    
    paragraph.textContent = "Loading...";
    
    const location = search.value;
    
    fetch("/weather?address=" + location).then(response => {
        response.json().then(data => {
            if(data.error){
                return paragraph.textContent = data.error;
            }
            paragraph.textContent = data.forecast.summary;
            console.log(data);
        });
    });
});