"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

const images = [
  { src: "https://images.unsplash.com/photo-1659733582156-d2a11801e59f?q=50&w=1600", h2: "We're No", h5: "Strangers to love" },
  { src: "https://images.unsplash.com/photo-1543362137-5df0547b039d?q=50&w=1600", h2: "You Know", h5: "The rules and so do I" },
  { src: "https://images.unsplash.com/photo-1631142260228-305ccb610dba?q=50&w=1600", h2: "Full commitment", h5: "Is what I'm thikning of" },
  { src: "https://images.unsplash.com/photo-1708022766976-49ca46c0f7de?q=50&w=1600", h2: "You Wouldn't", h5: "Get this from any other guy" },
  { src: "https://images.unsplash.com/photo-1631142260079-970258649676?q=50&w=1600", h2: "I Just Wanna", h5: "Tell you how I'm feeling" },
  { src: "https://images.unsplash.com/photo-1708022809820-2668e65877b9?q=50&w=1600", h2: "Gotta Make", h5: "You understand" },
  { src: "https://images.unsplash.com/photo-1708022796522-ff65b57439de?q=50&w=1600", h2: "Never Gonna", h5: "Give you up" },
  { src: "https://images.unsplash.com/photo-1708022790103-a514cb89a034?q=50&w=1600", h2: "Never Gonna", h5: "Let you down" },
];

export default function Carousel() {
  const carouselRef = useRef(null);
  const slidesRef = useRef([]);
  const navTextRef = useRef(null);
  const loopRef = useRef(null);
  const firstRunRef = useRef(true);

  // Parallax updater — inside component (so it has access to refs)
  const slideImgUpdate = useCallback(() => {
    const slides = (slidesRef.current || []).filter(Boolean);
    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      if (!img) return;
      const rect = slide.getBoundingClientRect();
      // mapRange(-rect.width, innerWidth, 0, 1, rect.x)
      const prog = gsap.utils.mapRange(-rect.width, window.innerWidth, 0, 1, rect.x);
      const val = gsap.utils.clamp(0, 1, prog);
      gsap.set(img, { xPercent: gsap.utils.interpolate(0, -50, val) });
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const container = carousel.querySelector(".carousel");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    const navText = navTextRef.current;
    const slides = (slidesRef.current || []).filter(Boolean);

    // prevent native scroll & show nav via GSAP
    gsap.set(container, { overflow: "visible", scrollSnapType: "none" });
    gsap.set(carousel.querySelector(".carousel-nav"), { display: "block" });

    // onChange handler for active slide transitions
    const onChange = (slide, index) => {
      const oldActive = carousel.querySelector(".active");
      if (oldActive) {
        gsap.to(oldActive, { opacity: 0.3, ease: "power2.inOut" });
        gsap.to(oldActive.querySelectorAll("h2, h5"), { opacity: 0, ease: "power2.inOut" });
        oldActive.classList.remove("active");
      }

      slide.classList.add("active");

      // run the intro animation for the new active slide
      gsap.timeline({ defaults: { ease: "power1.inOut" } })
        .to(slide, { opacity: 1 }, 0)
        .to(navText, { duration: 0.2, opacity: 0 }, 0)
        .set(navText, { innerText: `${index + 1}/${slides.length}` }, 0.2)
        .to(navText, { duration: 0.4, opacity: 0.5 }, 0.2)
        .to(slide.querySelectorAll("h2, h5"), { opacity: 1 }, 0.3)
        .fromTo(
          slide.querySelectorAll("h2, h5"),
          { y: (i) => [40, 60][i] },
          { duration: 1.5, y: 0, ease: "expo" },
          0.3
        )
        .progress(firstRunRef.current ? 1 : 0);
    };

    // create the loop and pass slideImgUpdate as onUpdate
    const loop = horizontalLoop(slides, {
      paused: true,
      paddingRight: 10,
      center: true,
      draggable: true,
      onChange,
      onUpdate: slideImgUpdate,
    });
    loopRef.current = loop;

    // wire nav buttons
    const handleNext = () => loop.next({ duration: 1, ease: "expo" });
    const handlePrev = () => loop.previous({ duration: 1, ease: "expo" });

    nextBtn?.addEventListener("click", handleNext);
    prevBtn?.addEventListener("click", handlePrev);

    // hover feedback for arrows
    const arrowOver = (e) => gsap.to(e.currentTarget, { opacity: 0.4 });
    const arrowOut = (e) => gsap.to(e.currentTarget, { opacity: 1 });
    nextBtn?.addEventListener("pointerover", arrowOver);
    nextBtn?.addEventListener("pointerout", arrowOut);
    prevBtn?.addEventListener("pointerover", arrowOver);
    prevBtn?.addEventListener("pointerout", arrowOut);

    // slides clickable to jump
    const slideClickHandlers = [];
    slides.forEach((slide, i) => {
      const h = () => loop.toIndex(i, { duration: 1, ease: "expo" });
      slide.addEventListener("click", h);
      slideClickHandlers.push({ el: slide, h });
    });

    // initial sets and first parallax frame
    gsap.set(slides, { opacity: (i) => (i === 0 ? 1 : 0.3) });
    gsap.set(slides.map(s => s.querySelector("h2")), { opacity: (i) => (i === 0 ? 1 : 0) });
    gsap.set(slides.map(s => s.querySelector("h5")), { opacity: (i) => (i === 0 ? 1 : 0) });

    // move to first index (no animation) and update parallax immediately
    loop.toIndex(0, { duration: 0 });
    slideImgUpdate();
    firstRunRef.current = false;

    // cleanup
    return () => {
      nextBtn?.removeEventListener("click", handleNext);
      prevBtn?.removeEventListener("click", handlePrev);
      nextBtn?.removeEventListener("pointerover", arrowOver);
      nextBtn?.removeEventListener("pointerout", arrowOut);
      prevBtn?.removeEventListener("pointerover", arrowOver);
      prevBtn?.removeEventListener("pointerout", arrowOut);
      slideClickHandlers.forEach(({ el, h }) => el.removeEventListener("click", h));
      try {
        // kill the timeline & draggable if available
        loop?.kill?.();
        if (loop?.draggable) {
          loop.draggable.kill?.();
        }
      } catch (err) {
        // ignore
      }
      loopRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideImgUpdate]); // slideImgUpdate is stable via useCallback

  return (
    <section ref={carouselRef} className="relative w-screen min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="carousel flex w-screen h-[70vh] gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className="carousel-slide relative flex-[0_0_75%] flex flex-col justify-center items-center text-white scroll-snap-center overflow-hidden cursor-pointer"
          >
            <img src={img.src} alt={img.h2} className="absolute left-0 w-[150%] h-full object-cover" />
            <h2 className="relative text-2xl font-bold">{img.h2}</h2>
            <h5 className="relative mt-2 text-base font-light tracking-wide">{img.h5}</h5>
          </div>
        ))}
      </div>

      <nav className="carousel-nav absolute w-full hidden">
        <button
          className="prev absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 w-[7vw] max-w-[75px] aspect-[1.5] bg-transparent bg-center bg-no-repeat"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg stroke='%23fff' fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 1 22 15'%3E%3Cpath d='M2,11 11,2 20,11'/%3E%3C/svg%3E\")" }}
          aria-label="Previous Slide"
        />
        <button
          className="next absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 w-[7vw] max-w-[75px] aspect-[1.5] bg-transparent bg-center bg-no-repeat"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg stroke='%23fff' fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 1 22 15'%3E%3Cpath d='M2,11 11,2 20,11'/%3E%3C/svg%3E\")" }}
          aria-label="Next Slide"
        />
        <div ref={navTextRef} className="absolute top-[36vh] w-full text-center text-white font-light opacity-50 tracking-[0.25rem] text-[clamp(22px,3.9vw,44px)]">
          1/8
        </div>
      </nav>
    </section>
  );
}

/* ----------------------------
   horizontalLoop helper
------------------------------ */
function horizontalLoop(items, config) {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => {
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          function () {
            // call the onUpdate hook (used for parallax)
            typeof config.onUpdate === "function" && config.onUpdate();

            // then handle onChange (active slide index changes)
            if (onChange) {
              let i = tl.closestIndex();
              if (lastIndex !== i) {
                lastIndex = i;
                onChange(items[i], i);
              }
            }
          },
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(),
          b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap((parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 + gsap.getProperty(el, "xPercent"));
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, { xPercent: (i) => xPercents[i] });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? (tl.duration() * container.offsetWidth) / 2 / totalWidth : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(tl.labels["label" + i] + (tl.duration() * widths[i]) / 2 / totalWidth - timeOffset);
          });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) d = wrap - d;
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(item, { xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy;
    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio,
        startProgress,
        draggable,
        lastSnap,
        initChangeX,
        wasPlaying,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.closestIndex(true);
      typeof InertiaPlugin === "undefined" && console.warn("InertiaPlugin not available - momentum will not be available.");
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        inertia: true,
        snap(value) {
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX;
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        },
        overshootTolerance: 0,
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize);
  });
  return timeline;
}
