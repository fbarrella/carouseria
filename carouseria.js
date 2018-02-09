var mainCarousel = document.getElementById("carouseria");
var innerElement = mainCarousel.querySelectorAll(".carouseria-item");

console.log("Container \"" + mainCarousel.id + "\" found!");
console.log("Located " + innerElement.length + " carousel inner element(s).");

for(i = 0; i<innerElement.length; i++){
    innerElement[i].style.display = "none";
    innerElement[i].style.opacity = 0;
}

function show(num){
    var focus = innerElement[num-1];

    try{
        fadeIn(num);
    }catch(err){
        console.log("Erro detectado: " + err);
    }
    setTimeout(function(){ focus.style.display = "block"; }, 10);
}

function hide(num){
    var focus = innerElement[num-1];

    try{
        fadeOut(num);
    }catch(err){
        console.log("Erro detectado: " + err);
    }
    setTimeout(function(){ focus.style.display = "none"; }, 300);
}

function fadeIn(num){
    var focus = innerElement[num-1];

    focus.style.opacity = parseFloat(focus.style.opacity) + 0.1;
    if(focus.style.opacity > 1.0){
        focus.style.opacity = 1.0;
    }else{
        setTimeout("fadeIn(" + num + ")", parseFloat(focus.style.opacity));
    }
}

function fadeOut(num){
    var focus = innerElement[num-1];

    focus.style.opacity = parseFloat(focus.style.opacity) - 0.1;
    if(focus.style.opacity < 0.0){
        focus.style.opacity = 0.0;
    }else{
        setTimeout("fadeOut(" + num + ")", parseFloat(focus.style.opacity));
    }
}