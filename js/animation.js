const tl = gsap.timeline();

const intro = document.querySelector(".intro");
const wrap = document.querySelector(".mainWrap");
const section = document.querySelector("#sectionWrap1");
const header = document.querySelector(".headerContainer");

gsap.set(".mainText, .subText p, .scroll", { opacity: 0 });
gsap.set(".introLogo", { clipPath: "inset(0 100% 0 0)" });

tl.to(".introLogo", {
  clipPath: "inset(0 0% 0 0)",
  duration: 2,
  onComplete: introScroll,
})
  .to(".introBg", { opacity: 0 })
  .fromTo(
    ".scroll",
    { y: -40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      delay: 0.5,
      stagger: { each: 0.3, from: "end" },
      repeat: 1,
    },
  );

// intro 스크롤 이벤트
function introScroll() {
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".introContents",
      start: "top top",
      end: "6000",
      scrub: true,
      pin: true,
      onLeave: () => {
        gsap.to(".introContents", {
          opacity: 0,
          duration: 1.5,
          onComplete: () => {
            intro.classList.add("hide");
            wrap.classList.add("show");
            section.classList.add("on");
            window.scrollTo({ top: 0, behavior: "auto" });
            section1Ani();
          },
        });
      },
    },
  });

  tl2
    .to(".scroll, .introLogo", { opacity: 0, duration: 0.3 })
    .to(".mainText", { opacity: 1 })
    .to(".subText p", {
      opacity: 1,
      delay: 0.5,
      stagger: { each: 0.2, from: "top" },
    })
    .to(".mainText", { opacity: 0 }, "<-0.5");
}

const imgSectionWrap = document.querySelector("#sectionWrap1 .imgSectionWrap");
const aniSectionWrap = document.querySelector("#sectionWrap1 .aniSectionWrap");

//section1
function section1Ani() {
  gsap.set(".sectionContWrap.text p", { clipPath: "inset(0 100% 0 0)" });
  imgSectionWrap.classList.remove("hide");
  aniSectionWrap.classList.add("hide");

  const tl3 = gsap.timeline();
  tl3
    .to("#sectionWrap1 .sectionContWrap.text p", {
      delay: 1,
      duration: 1.5,
      clipPath: "inset(0 0% 0 0)",
      ease: "power2.out",
      stagger: "1.5",
    })
    .to(
      "#sectionWrap1 .img2",
      {
        opacity: 0,
        duration: 2,
        onComplete: () => {
          productAni();
        },
      },
      "<+3",
    );
}

//productImg
function productAni() {
  header.classList.add("product");
  aniSectionWrap.classList.remove("hide");
  imgSectionWrap.classList.add("hide");

  gsap.set(".productImgWrap > .bgImg", { opacity: 0 });
  gsap.set(".aniSectionWrap .productText > span.on", {
    clipPath: "inset(100% 0 0 0)",
  });

  const tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: "aniSectionWrap",
      start: "top top",
      end: "5000",
      scrub: true,
      pin: true,
    },
  });
  tl4.to(".aniSectionWrap .productText > span.on", {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)",
    stagger: 0.5,
    color: "#111",
  });
  tl4.to(
    ".productImgWrap > .bgImg",
    {
      opacity: 1,
      stagger: 0.5,
      onComplete: () => {
        gsap.to(".productImgWrap > .bgImg.tangerine", {
          transformOrigin: "50% 0%",
          rotation: 2,
          duration: 1,
          delay: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    },
    "<",
  );
}
