document.addEventListener("DOMContentLoaded", () => {


//= components/




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
})











