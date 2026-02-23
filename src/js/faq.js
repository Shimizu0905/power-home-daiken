const HEIGHT_PROP = "height";
const ANIMATING_FLAG = "faqAnimating";

function animateOpen(details, answer) {
  answer.style.setProperty(HEIGHT_PROP, "0px");
  details.open = true;
  details.classList.add("is-open");
  details.dataset[ANIMATING_FLAG] = "true";

  const targetHeight = answer.scrollHeight;
  requestAnimationFrame(() => {
    answer.style.setProperty(HEIGHT_PROP, `${targetHeight}px`);
  });

  const onEnd = (event) => {
    if (event.propertyName !== HEIGHT_PROP) return;
    answer.style.setProperty(HEIGHT_PROP, "auto");
    delete details.dataset[ANIMATING_FLAG];
    answer.removeEventListener("transitionend", onEnd);
  };

  answer.addEventListener("transitionend", onEnd);
}

function animateClose(details, answer) {
  details.dataset[ANIMATING_FLAG] = "true";
  const currentHeight = answer.scrollHeight;

  answer.style.setProperty(HEIGHT_PROP, `${currentHeight}px`);
  requestAnimationFrame(() => {
    details.classList.remove("is-open");
    answer.style.setProperty(HEIGHT_PROP, "0px");
  });

  const onEnd = (event) => {
    if (event.propertyName !== HEIGHT_PROP) return;
    details.open = false;
    delete details.dataset[ANIMATING_FLAG];
    answer.removeEventListener("transitionend", onEnd);
  };

  answer.addEventListener("transitionend", onEnd);
}

function initFaqAccordion() {
  const items = document.querySelectorAll(".p-faq__item");

  items.forEach((details) => {
    const summary = details.querySelector(".p-faq__question");
    const answer = details.querySelector(".p-faq__answer");
    if (!summary || !answer) return;

    if (details.open) {
      details.classList.add("is-open");
      answer.style.setProperty(HEIGHT_PROP, "auto");
    } else {
      details.classList.remove("is-open");
      answer.style.setProperty(HEIGHT_PROP, "0px");
    }

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (details.dataset[ANIMATING_FLAG] === "true") return;

      if (details.open) {
        animateClose(details, answer);
      } else {
        animateOpen(details, answer);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initFaqAccordion);
