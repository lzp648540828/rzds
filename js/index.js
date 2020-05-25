/**
 * 首页轮播图功能
 */
(function f() {
    let index  = 0;
    let nodeList = document.querySelectorAll(".carousel-images ul li");

    nodeList[0].classList.add("visible");

    let slideList = document.querySelectorAll(".carousel-slide ul li");
    for(let i = 0;i < slideList.length;i++){
        slideList[i].setAttribute("index",i.toString());
    }
    slideList[0].classList.add("active");
    let nextTip = function () {
        let old = index;
        if(nodeList.length - 1 === index){
            index = 0;
        }else {
            index++;
        }
        nodeList[old].classList.remove("visible");
        nodeList[index].classList.add("visible");

        slideList[old].classList.remove("active");
        slideList[index].classList.add("active");
    };
    let previousTip = function () {
        let old = index;
        if(index === 0){
            index = nodeList.length - 1;
        }else {
            index--;
        }
        nodeList[old].classList.remove("visible");
        nodeList[index].classList.add("visible");

        slideList[old].classList.remove("active");
        slideList[index].classList.add("active");

    };
    let goToIndex = function(event) {
        let current  = event.currentTarget;
        if(current.getAttribute("index") === index.toString()) return;

        slideList[index].classList.remove("active");
        nodeList[index].classList.remove("visible");
        current.classList.add("active");
        index = new Number(current.getAttribute("index")).valueOf();
        nodeList[index].classList.add("visible");

    };

    function load() {
        let previous = document.querySelector("#previous-btn");
        let next = document.querySelector("#next-btn");
        previous.onclick = previousTip;
        next.onclick = nextTip;
        slideList.forEach((e)=>{
            e.onclick = goToIndex;;
        });
        setInterval(()=>{
            let next = document.querySelector("#next-btn");
            next.onclick();
        },3000);
    };
    window.addEventListener("load",load);

})();

