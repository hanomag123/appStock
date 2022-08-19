
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
        img.src = './assets/images/main/mainBg.png';
        img.onload = img.onerror = callback;
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
    const mainBlock = document.querySelector('.prewiev__imgContainer') || null
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
    const menu = document.querySelector('.menu') || null
    const toggleMenuButtons = document.querySelector('.toggleMenuButton')
    const menuHider = document.querySelector('.menu__hider')


    if (toggleMenuButtons && Boolean(menu)) {
            toggleMenuButtons.addEventListener('click', toggleMenu, true)
    }

    function getWidthScrollBar ()   {
        return window.innerWidth - document.documentElement.clientWidth
    }

    const getScrollBar = () => {
        document.documentElement.style.setProperty('--scrollWidth', getWidthScrollBar() + 'px')
    }
    getScrollBar()

    window.addEventListener('resize', getScrollBar)

    function toggleMenu () {
        const toggleMenuButtons = document.querySelector('.toggleMenuButton')
        toggleMenuButtons.classList.toggle('activeIcon')
        menuHider.classList.toggle('active')
        menu.classList.toggle('active');
        document.body.classList.toggle('noscroll');
        menu.classList.toggle('noscrollMenu')
        menu.classList.contains('active') ? document.addEventListener('mouseup', closeMenu) : document.removeEventListener('mouseup', closeMenu)
    }

    function closeMenu (event) {
        const isItMenu = Boolean(event.target.closest('.menu'))
        const toggleMenuButtons = document.querySelector('.toggleMenuButton')
        const isItButton = Boolean(event.target.closest('.toggleMenuButton'))

        if (isItMenu === false && isItButton == false) {
            menuHider.classList.toggle('active')
            menu.classList.toggle('active')
            document.body.classList.toggle('noscroll')
            menu.classList.toggle('noscrollMenu')
            document.removeEventListener('mouseup', closeMenu)
            toggleMenuButtons.classList.remove('activeIcon')
        }
    }
}

function activeteToggleSearch () {
    const searchElement = document.querySelector('.search')
    const searchButton = document.querySelector('.header-search')
    const closeButton = document.querySelector('.search__close-icon')
    const toggleMenuButtons = document.querySelector('.toggleMenuButton')

    searchButton.addEventListener('click', toggleSearch)
    closeButton.addEventListener('click', toggleSearch)

    function toggleSearch() {
        searchElement.classList.toggle('search__hide')
        if (searchElement.classList.contains('search__hide')) {
            toggleMenuButtons.style.pointerEvents='none'
            document.addEventListener('mouseup', closeSearch)
        } else {
            toggleMenuButtons.style.pointerEvents='auto'
            document.removeEventListener('mouseup', closeSearch)
        }
    }

    function closeSearch (event) {
        event.stopPropagation()
        const isItSearch = Boolean(event.target.closest('.search'))
        const isItSearchIcon = Boolean(event.target.closest('.header-search'))
        if (isItSearch === false && isItSearchIcon === false) {
            searchElement.classList.remove('search__hide')
            toggleMenuButtons.style.pointerEvents='auto'
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
                characterText.scrollIntoView({block: "center", behavior: "smooth"})
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
            numberNow >= 99 ? numberNow = 99 : numberNow++
            numberElement.innerHTML = numberNow
        } else if (Boolean(event.target.closest('.busket__inputMinus'))) {
            numberNow <= 1 ? numberNow = 1 : numberNow--
            numberElement.innerHTML = numberNow
        }
    }
}
function addMask() {
    [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

}

const headerHide = () => {
    let isUp = false;
    let counter = 0;
    const searchElement = document.querySelector('.search')
    const toggleMenuButtons = document.querySelector('.toggleMenuButton')
    let scrollPrev = 0;
    let border = 110;
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset
        const header = document.querySelector('header')
        if (offset > border && offset > scrollPrev) {
            header.classList.add('out')
            toggleMenuButtons.classList.add('out')
            counter = 0
            if (searchElement) {
                searchElement.classList.remove('search__hide')
            }
            toggleMenuButtons.style.pointerEvents='auto'
        } else {
            if (counter > 15 || offset < border) {
                header.classList.remove('out')
                toggleMenuButtons.classList.remove('out')
            }
        }
        if (+offset > +scrollPrev) {
            isUp = false
        } else {
            isUp = true;
            counter = counter + 1
        }
        scrollPrev = offset
    })
}

headerHide()
addMask()
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

// acc[0].click()


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



let selectItem2 = document.querySelectorAll('option')
// console.log(selectItem)
let selectSend = document.querySelector('.selectSend')

let select = function () {
    let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item');

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.select__current');
        currentText.innerText = text;
        select.classList.remove('is-active');

        selectItem2.forEach(e => {
            let elemText = e.innerHTML
            
            if (text === elemText) {
                e.selected = true
                // selectSend.click()
            }
        })

    }

};


select();


let filterBtn = document.querySelectorAll('.filterBtn');
let counter = 0;

filterBtn.forEach(e => {
    e.addEventListener('click', elem => {
        counter += 1
        if (counter === 1 ) {
            
            e.classList.add('activeFirst');
        }else if (counter === 2 ) {
            e.classList.remove('activeFirst')
            e.classList.add('activeSecond')
        }else if (counter === 3) {
            e.classList.remove('activeSecond')
            counter = 0
        }
    })
})






