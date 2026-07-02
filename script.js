// 3D Tilt effektini ishga tushirish
VanillaTilt.init(document.querySelector(".card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Havo yorib o'tish (Swoosh) ovozi (Web Audio API orqali, fayl yuklab olmasdan)
function playSwoosh() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    
    // Ovoz chastotasini o'zgartirish (balanddan pastga)
    oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);

    // Ovoz balandligini o'zgartirish
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.4);
}

const card = document.querySelector('.card');

// Karta ustiga sichqoncha borganda (Hover) ovozni yoqish
card.addEventListener('mouseenter', () => {
    try {
        playSwoosh();
    } catch(e) {
        console.log("Brauzer ovozni avtomatik yoqishni chekladi.");
    }
});

// Sichqoncha olinganda ham aylanganligi uchun ovozni yoqish
card.addEventListener('mouseleave', () => {
    try {
        playSwoosh();
    } catch(e) {
        console.log("Brauzer ovozni avtomatik yoqishni chekladi.");
    }
});
