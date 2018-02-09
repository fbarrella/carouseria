var mainCarousel, innerElement, focusElem;

setCarousel();

function setCarousel(){
    if(document.getElementById("carouseria") != null){
        mainCarousel = document.getElementById("carouseria");
        console.log("Container \"" + mainCarousel.id + "\" found!");

        innerElement = mainCarousel.querySelectorAll(".carouseria-item");
        console.log("Located " + innerElement.length + " carousel inner element(s).");

        for(i=0; i<innerElement.length; i++){
            innerElement[i].style.display = "none";
            innerElement[i].style.opacity = 0;
        }

        focusElem = innerElement[0];

        show(focusElem);
    }else{
        console.log("Houve erro na detecção do id \"carouseria\"!");
    }
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