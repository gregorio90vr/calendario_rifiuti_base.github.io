function setViewportHeight() {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--viewport-height", `${vh}px`);
}

setViewportHeight();
window.addEventListener("resize", setViewportHeight);
window.addEventListener("orientationchange", () => setTimeout(setViewportHeight, 120));
window.addEventListener("visibilitychange", () => {
    if (!document.hidden) setViewportHeight();
});
