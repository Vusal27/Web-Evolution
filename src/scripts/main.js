// Слайдер
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slider__item");
    var switcher = document.getElementsByClassName("slider__switcher-item");

    if (n >slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex=slides.length
    }
    for (i=0; i <slides.length; i++) {
        slides[i].style.display= "none";
    }
    for (i=0; i< switcher.length; i++) {
        switcher[i].className= switcher[i].className.replace("active","");
    }
    slides[slideIndex-1].style.display = "block";
    switcher[slideIndex-1].className+= " slider__switcher-item_active";
}

// Секция форма //
const myForm = document.querySelector('.form');
const send = document.querySelector('.form__send');
send.addEventListener('click', event => {
    event.preventDefault();
    
    if (validateForm(myForm)) {
        const data = {
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            comment: myForm.elements.comment.value,
            mail: myForm.elements.mail.value
        };
        
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', () => {
            
            if (xhr.status === 200) {
                document.body.appendChild(openOverlayForm(xhr.response.message));
            } else {
                document.body.appendChild(openOverlayForm(xhr.response.message));
            }
        });
    }
});
function openOverlayForm(content) {
    const background = document.querySelector(".sectionseven");
    background.classList.add("er");
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("over-lay");
    overlayElement.addEventListener("click", e => {
        if (e.target === overlayElement) {
        closeElement.click();
        }
    });

    const containerElement = document.createElement("div");
    containerElement.classList.add("overlay-container");

    const contentElement = document.createElement("div");
    contentElement.classList.add("overlay-content");
    contentElement.textContent = "Ошибка!";

    const closeElement = document.createElement("button");
    closeElement.classList.add("button_close");
    closeElement.textContent = "закрыть";
    closeElement.addEventListener("click", function() {
        document.body.removeChild(overlayElement);
    });

    overlayElement.appendChild(containerElement);
    containerElement.appendChild(contentElement);
    containerElement.appendChild(closeElement);

    return overlayElement;
}

function validateForm(form) {
    let valid = true;

    if (!validateformblock(form.elements.name)) {
        valid = false;
    }
    if (!validateformblock(form.elements.phone)) {
    valid = false;
    }
    if (!validateformblock(form.elements.comment)) {
    valid = false;
    }
    return valid;
}

function validateformblock(formblock) {
        formblock.nextElementSibling.textContent = formblock.validationMessage;
        return formblock.checkValidity();
}

// Бургер меню //
var navBurger = document.querySelector('.nav');
navBurger.addEventListener('click', toggleClass);

function toggleClass() {
    navBurger.classList.toggle("nav_active");
}