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
    
    fetch("https://252b067c3e5a40028a67e42a6cb116c9.vfs.cloud9.us-east-2.amazonaws.com/weather?address=" + location).then(response => {
        response.json().then(data => {
            if(data.error){
                return paragraph.textContent = data.error;
            }
            paragraph.textContent = data.forecast.summary;
            console.log(data);
        });
    });
});