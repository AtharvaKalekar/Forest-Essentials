// Product Image Zoom Effect
const galleryImageContainer = document.querySelector('.gallery-image-container');
const mainImage = document.getElementById('main-image');
const zoomImage = document.getElementById('zoom-image');
const zoomPanel = document.querySelector('.zoom-panel');

if (galleryImageContainer && mainImage && zoomImage && zoomPanel) {
    let isZoomed = false;

    // Update zoom image source when main image changes
    function updateZoomImage() {
        zoomImage.src = mainImage.src;
    }

    // Initialize zoom image
    updateZoomImage();

    // Mouse enter event
    galleryImageContainer.addEventListener('mouseenter', (e) => {
        isZoomed = true;
        mainImage.style.transition = 'transform 0.1s ease';
        zoomImage.style.transition = 'transform 0.1s ease';
    });

    // Mouse move event
    galleryImageContainer.addEventListener('mousemove', (e) => {
        if (!isZoomed) return;

        const rect = galleryImageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate zoom position
        const zoomX = (x / rect.width) * 100;
        const zoomY = (y / rect.height) * 100;

        // Apply transform
        mainImage.style.transform = `translate(-${zoomX}%, -${zoomY}%)`;
        zoomImage.style.transform = `translate(-${zoomX}%, -${zoomY}%)`;
    });

    // Mouse leave event
    galleryImageContainer.addEventListener('mouseleave', () => {
        isZoomed = false;
        mainImage.style.transform = 'translate(0, 0)';
        zoomImage.style.transform = 'translate(0, 0)';
        mainImage.style.transition = 'transform 0.3s ease';
        zoomImage.style.transition = 'transform 0.3s ease';
    });

    // Touch events for mobile devices
    galleryImageContainer.addEventListener('touchstart', (e) => {
        isZoomed = true;
        mainImage.style.transition = 'transform 0.1s ease';
        zoomImage.style.transition = 'transform 0.1s ease';
    });

    galleryImageContainer.addEventListener('touchmove', (e) => {
        if (!isZoomed) return;

        const rect = galleryImageContainer.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const zoomX = (x / rect.width) * 100;
        const zoomY = (y / rect.height) * 100;

        mainImage.style.transform = `translate(-${zoomX}%, -${zoomY}%)`;
        zoomImage.style.transform = `translate(-${zoomX}%, -${zoomY}%)`;
    });

    galleryImageContainer.addEventListener('touchend', () => {
        isZoomed = false;
        mainImage.style.transform = 'translate(0, 0)';
        zoomImage.style.transform = 'translate(0, 0)';
        mainImage.style.transition = 'transform 0.3s ease';
        zoomImage.style.transition = 'transform 0.3s ease';
    });

    // Update zoom image when main image changes
    mainImage.addEventListener('load', updateZoomImage);
}
