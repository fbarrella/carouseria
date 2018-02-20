var arrayParam, 
    carouseriaHeight, 
    carouseriaLoop,
    carouseriaDirection,
    carouseriaAutoPlay,
    carouseriaIndex,
    indexContent,
    indexContentChild,
    autoPlay,
    slideReady,
    mainCarousel, 
    innerElement, 
    focusElem, 
    maxElem;

function setCarousel(divParam){
    console.clear();
    clearInterval();
    if(indexContent != null) indexContent.remove();

    if(document.getElementById("carouseria") != null){
        mainCarousel = document.getElementById("carouseria");
        console.log("O bloco \"" + mainCarousel.id + "\" foi encontrado!");

        carouseriaHeight = divParam.split(" ")[0];
        carouseriaLoop = ("true" == divParam.split(" ")[1]);
        carouseriaDirection = divParam.split(" ")[2];
        carouseriaAutoPlay = divParam.split(" ")[3];
        carouseriaIndex = (divParam.split(" ")[4]).split("|");

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
            slideReady = true;

            if(carouseriaIndex[0] == "true") visualIndex(innerElement.length, carouseriaIndex[1]);

            refreshFocus(false);
            autoplay(carouseriaAutoPlay);
        }else{
            console.log("Não foram detectados itens para exibição.");
        }

    }else{
        console.log("Houve erro na detecção do id \"carouseria\"!");
    }
}

function show(elem, reverse){
    elem.style.top = "0px";
    elem.style.left = "0px";

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
            if(carouseriaIndex[0] == "true") indexChange();
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
            if(carouseriaIndex[0] == "true") indexChange();
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
        }, 300);
    }
}

function autoplay(param){
    if(param.split("|")[0] == "true"){
        autoPlay = setInterval(() => next(), param.split("|")[1]);
        console.log("Função \"autoplay\" ativada!");
    }else{
        clearInterval(autoPlay);
        console.log("Função \"autoplay\" desativada!");
    }
}

function visualIndex(num, setParams){
    indexContent = document.createElement('div');
    setParams == "vertical"?
    indexContent.setAttribute("class", "carouseria-index verti"):
    indexContent.setAttribute("class", "carouseria-index hori");
    
    for (var i=0; i<num; i++){
        indexContent.innerHTML = indexContent.innerHTML + '<span class="index-item"></span>';
    }

    mainCarousel.insertAdjacentElement('afterend', indexContent);

    indexContentChild = indexContent.querySelectorAll('span');
    for(var i=0; i<indexContentChild.length; i++){
        indexContentChild[i].style.opacity = 0.4;
    }
}

function indexChange(){
    for(var i=0; i<indexContentChild.length; i++){
        indexContentChild[i].style.opacity = 0.4;
    }

    indexContentChild[parseInt(focusElem.getAttribute("count"))].style.opacity = 0.8;
}

function fadeIn(elem){
    elem.style.opacity = parseFloat(elem.style.opacity) + 0.1;
    if(elem.style.opacity > 1.0){
        elem.style.opacity = 1.0;
        setTimeout(() => { slideReady = true; }, 200);
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
    if(slideReady){
        var nowCount = parseInt(focusElem.getAttribute("count"));

        if(nowCount < maxElem){
            slideReady = false;
            changeFocus(innerElement[nowCount+1], false);
        }else{
            if(nowCount == maxElem && carouseriaLoop){
                slideReady = false;
                changeFocus(innerElement[0], false);
            }
        }
    }
}

function prev(){
    if(slideReady){
        var nowCount = parseInt(focusElem.getAttribute("count"));

        if(nowCount > 0){
            slideReady = false;
            changeFocus(innerElement[nowCount-1], true);
        }else{
            if(nowCount == 0 && carouseriaLoop){
                slideReady = false;
                changeFocus(innerElement[maxElem], true);
            }
        }
    }
}

function slideH(elem, path, startpos, finalpos, reverse){
    var id = setInterval(() => {
        for(var i=0; i<=140; i+=2){
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