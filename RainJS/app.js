const canvas = document.querySelector('.canvas');
const lines = document.querySelectorAll('.line');
const lines2 = document.querySelectorAll('.line-2');

// Always update window's width size
let windowWidth = document.documentElement.clientWidth;
window.addEventListener('resize', calculateWindowWidth);

// Variable declaration
let baseHeight;
let newHeight;
let position;

lines.forEach(line => {
    baseHeight = 32;

    // Generate keyframe for each line
    let basePosition = 0;
    let height = document.documentElement.clientHeight;
    let keyframes = createKeyframes(200, height, basePosition);
    animate(line, keyframes, 1);
});

lines2.forEach(line => {
    baseHeight = 16;

    // Generate keyframe for each line
    let basePosition = 0;
    let height = document.documentElement.clientHeight;
    let keyframes = createKeyframes(150, height, basePosition);

    animate(line, keyframes, 2);
});

// Function to create translate keyframe rule to move
function createKeyframes(baseReduce, height, basePosition) {
    let keyframes = [];
    while (height + 100 > 0) {
        // Move each line differently
        let reduce = Math.ceil(Math.random() * baseReduce);
        basePosition += reduce;
        keyframes.push({
            transform: `translateY(${basePosition}px)`
        });
        height -= reduce;
    }

    return keyframes;
}

// Function to animate each line of rain drop
function animate(line, keyframes, type) {
    // Randomize the duration for each rain drop
    let duration = 0;
    if (type === 1)
        duration = Math.ceil(Math.random() * 1000) + 500;
    if (type === 2)
        duration = Math.ceil(Math.random() * 2000) + 500;

    // Re-animate the line, each time with different position and height
    setInterval(() => {
        let location = randomizeRainDropPosition();
        line.style.left = `${location.position}px`;
        line.style.height = `${location.height}px`;
        line.animate(keyframes, {
            duration: duration,
            easing: 'linear'
        });
    }, duration);
}

// Function to randomize line position in x-axis, and length of line (height)
function randomizeRainDropPosition() {
    let location = {};
    newHeight = Math.ceil(Math.random() * 48) + 16;
    position = Math.ceil(Math.random() * windowWidth);
    location['position'] = position;
    location['height'] = newHeight;
    return location;
}

// Function to calculate window's width
function calculateWindowWidth() {
    windowWidth = document.documentElement.clientWidth;
}