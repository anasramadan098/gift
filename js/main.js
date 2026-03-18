const audio = new Audio('assets/music-bg.mp3');
audio.volume = .8;

// Slow down video playback
const video = document.querySelector('video');
video.playbackRate = 0.5; // Half speed, adjust if needed
video.src = 'assets/love bg.mp4';


const startBtn = document.querySelector('.start-btn');


startBtn.addEventListener('click' , () => {
    // Request full screen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Safari
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE11
        document.documentElement.msRequestFullscreen();
    }


    // Play Music
    audio.play();

    // Start Body
    startGift();


});


function startGift() {
    startBtn.remove();
    document.querySelector('.holder').style.display = 'flex';

    document.querySelector('.start').style.display = 'block';

    // First: Set Counter sequentially
    const textEle = document.querySelector('.start-text');
    const words = ['3' , '2' , '1' , 'HAPPY' , 'BIRTH' , 'DAY' , 'TO' , 'My Love'];

    let index = 0;
    function showNextWord() {
        if (index < words.length) {
            const word = words[index];
            textEle.style.transform = 'translate(-50%, -50%) scale(0)';
            setTimeout(() => {
                textEle.textContent = word;
                textEle.style.transform = 'translate(-50%, -50%) scale(1)';
                index++;
                setTimeout(showNextWord, 1000); // Wait 3 second before next word
            }, 150);
        } else {
            // Counter finished, proceed to Second
            startSecond();
        }
    }
    showNextWord();

    function startSecond() {
        // Second
        document.querySelector('.start').style.display = 'none';
        document.querySelector('.second').style.display = 'block';

        video.src = 'assets/universe.mp4';
        video.playbackRate = .5;

        setTimeout(() => {
            // Enable Third    
            document.querySelector('.second').style.display = 'none';
            document.querySelector('.third').style.display = 'flex';
            
            // Initialize book when displaying
            initializeBook();
        }, 2000);
    }
}



// Handle Book Navigation
let currentPage = 0;
let totalPages = document.querySelectorAll('.book-page').length;

function initializeBook() {
    document.getElementById('totalPages').textContent = totalPages;
    updateBookDisplay();
}

function updateBookDisplay() {
    const pages = document.querySelectorAll('.book-page');
    
    pages.forEach((page, index) => {
        page.classList.remove('active', 'prev-page', 'next-page');
        
        if (index === currentPage) {
            page.classList.add('active');
        } else if (index < currentPage) {
            page.classList.add('prev-page');
        } else {
            page.classList.add('next-page');
        }
    });
    
    document.getElementById('currentPage').textContent = currentPage + 1;
    document.getElementById('prevBtn').disabled = currentPage === 0;
    document.getElementById('nextBtn').disabled = currentPage === totalPages - 1;
}

document.getElementById('prevBtn')?.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateBookDisplay();
    }
});

document.getElementById('nextBtn')?.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateBookDisplay();
    }
});

// Initialize book when third section is shown
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.third').style.display !== 'none') {
        initializeBook();
    }
});