var arrayParam, 
    carouseriaHeight, 
    carouseriaLoop,
    carouseriaDirection,
    mainCarousel, 
    innerElement, 
    focusElem, 
    maxElem;

setCarousel("240px true vertical");

function setCarousel(divParam){
    console.clear();

    if(document.getElementById("carouseria") != null){
        mainCarousel = document.getElementById("carouseria");
        console.log("O bloco \"" + mainCarousel.id + "\" foi encontrado!");

        carouseriaHeight = divParam.split(" ")[0];
        carouseriaLoop = ("true" == divParam.split(" ")[1]);
        carouseriaDirection = divParam.split(" ")[2];

        console.log("O parâmetro \"carouseriaHeight\" está configurado com " + carouseriaHeight + ".");
        console.log("O parâmetro \"carouseriaLoop\" está configurado como " + carouseriaLoop + ".");
        console.log("O parâmetro \"carouseriaDirection\" está configurado como " + carouseriaDirection + ".");

        mainCarousel.style.height = carouseriaHeight;

        if(mainCarousel.querySelector(".carouseria-item") != null){
            innerElement = mainCarousel.querySelectorAll(".carouseria-item");
            console.log("Localizado(s) " + innerElement.length + " elemento(s) interno(s).");

            for(i=0; i<innerElement.length; i++){
                innerElement[i].style.display = "none";
                innerElement[i].style.opacity = 0;
                innerElement[i].style.position = "relative";
                innerElement[i].style.left = "0px";
                innerElement[i].style.top = "0px";
                innerElement[i].setAttribute("count", i);
            }

            focusElem = innerElement[0];
            maxElem = innerElement.length-1;

            refreshFocus(false);
        }else{
            console.log("Não foram detectados itens para exibição.");
        }

    }else{
        console.log("Houve erro na detecção do id \"carouseria\"!");
    }
}

function show(elem, reverse){
    if(!reverse){
        try{
            fadeIn(elem);
            if(carouseriaDirection == "horizontal"){
                slideH(elem, 0, mainCarousel.clientWidth, 0, reverse);
            }else{
                if(carouseriaDirection == "vertical"){
                    slideV(elem, 0, mainCarousel.clientHeight, 0, reverse);
                }else{
                    console.log("Erro na definição da direção do carousel.");
                }
            }
        }catch(err){
            console.log("Erro detectado: " + err);
        }
        setTimeout(() => {
            elem.style.display = "block";
        }, 10);
    }else{
        try{
            fadeIn(elem);
            if(carouseriaDirection == "horizontal"){
                slideH(elem, 0, -(mainCarousel.clientWidth), 0, reverse);
            }else{
                if(carouseriaDirection == "vertical"){
                    slideV(elem, 0, -(mainCarousel.clientHeight), 0, reverse);
                }else{
                    console.log("Erro na definição da direção do carousel.");
                }
            }
        }catch(err){
            console.log("Erro detectado: " + err);
        }
        setTimeout(() => {
            elem.style.display = "block";
        }, 10);
    }
}

function hide(elem, reverse){
    if(!reverse){
        try{
            fadeOut(elem);
            if(carouseriaDirection == "horizontal"){
                slideH(elem, -(mainCarousel.clientWidth), 0, -(mainCarousel.clientWidth), reverse);
            }else{
                if(carouseriaDirection == "vertical"){
                    slideV(elem, -(mainCarousel.clientHeight), 0, -(mainCarousel.clientHeight), reverse);
                }else{
                    console.log("Erro na definição da direção do carousel.");
                }
            }
        }catch(err){
            console.log("Erro detectado: " + err);
        }
        setTimeout(() => {
            elem.style.display = "none";
            elem.style.top = "0px";
            elem.style.left = "0px";
        }, 300);
    }else{
        try{
            fadeOut(elem);
            if(carouseriaDirection == "horizontal"){
                slideH(elem, mainCarousel.clientWidth, 0, mainCarousel.clientWidth, reverse);
            }else{
                if(carouseriaDirection == "vertical"){
                    slideV(elem, mainCarousel.clientHeight, 0, mainCarousel.clientHeight, reverse);
                }else{
                    console.log("Erro na definição da direção do carousel.");
                }
            }
        }catch(err){
            console.log("Erro detectado: " + err);
        }
        setTimeout(() => {
            elem.style.display = "none";
            elem.style.top = "0px";
            elem.style.left = "0px";
        }, 300);
    }
}

function fadeIn(elem){
    elem.style.opacity = parseFloat(elem.style.opacity) + 0.1;
    if(elem.style.opacity > 1.0){
        elem.style.opacity = 1.0;
    }else{
        setTimeout(() => { fadeIn(elem); }, 10);
    }
}

function fadeOut(elem){
    elem.style.opacity = parseFloat(elem.style.opacity) - 0.1;
    if(elem.style.opacity < 0.0){
        elem.style.opacity = 0.0;
    }else{
        setTimeout(() => { fadeOut(elem); }, 10);
    }
}

function refreshFocus(reverse){
    show(focusElem, reverse);
}

function changeFocus(elem, reverse){
    hide(focusElem, reverse);
    focusElem = elem;
    setTimeout(() => refreshFocus(reverse), 300);
}

function next(){
    var nowCount = parseInt(focusElem.getAttribute("count"));

    if(nowCount < maxElem){
        changeFocus(innerElement[nowCount+1], false);
    }else{
        if(nowCount == maxElem && carouseriaLoop){
            changeFocus(innerElement[0], false);
        }
    }
}

function prev(){
    var nowCount = parseInt(focusElem.getAttribute("count"));

    if(nowCount > 0){
        changeFocus(innerElement[nowCount-1], true);
    }else{
        if(nowCount == 0 && carouseriaLoop){
            changeFocus(innerElement[maxElem], true);
        }
    }
}

function slideH(elem, path, startpos, finalpos, reverse){
    var id = setInterval(() => {
        for(var i=0; i<=100; i+=2){
            if(reverse ? startpos >= path : startpos <= path){
                clearInterval(id);
                elem.style.left = finalpos + 'px';
            }else{
                reverse ? startpos+=1 : startpos-=1;
                elem.style.left = startpos + 'px';
            }
        }
    }, 10);
}

function slideV(elem, path, startpos, finalpos, reverse){
    var id = setInterval(()=>{
        for(var i=0; i<=50; i+=2){
            if(reverse ? startpos >= path : startpos <= path){
                clearInterval(id);
                elem.style.top = finalpos + 'px';
            }else{
                reverse ? startpos+=1 : startpos-=1;
                elem.style.top = startpos + 'px';
            }
        }
    }, 10);
}