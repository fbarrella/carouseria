var mainCarousel = document.getElementById("carouseria");
var innerElement = mainCarousel.querySelectorAll(".carouseria-item");

console.log("Container \"" + mainCarousel.id + "\" found!");
console.log("Located " + innerElement.length + " carousel inner element(s).");

/*
for(i = 0; i<innerElement.length; i++){
    innerElement[i].style.display = "none";
}
*/

alert("Oi");

innerElement[0].style.visibility = "visible";