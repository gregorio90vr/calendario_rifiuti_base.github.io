function updateViewportHeight() {
    // Get the actual viewport height
    const vh = window.innerHeight;
    
    // Set a CSS custom property with the viewport height
    document.documentElement.style.setProperty('--viewport-height', `${vh}px`);
    
    // Also set the body and html height explicitly
    document.documentElement.style.height = `${vh}px`;
    document.body.style.height = `${vh}px`;
}

// Initial call
updateViewportHeight();

// Update on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    // Debounce the resize event
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateViewportHeight, 100);
});

// Update on orientation change
window.addEventListener('orientationchange', () => {
    // Small delay to ensure new dimensions are available
    setTimeout(updateViewportHeight, 200);
});

// Update on page load
window.addEventListener('load', updateViewportHeight);

// Optional: update on visibility change (when tab becomes active)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateViewportHeight();
    }
}); 