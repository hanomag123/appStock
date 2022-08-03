document.addEventListener("DOMContentLoaded", () => {


//= components/

function mainObserver() {
    function vdHandler(els) {
        els.forEach((data) => {
        if (data.isIntersecting === true) {
            data.target.classList.add('observe-active')
        } else {
            data.target.classList.remove('observe-active')
        }
        })
    }
    
    const observer = new IntersectionObserver(vdHandler)
    const observeTarget = document.querySelectorAll('.observe, .observe-left')
    
    observeTarget.forEach(el => {
        observer.observe(el)
    })
}

function preLoad() {
    function vdHandler(els) {
        els.forEach((data) => {
        if (data.isIntersecting === true && Boolean(data.target.dataset.src)) {
            data.target.src = data.target.dataset.src
        }
        })
    }
    
    const observer = new IntersectionObserver(vdHandler)
    const observeTarget = document.images
    console.log(document.images)
    for(let el of observeTarget) {
        observer.observe(el)
    }
}

function loadMainImg() {
    function loadImg() {
        const homeImg = document.querySelector('.home__bg')
        homeImg.classList.remove('blur')
        homeImg.src = this.src
    }

    const mainImg = document.createElement('img')
    mainImg.src = './assets/images/main/mainBg.png'

    mainImg.addEventListener('load', loadImg)
}

const swiper = new Swiper(".topSales__catalog", {
    slidesPerView: 5,
    spaceBetween: 22,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
        nextEl: ".topSales__nextButton",
        prevEl: ".topSales__prevButton",
    },
});

const newsSwiper = new Swiper(".news__swiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
        nextEl: ".news__nextButton",
        prevEl: ".news__prevButton",
    },
    loop: true,
    centeredSlides: true,
    reverseDirection: false,
});

mainObserver()
preLoad()
loadMainImg()
})











