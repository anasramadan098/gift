const audio = new Audio('assets/music-bg.mp3');
audio.volume = 0.8;
audio.loop = true;

const video = document.querySelector('video');
const startBtn = document.querySelector('.start-btn');

const loveSentences = [
    "You are the most beautiful chapter in my life.",
    "Every moment with you feels like a dream come true.",
    "My love for you grows stronger with every heartbeat.",
    "You are my today, my tomorrow, and my forever.",
]


document.querySelector('#book-text').textContent = loveSentences[0];


function safeQuery(selector) {
    return document.querySelector(selector);
}


function startGift() {
    if (startBtn) startBtn.remove();

    safeQuery('.holder').style.display = 'flex';
    safeQuery('.start').style.display = 'block';

    video.src = 'assets/love bg.mp4';

    const textEle = safeQuery('.start-text');
    const words = ['3', '2', '1', 'HAPPY', 'BIRTH', 'DAY', 'TO', 'My Love'];

    let index = 0;
    function showNextWord() {
        if (index < words.length) {
            const word = words[index];
            textEle.style.transform = 'translate(-50%, -50%) scale(0)';
            setTimeout(() => {
                textEle.textContent = word;
                textEle.style.transform = 'translate(-50%, -50%) scale(1)';
                index++;
                setTimeout(showNextWord, 1200);
            }, 150);
        } else {
            startSecond();
        }
    }
    showNextWord();

    function startSecond() {
        safeQuery('.start').style.display = 'none';
        safeQuery('.second').style.display = 'block';

        video.src = 'assets/universe.mp4';
        video.playbackRate = 0.5;

        setTimeout(() => {
            safeQuery('.second').style.display = 'none';
            safeQuery('.third').style.display = 'block';
            intilizeSwiper();
            typeAnimation(loveSentences[0]);
        }, 5000);
    }
}

// If no start button exists, start immediately.
document.addEventListener('DOMContentLoaded', () => {
    if (!startBtn) {
        startGift();
    }
});

if (startBtn) {
    startBtn.addEventListener('click', () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }

        audio.play();
        startGift();
    });
}


function intilizeSwiper() {
    var swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
        on: {
                slideChange: function () {
                    onSlideChanged(this.activeIndex);
                },
            },
    });
}

function onSlideChanged(index) {

    typeAnimation(loveSentences[index]);

}

function typeAnimation(text) {
    const p = document.querySelector('#book-text');
    p.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            p.textContent += text[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}


