const tl = gsap.timeline();

const intro = document.querySelector(".intro");
const wrap = document.querySelector(".mainWrap");
const header = document.querySelector(".headerContainer");

gsap.set(".mainText, .subText p, .scroll", { opacity: 0 });
gsap.set(".introLogo", { clipPath: "inset(0 100% 0 0)" });

function introScroll() {
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".introContents",
      start: "top top",
      end: "+=6000",
      scrub: true,
      pin: true,
      onLeave: () => {
        gsap.to(".introContents", {
          opacity: 0,
          duration: 1.5,
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
      stagger: { each: 0.2, from: "start" },
      onComplete: () => {
        intro.classList.add("hide");
        wrap.classList.add("show");
        const activeSection =
          document.querySelector(".sectionWrap.show") ||
          document.querySelector(".sectionWrap");
        if (activeSection) {
          activeSection.classList.add("show");
          sectionAni(activeSection);
        }
      },
    })
    .to(".mainText", { opacity: 0 }, "<-0.5");
}

function menuOn(targets) {
  targets.forEach((el) => {
    el.addEventListener("click", () => {
      targets.forEach((menu) => menu.classList.remove("on"));
      el.classList.add("on");

      if (el.classList.contains("mainMenu")) {
        const menuId = el.dataset.id;
        const targetSection = document.getElementById(menuId);

        document.querySelectorAll(".sectionWrap").forEach((sec) => {
          sec.classList.toggle("show", sec === targetSection);
        });

        const tabMenus = document.querySelectorAll(".tabMenuWrap .tabMenu");
        tabMenus.forEach((tab, index) => {
          tab.classList.toggle("on", index === 0);
        });

        if (targetSection && tabMenus.length > 0) {
          const firstTabName = tabMenus[0].textContent.trim();
          const aniContainers = targetSection.querySelectorAll(
            ".aniSectionWrap .aniContainer",
          );
          let firstTargetEl = null;

          aniContainers.forEach((container) => {
            const isMatch = container.classList.contains(firstTabName);
            container.classList.toggle("show", isMatch);
            if (isMatch) firstTargetEl = container;
          });

          if (firstTargetEl) {
            firstTargetEl.parentElement.prepend(firstTargetEl);
          }

          sectionAni(targetSection);
        }
      }

      if (el.classList.contains("tabMenu")) {
        const menuTarget = el.textContent.trim();
        const activeSection = document.querySelector(".sectionWrap.show");
        if (!activeSection) return;

        const aniContainers = activeSection.querySelectorAll(
          ".aniSectionWrap .aniContainer",
        );
        let currentEl = null;

        aniContainers.forEach((container) => {
          const isTarget = container.classList.contains(menuTarget);
          container.classList.toggle("show", isTarget);
          if (isTarget) currentEl = container;
        });

        if (currentEl) {
          currentEl.parentElement.prepend(currentEl);
          productAni(activeSection);
        }
      }

      window.scrollTo(0, 0);
    });
  });
}

const mainMenu = document.querySelectorAll(".gnb .mainMenu");
const subMenu = document.querySelectorAll(".tabMenuWrap .tabMenu");

menuOn(mainMenu);
menuOn(subMenu);

let productAni = () => {};

function sectionAni(targetSection) {
  if (!targetSection) return;

  const imgSectionWrap = targetSection.querySelector(".imgSectionWrap");
  const aniSectionWrap = targetSection.querySelector(".aniSectionWrap");

  gsap.set(targetSection.querySelectorAll(".sectionContWrap.text p"), {
    clipPath: "inset(0 100% 0 0)",
  });
  header.classList.add("hide");
  if (imgSectionWrap) imgSectionWrap.classList.remove("hide");
  if (aniSectionWrap) aniSectionWrap.classList.add("hide");

  gsap
    .timeline()
    .to(targetSection.querySelectorAll(".sectionContWrap.text p"), {
      delay: 1,
      duration: 1.5,
      clipPath: "inset(0 0% 0 0)",
      ease: "power2.out",
      stagger: 1.5,
    })
    .fromTo(
      targetSection.querySelector(".imgSectionWrap .img2"),
      { opacity: 1 },
      {
        opacity: 0,
        duration: 2,
        onComplete: () => {
          if (imgSectionWrap) imgSectionWrap.classList.add("hide");
          if (aniSectionWrap) aniSectionWrap.classList.remove("hide");
          header.classList.remove("hide");

          productAni(targetSection);
        },
      },
      "<+3",
    );
}

let mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width:1025px)",
    isMobile: "(max-width:1024px)",
  },
  (context) => {
    let { isDesktop, isMobile } = context.conditions;

    if (isDesktop) {
      let oldTrigger = null;

      productAni = (targetSection) => {
        if (oldTrigger) {
          oldTrigger.kill();
          oldTrigger = null;
        }

        const activeContainer =
          targetSection.querySelector(".aniContainer.show");
        if (!activeContainer) return;

        gsap.set(activeContainer.querySelectorAll(".productImgWrap > .bgImg"), {
          opacity: 0,
        });
        gsap.set(activeContainer.querySelectorAll(".productText > span.on"), {
          clipPath: "inset(100% 0 0 0)",
        });

        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: activeContainer,
            start: "top top",
            end: "+=3000",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        oldTrigger = tl4.scrollTrigger;

        tl4
          .to(
            activeContainer.querySelectorAll(".productText > span.on"),
            {
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              stagger: 0.5,
              color: "#111",
            },
            "<",
          )
          .to(
            activeContainer.querySelectorAll(".productImgWrap > .bgImg"),
            {
              opacity: 1,
              stagger: 0.5,
            },
            "<0.5",
          );

        ScrollTrigger.refresh();
      };
    }

    if (isMobile) {
      let oldTrigger = null;

      productAni = (targetSection) => {
        if (oldTrigger) {
          oldTrigger.kill();
          oldTrigger = null;
        }

        const activeContainer =
          targetSection.querySelector(".aniContainer.show");
        if (!activeContainer) return;

        const moScroll = gsap.timeline({
          scrollTrigger: {
            trigger: activeContainer,
            start: "top top",
            end: "+=3000",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        oldTrigger = moScroll.scrollTrigger;

        moScroll
          .to(activeContainer.querySelectorAll(".productText > span"), {
            opacity: 0,
            stagger: {
              each: 0.2,
              from: "end",
            },
          })
          .to(activeContainer.querySelector(".productImgWrap .product"), {
            opacity: 1,
          });
      };
    }
  },
);

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
