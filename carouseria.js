var arrayParam, 
    carouseriaHeight, 
    carouseriaLoop, 
    mainCarousel, 
    innerElement, 
    focusElem, 
    maxElem;

setCarousel("240px true");

function setCarousel(divParam){
    console.clear();

    if(document.getElementById("carouseria") != null){
        mainCarousel = document.getElementById("carouseria");
        console.log("O bloco \"" + mainCarousel.id + "\" foi encontrado!");

        carouseriaHeight = divParam.split(" ")[0];
        carouseriaLoop = ("true" == divParam.split(" ")[1]);

        console.log("O parâmetro \"carouseriaHeight\" está configurado com " + carouseriaHeight + ".");
        console.log("O parâmetro \"carouseriaLoop\" está configurado como " + carouseriaLoop + ".");

        mainCarousel.style.height = carouseriaHeight;

        if(mainCarousel.querySelector(".carouseria-item") != null){
            innerElement = mainCarousel.querySelectorAll(".carouseria-item");
            console.log("Localizado(s) " + innerElement.length + " elemento(s) interno(s).");

            for(i=0; i<innerElement.length; i++){
                innerElement[i].style.display = "none";
                innerElement[i].style.opacity = 0;
                innerElement[i].style.position = "relative";
                innerElement[i].style.left = "0px";
                innerElement[i].setAttribute("count", i);
            }

            focusElem = innerElement[0];
            maxElem = innerElement.length-1;

            refreshFocus();
        }else{
            console.log("Não foram detectados itens para exibição.");
        }

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

function refreshFocus(){
    show(focusElem);
}

function changeFocus(elem){
    hide(focusElem);
    focusElem = elem;
    setTimeout(() => refreshFocus(), 300);
}

function next(){
    var nowCount = parseInt(focusElem.getAttribute("count"));

    if(nowCount < maxElem){
        changeFocus(innerElement[nowCount+1]);
    }else{
        if(nowCount == maxElem & carouseriaLoop){
            changeFocus(innerElement[0]);
        }
    }
}

function prev(){
    var nowCount = parseInt(focusElem.getAttribute("count"));

    if(nowCount > 0){
        changeFocus(innerElement[nowCount-1]);
    }else{
        if(nowCount == 0 & carouseriaLoop){
            changeFocus(innerElement[maxElem]);
        }
    }
}

function animar(){
    var pos = 0;
    var id = setInterval(frame, 1);

    function frame(){
        if(pos == 1000){
            clearInterval(id);
        }else{
            innerElement[1].style.left = ++pos + 'px';
        }
    }
}