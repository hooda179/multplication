const result = document.querySelector(".result");
function playSound(fileName){
    var audio = new Audio("../music/" + fileName);
    audio.play();
}
if (!(result.textContent.substring(0,11) === "اجابة صحيحة")){
    if (result.style){
        result.style.color = "red";
        if (result.textContent.substring(0,5) === "اجابة"){
            playSound("wrong.mp3");
        }
    } 
} else {
    if (result.style){
        result.style.color = "green";
            playSound("right.mp3");
    } 
}