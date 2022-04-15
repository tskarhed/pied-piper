const inputElement = document.querySelector("#note-input");
const songElement = document.querySelector("#song");

inputElement.addEventListener("input", function(event) {
    songElement.innerHTML = noteStringToHTML(event.target.value);
})