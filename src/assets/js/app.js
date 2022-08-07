document.addEventListener("DOMContentLoaded", () => {


//= components/

function mainObserver() {
    const options = {
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

function preloadMainImg(callback) {
        const img = document.createElement('img');
        img.onload = img.onerror = callback;
        img.src = './assets/images/main/mainBg.png';
    }

    function changeBlurImg() {
    if (Boolean(this.width)) {
            const homeImg = document.querySelector('.home__bg')
            homeImg.classList.remove('blur')
            homeImg.src = this.src
    }
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
            slidesPerView: 4,
            spaceBetween: 20
        },
        1545: {
            slidesPerView: 5,
            spaceBetween: 40,
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

function focusInput () {
    for (const form of document.forms) {
        const inputForms = form.querySelectorAll('input')
        inputForms.forEach(input => {
            input.addEventListener('blur', blurListen)
        })
    }

    function blurListen (event) {
        const target = event.target
        const isHaveValue = Boolean(target.value)
        isHaveValue ? target.classList.add('input-container__haveValue') : target.classList.remove('input-container__haveValue')
    }
}

function activateMenu () {
    const toggleMenuButtons = document.querySelectorAll('.toggleMenuButton') 
    const menu = document.querySelector('.menu') || null
    if (toggleMenuButtons[0] && Boolean(menu)) { 
        toggleMenuButtons.forEach(button => {
            button.onclick = () => {
                menu.classList.toggle('active')
            }
        })
    }
}

focusInput()
mainObserver()
preLoad()
preloadMainImg(changeBlurImg);
activateMenu()
})











