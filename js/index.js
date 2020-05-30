/**
 * 轮播图功能
 */
(function () {
    function carousel(itemSelect, dotSelect, preBtn, nextBtn) {
        //记录当前显示的item的索引
        this.index = 0;

        //获取轮播的item和指示器
        this.nodeList = document.querySelectorAll(itemSelect);
        this.slideList = document.querySelectorAll(dotSelect);
        this.preBtn = document.querySelector(preBtn);
        this.nextBtn = document.querySelector(nextBtn);

        //把第一个item显示出来
        this.nodeList[0].classList.add("visible");
        this.slideList[0].classList.add("active");

        //给指示器添加一个属性，区分开来
        for (let i = 0; i < this.slideList.length; i++) {
            this.slideList[i].setAttribute("index", i.toString());
        }
    }

    //切换到上一张
    carousel.prototype.nextTip = function () {
        let old = this.index;
        if (this.nodeList.length - 1 === this.index) {
            this.index = 0;
        }else {
            this.index++;
        }
        this.nodeList[old].classList.remove("visible");
        this.nodeList[this.index].classList.add("visible");

        this.slideList[old].classList.remove("active");
        this.slideList[this.index].classList.add("active");
    };

    //切换到下一张
    carousel.prototype.previousTip = function () {
        let old = this.index;
        if (this.index === 0) {
            this.index = this.nodeList.length - 1;
        }else {
            this.index--;
        }
        this.nodeList[old].classList.remove("visible");
        this.nodeList[this.index].classList.add("visible");

        this.slideList[old].classList.remove("active");
        this.slideList[this.index].classList.add("active");
    };


    //点击指示器切换到对应item
    carousel.prototype.goToIndex = function (event) {
        //点击的获取指示器
        let current  = event.currentTarget;

        //如果点击的是正展示的，什么也不做
        if (current.getAttribute("index") === this.index.toString()) return;

        //隐藏当前
        this.slideList[this.index].classList.remove("active");
        this.nodeList[this.index].classList.remove("visible");

        //显示点击的，并更新索引
        current.classList.add("active");
        this.index = Number(current.getAttribute("index")).valueOf();
        this.nodeList[this.index].classList.add("visible");
    };

    //绑定事件
    carousel.prototype.load = function () {
        this.preBtn.onclick = carousel.prototype.previousTip.bind(this);
        this.nextBtn.onclick = carousel.prototype.nextTip.bind(this);

        this.slideList.forEach((e) => {
            e.onclick = this.goToIndex.bind(this);
        });
        setInterval(()=>{
            this.nextBtn.onclick();
        },5000);
    }
    window.carousel = carousel;
})();

new carousel(".mall-carousel .carousel-images  li", ".mall-carousel .carousel-slide li", "#previous-btn", "#next-btn").load();
new carousel(".mall-famous .carousel .images li", ".mall-famous .carousel .carousel-index li", "#famous-btn-previous", "#famous-btn-next").load();
new carousel(".mall-house-case .images li", ".mall-house-case .hc-slide li", "#hc-pre-btn", "#hc-next-btn").load();



