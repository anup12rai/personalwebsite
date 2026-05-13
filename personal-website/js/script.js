// TYPEWRITER EFFECT

const text = "Software Engineer";
const typing = document.getElementById("typing");

let index = 0;

function typeEffect() {

  typing.textContent = text.slice(0, index);

  index++;

  if (index <= text.length) {
    setTimeout(typeEffect, 150);
  }

}

typeEffect();


// SCROLL ANIMATION

const sections = document.querySelectorAll("section");

sections.forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "all 1s ease";
});

window.addEventListener("scroll", () => {

  sections.forEach(section => {

    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {

      section.style.opacity = "1";
      section.style.transform = "translateY(0)";

    }

  });

});