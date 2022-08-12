
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
            if (homeImg) {
                homeImg.classList.remove('blur')
                homeImg.src = this.src
            }
    }
    }


const swiper = new Swiper(".topSales__catalog", {
    slidesPerView: 2,
    spaceBetween: 19,
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
        1025: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1345: {
            slidesPerView: 4,
        },
        1545: {
            slidesPerView: 5,
            spaceBetween: 22,
        },
    }
});

const swiper2 = new Swiper(".topSalesItem__catalog", {
    slidesPerView: 2,
    spaceBetween: 19,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    effect: 'flip',
    autoHeight: true,
    },
    navigation: {
        nextEl: ".topSalesItem__nextButton",
        prevEl: ".topSalesItem__prevButton",
    },
    breakpoints: {
        // when window width is >= 1024px
        1025: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1345: {
            slidesPerView: 4,
        },
        1545: {
            slidesPerView: 5,
            spaceBetween: 22,
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

const previewSlider = new Swiper('.prewiev__slider', {
    slidesPerView: 4,
    spaceBetween: 12,
    loop: true,
    slideToClickedSlide	: true,
    breakpoints: {
        // when window width is >= 1024px
        1025: {
            spaceBetween: 20,
            direction: 'vertical',
        },
    }
})

function prewievImage () {
    const mainBlock = document.querySelector('.prewiev__imgMain') || null
    const swiper = document.querySelector('.prewiev__slider') || null
    if (mainBlock && swiper) {
        addImg(0)
        previewSlider.on('slideChange', () => {
            const currentActiveSlide = previewSlider.realIndex
            addImg(currentActiveSlide)
        })
    }

    function addImg(index) {
        const activeImg = previewSlider.slides[index].querySelector('img')
        mainBlock.href = activeImg.src
        mainBlock.querySelector('img').src = activeImg.src
    }
}
function focusInput () {
    for (const form of document.forms) {
        const inputForms = form.querySelectorAll('input')
        inputForms.forEach(input => {
            input.addEventListener('blur', blurListen)
            changeBlurElem(input)
        })
    }

    function blurListen (event) {
        const target = event.target
        changeBlurElem(target)
    }

    function changeBlurElem(el) {
        const isHaveValue = Boolean(el.value)
        isHaveValue ? el.classList.add('input-container__haveValue') : el.classList.remove('input-container__haveValue')
    }
}

function activateMenu () {
    const toggleMenuButtons = document.querySelectorAll('.toggleMenuButton') 
    const menu = document.querySelector('.menu') || null

    if (toggleMenuButtons[0] && Boolean(menu)) {
        toggleMenuButtons.forEach(button => {
            button.addEventListener('click', toggleMenu)
        })
    }

    function toggleMenu () {
        const widthScroll = window.innerWidth - document.documentElement.clientWidth
        document.documentElement.style.setProperty('--scrollWidth', widthScroll + 'px')
        menu.classList.toggle('active');
        menu.classList.toggle('noscroll')
        document.documentElement.classList.toggle('noscroll');
        menu.classList.contains('active') ? document.addEventListener('mouseup', closeMenu) : document.removeEventListener('mouseup', closeMenu)
    }

    function closeMenu (event) {
        const isItMenu = Boolean(event.target.closest('.menu'))

        if (isItMenu === false) {
            menu.classList.toggle('active')
            document.documentElement.classList.toggle('noscroll')
            menu.classList.toggle('noscroll')
            document.removeEventListener('mouseup', closeMenu)
        }
    }
}

function activeteToggleSearch () {
    const searchElement = document.querySelector('.search')
    const searchButton = document.querySelector('.header-search')
    const closeButton = document.querySelector('.search__close-icon')

    searchButton.addEventListener('click', toggleSearch)
    closeButton.addEventListener('click', toggleSearch)

    function toggleSearch() {
        searchElement.classList.toggle('search__hide')
        if (searchElement.classList.contains('search__hide')) {
            document.addEventListener('mouseup', closeSearch)
        } else {
            document.removeEventListener('mouseup', closeSearch)
        }
    }

    function closeSearch (event) {
        const isItSearch = Boolean(event.target.closest('.search'))
        const isItSearchIcon = Boolean(event.target.closest('.header-search'))
        if (isItSearch === false && isItSearchIcon === false) {
            searchElement.classList.remove('search__hide')
        }
    }
}

function changeHide() {
    const hideText = document.querySelector('.hideText') || null
    const characterText = document.querySelector('.characteristics') || null
    if (hideText && characterText) {
        hideText.innerHTML = 'Показать полностью'
        hideText.addEventListener('click', () => {
            characterText.classList.toggle('active666')
            hideText.innerHTML === 'Показать полностью' ? hideText.innerHTML = 'Скрыть' : hideText.innerHTML = 'Показать полностью'
            if (!characterText.classList.contains('active666')) {
                characterText.scrollIntoView(true)
            }
        })
        }
    }

const busketCounter = () => {
    const busketNumberContainer = document.querySelectorAll('.busket__inputNumberContainer')

    if (busketNumberContainer.length > 0) {
        busketNumberContainer.forEach(el => {
            el.addEventListener('click', changeNumber)
        })
    }

    function changeNumber (event) {
        const numberElement = this.querySelector('.busket__number')
        let numberNow = numberElement.innerHTML
        if (Boolean(event.target.closest('.busket__inputPlus'))) {
            numberNow++
            numberElement.innerHTML = numberNow
        } else if (Boolean(event.target.closest('.busket__inputMinus'))) {
            numberNow <= 0 ? numberNow = 0 : numberNow--
            numberElement.innerHTML = numberNow
        }
    }
}

const headerHide = () => {
    const searchElement = document.querySelector('.search')
    let scrollPrev = 0;
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset
        const header = document.querySelector('header')
        if (offset > 100 && offset > scrollPrev) {
            header.classList.add('out')
            if (searchElement) {
                searchElement.classList.remove('search__hide')
            }
        } else {
            header.classList.remove('out')
        }
        scrollPrev = offset
    })
}

headerHide()

focusInput()
mainObserver()
preLoad()
preloadMainImg(changeBlurImg);
activateMenu()
activeteToggleSearch()
prewievImage()
changeHide()
busketCounter()
})



let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}



let acc2 = document.getElementsByClassName("accordion2");

for (let i = 0; i < acc2.length; i++) {
  acc2[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


let filterIcoContainerMobile = document.querySelector('.filterIcoContainerMobile')
let filterContainer = document.querySelector('.filterContainer')

if (filterIcoContainerMobile != null) {
    filterIcoContainerMobile.addEventListener('click', e => {
        filterContainer.classList.toggle('filterContainerMobile')
    })
}


let crossIco = document.querySelector('.crossIco')
if (crossIco != null) {
    crossIco.addEventListener('click', e => {
        filterContainer.classList.toggle('filterContainerMobile')
    })
}










