// Smooth scrolling with Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  const tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

// Mouse circle scaling interaction
let timeout;
function circleChaptaKaro() {
  let xscale = 1, yscale = 1;
  let xprev = 0, yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform =
        `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform =
      `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();


// Image follow animation - DESKTOP + MOBILE
document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;
  const img = elem.querySelector("img");

  // Desktop hover interaction
  elem.addEventListener("mousemove", function (dets) {
    const diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(img, {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(img, {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  // Mobile touch interaction
  elem.addEventListener("touchstart", function (e) {
    const touch = e.touches[0];
    const diff = touch.clientY - elem.getBoundingClientRect().top;

    gsap.to(img, {
      opacity: 1,
      top: diff,
      left: touch.clientX,
      rotate: 0,
      ease: Power3,
      duration: 0.3,
    });
  });

  elem.addEventListener("touchmove", function (e) {
    const touch = e.touches[0];
    const diff = touch.clientY - elem.getBoundingClientRect().top;

    gsap.to(img, {
      top: diff,
      left: touch.clientX,
      ease: Power3,
      duration: 0.2,
    });
  });

  elem.addEventListener("touchend", function () {
    gsap.to(img, {
      opacity: 0,
      ease: Power3,
      duration: 0.3,
    });
  });
});
