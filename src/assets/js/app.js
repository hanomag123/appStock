document.addEventListener("DOMContentLoaded", () => {


//= components/

function mainObserver() {
    const options = {
        rootMargin: '0px 1000px 0px 1000px'
    }
    function vdHandler(els) {
        els.forEach((data) => {
        if (data.isIntersecting === true) {
            data.target.classList.add('observe-active')
        } else {
            data.target.classList.remove('observe-active')
        }
        })
    }
    
    const observer = new IntersectionObserver(vdHandler, options)
    const observeTarget = document.querySelectorAll('.observe, .observe-left')
    
    observeTarget.forEach(el => {
        observer.observe(el)
    })
}

function preLoad() {
    const options = {
        rootMargin: '200px'
    }
    function vdHandler(els) {
        els.forEach((data) => {
        if (data.isIntersecting === true && Boolean(data.target.dataset.src)) {
            data.target.src = data.target.dataset.src
            observer.unobserve(data.target)
        }
        })
    }
    
    const observer = new IntersectionObserver(vdHandler, options)
    const observeTarget = document.images
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
    slidesPerView: 2,
    spaceBetween: 22,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
        nextEl: ".topSales__nextButton",
        prevEl: ".topSales__prevButton",
    },
    breakpoints: {
        // when window width is >= 1024px
        1024: {
            slidesPerView: 5,
            spaceBetween: 20
        },
    }
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











