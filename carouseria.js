var mainCarousel = document.getElementById("carouseria");
var innerElement = mainCarousel.querySelectorAll(".carouseria-item");
var focusElem;

console.log("Container \"" + mainCarousel.id + "\" found!");
console.log("Located " + innerElement.length + " carousel inner element(s).");

setCarousel();

function setCarousel(){
    for(i=0; i<innerElement.length; i++){
        innerElement[i].style.display = "none";
        innerElement[i].style.opacity = 0;
    }

    focusElem = innerElement[0];
    show(focusElem);
}

function show(elem){
    try{
        fadeIn(elem);
    }catch(err){
        console.log("Erro detectado: " + err);
    }
    setTimeout(function(){ elem.style.display = "block"; }, 10);
}

function hide(elem){
    try{
        fadeOut(elem);
    }catch(err){
        console.log("Erro detectado: " + err);
    }
    setTimeout(function(){ elem.style.display = "none"; }, 300);
}

function fadeIn(elem){
    elem.style.opacity = parseFloat(elem.style.opacity) + 0.1;
    if(elem.style.opacity > 1.0){
        elem.style.opacity = 1.0;
    }else{
        setTimeout(() => fadeIn(elem), 10);
    }
}

function fadeOut(elem){
    elem.style.opacity = parseFloat(elem.style.opacity) - 0.1;
    if(elem.style.opacity < 0.0){
        elem.style.opacity = 0.0;
    }else{
        setTimeout(() => fadeOut(elem), 10);
    }
}