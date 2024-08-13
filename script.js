// Listen for the DOMContentLoaded event which fires when the HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', function() {
    generateStars(200); // Calls generateStars function with 100 stars; adjust the number as needed.
});

// Function to generate a specified number of stars.
function generateStars(numStars) {
    const sky = document.getElementById('starry-sky'); // Gets the element with the ID 'starry-sky' to append stars to.

    // Loop to create each star.
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');  // Creates a new <div> element to represent a star.
        star.id = 'star';  // Assigns the class name 'star' to the <div> for CSS styling.

        const size = Math.random() * 2 + 1;  // Generates a random size between 1px and 3px for the star.

        // Set the CSS style of the star to position it randomly within the parent element.
        star.style.left = `${Math.random() * 100}%`;  // Randomly positions the star along the horizontal axis within its parent.
        star.style.top = `${Math.random() * 100}%`;   // Randomly positions the star along the vertical axis within its parent.
        star.style.width = `${size}px`;  // Sets the width of the star.
        star.style.height = `${size}px`;  // Sets the height of the star, making it circular.

        sky.appendChild(star);  // Appends the newly created star to the 'starry-sky' element.
    }
}

