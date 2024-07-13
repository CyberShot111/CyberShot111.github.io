
document.getElementById('spin').addEventListener('click', function() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Крутится...';

    const wheel = document.getElementById('wheel');
    const segmentAngle = 360 / 10;
    const prizeIndex = getPrizeIndexBasedOnProbability();
    const rotation = (360 * 5) + (360 - (prizeIndex * segmentAngle)); // Rotate to position the winning prize in the front

    wheel.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
    wheel.style.transform = `rotateY(${rotation}deg)`;

    setTimeout(function() {
        const prize = getPrize(prizeIndex);
        resultDiv.textContent = 'Вы выиграли: ' + prize;

        highlightPrize(prizeIndex);

        // Reset wheel position after spin
        setTimeout(function() {
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotateY(0deg)';
            clearHighlight();
            setTimeout(function() {
                wheel.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
            }, 50);
        }, 4000);
    }, 4000);
});

function getPrizeIndexBasedOnProbability() {
    const currentTime = new Date().getTime();
    const startTime = new Date('2024-07-15').getTime(); // Укажите дату начала
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    const elapsed = currentTime - startTime;

    const probabilities = [
        elapsed >= oneYear ? 0.001 : 0, // Вероятность для Приз 1 (PS5), если прошел год
        0.07, // Вероятность для Приз 2
        0.10, // Вероятность для Приз 3
        0.12, // Вероятность для Приз 5
        0.12, // Вероятность для Приз 6
        0.08, // Вероятность для Приз 7
        0.34, // Вероятность для Приз 8
        0.09, // Вероятность для Приз 9
        0.013, // Вероятность для Приз 10 (Банкрот)
    ];

    const random = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (random < cumulativeProbability) {
            return i;
        }
    }

    return 0; // Default case (shouldn't be hit due to the probabilities summing to 1)
}

function getPrize(prizeIndex) {
    const prizes = [
        'PS5',
        '+5 часов',
        '+3 часа',
        'Энергетик',
        'Сладость',
        'Чипсы',
        'КОМБО',
        'Ничья',
        '-2 часа',
        'Банкрот'
    ];
    return prizes[prizeIndex];
}

function highlightPrize(prizeIndex) {
    const segments = document.querySelectorAll('.segment');
    segments.forEach((segment, index) => {
        if (index === prizeIndex) {
            segment.classList.add('highlight');
        } else {
            segment.classList.remove('highlight');
        }
    });

    setTimeout(() => {
        clearHighlight();
    }, 3000); // Highlight for 3 seconds
}

function clearHighlight() {
    const segments = document.querySelectorAll('.segment');
    segments.forEach((segment) => {
        segment.classList.remove('highlight');
    });
}
