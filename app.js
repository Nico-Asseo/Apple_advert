// ============= Navbar line effect ========== //
gsap.registerPlugin(Flip)

const links = document.querySelectorAll(".nav-link a")
const activeNav = document.querySelector(".active-nav")

links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    const state = Flip.getState(activeNav)
    link.appendChild(activeNav)
    Flip.from(state, { duration: 1.25, ease: "elastic.out(0.8, 0.7)" })
  })
})

// ============= First page subtitle effect =========== //
const firstPageSubtitle = document.querySelector(".first-page-subtitle")
const letters = firstPageSubtitle.textContent.split(".")
letters.pop()
firstPageSubtitle.textContent = ""
console.log(letters)

letters.forEach((letter) => {
  letter += "."
  firstPageSubtitle.innerHTML += `<span class="letter">${letter}</span> <span class="letter"></span>`
})

gsap.set(".letter", { display: "inline-block" })
gsap.fromTo(
  ".letter",
  { opacity: 0, y: "10px" },
  { opacity: 1, y: 0, delay: 1, stagger: 0.4, ease: "back.out(3)" }
)

// Pin first page
const tlIntro = gsap.timeline({
  scrollTrigger: {
    trigger: ".first-page",
    start: "0%",
    end: "100%",
    pin: true,
    pinSpacing: false,
  },
})

// Highlight page 2
const tlH = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-page",
    scrub: true,
    start: "-40%",
    end: "60%",
  },
})

tlH.fromTo(
  ".highlight",
  { color: "rgba(255, 255, 255, 0.4)" },
  { color: "rgba(255, 255, 255, 1)", stagger: 1, ease: "Power2.easeOut" }
)

const tlHRemove = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-page",
    scrub: true,
    start: "-20%",
    end: "80%",
  },
})

tlHRemove.to(".highlight", {
  color: "rgba(255, 255, 255, 0.4)",
  stagger: 1,
  ease: "Power2.easeOut",
})

// Page 3
const tlSplit = gsap.timeline({
  scrollTrigger: {
    trigger: ".third-page",
    start: "-35%",
    end: "15%",
    scrub: true,
  },
})

tlSplit.fromTo(".large-phone", { x: "40%" }, { x: "20%" })
tlSplit.fromTo(".small-phone", { x: "-40%" }, { x: "-20%" }, "<")

tlSplit.fromTo(
  ".product-text-left",
  { x: 50, opacity: 0 },
  { opacity: 1, x: -50 },
  "<"
)
tlSplit.fromTo(
  ".product-text-right",
  { x: -50, opacity: 0 },
  { opacity: 1, x: 50 },
  "<"
)

const tlSplitPin = gsap.timeline({
  scrollTrigger: {
    trigger: ".third-page",
    pin: true,
    pinSpacing: false,
    start: "0%",
    end: "100%",
  },
})

// Carousel

const swatches = document.querySelectorAll(".swatches img")
const gallery = document.querySelector(".phone-gallery")
const slides = document.querySelectorAll(".phone-gallery-container")

let currentSwatch = "blue"
let topIndex = 2

swatches.forEach((swatch, index) => {
  const coord = slides[index].getBoundingClientRect().left

  swatch.addEventListener("click", (e) => {
    let swatchName = e.target.getAttribute("swatch")
    let closeUp = document.querySelector("." + swatchName)

    // Check if we are on the same swatch
    if (currentSwatch === swatchName) return
    gsap.set(closeUp, { zIndex: topIndex })
    gsap.fromTo(closeUp, { opacity: 0 }, { opacity: 1, duration: 1 })

    // Gallery
    gsap.to(gallery, { x: -coord, duration: 1, ease: "back.out(1)" })

    // Increment z-index
    topIndex++
    currentSwatch = swatchName
  })
})

// Page 5 video on scroll

const tlVideo = gsap.timeline({
  scrollTrigger: {
    trigger: ".fifth-page",
    start: "0%",
    end: "150%",
    scrub: true,
    pin: true,
  },
})

tlVideo.fromTo(
  ".product-video",
  { currentTime: 0 },
  { currentTime: 3, duration: 1 }
)

tlVideo.fromTo(
  ".product-info-container h3",
  { opacity: 0 },
  { opacity: 1, stagger: 0.25, duration: 0.8 },
  "<"
)

// 6th page

const tlParallax = gsap.timeline({
  scrollTrigger: {
    trigger: ".sixth-page",
    start: "-25%",
    end: "50%",
    scrub: true,
  },
})

tlParallax.fromTo(".photo-description", { y: 0 }, { y: -40 })
tlParallax.fromTo(".portrait-container", { y: 0 }, { y: -40 }, "<")
tlParallax.fromTo(".phone-video", { y: 0 }, { y: 100 }, "<")
