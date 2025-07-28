document.addEventListener('DOMContentLoaded', () => {
    // Get elements from the page
    const colorBoxes = document.getElementById('colorBoxes');
    const numInput = document.getElementById('numInput');
    const numValue = document.getElementById('numValue');
    const makeColorsBtn = document.getElementById('makeColorsBtn');
    const copyMsg = document.getElementById('copyMsg');

    // Function to make one random color (HEX code)
    function makeOneRandomColor() {
        const chars = '0123456789ABCDEF';
        let colorCode = '#';
        for (let i = 0; i < 6; i++) {
            colorCode += chars[Math.floor(Math.random() * 16)];
        }
        return colorCode;
    }

    // Function to make all the colors and show them
    function makeAndShowColors() {
        const howMany = parseInt(numInput.value); // Get number from slider
        const newColors = []; // List to hold our new colors

        // Loop to make 'howMany' random colors
        for (let i = 0; i < howMany; i++) {
            newColors.push(makeOneRandomColor());
        }

        // Clear old colors
        colorBoxes.innerHTML = '';

        // Add each new color to the page
        newColors.forEach(color => {
            const oneColorDiv = document.createElement('div');
            oneColorDiv.classList.add('color-block'); // Use simple class name
            oneColorDiv.style.backgroundColor = color;
            oneColorDiv.dataset.hex = color.toUpperCase(); // Store HEX to copy

            // Add the HEX code display inside the color block
            oneColorDiv.innerHTML = `
                <span class="hex-display">${color.toUpperCase()}</span>
            `;

            // When you click a color, copy its code
            oneColorDiv.addEventListener('click', () => {
                copyText(oneColorDiv.dataset.hex);
            });

            colorBoxes.appendChild(oneColorDiv);
        });
    }

    // Function to copy text to clipboard and show message
    function copyText(textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyMsg.classList.add('show'); // Show "Copied!" message
            setTimeout(() => {
                copyMsg.classList.remove('show'); // Hide after a bit
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const tempArea = document.createElement('textarea');
            tempArea.value = textToCopy;
            tempArea.style.position = 'fixed'; // Keep off-screen
            document.body.appendChild(tempArea);
            tempArea.focus();
            tempArea.select();
            try {
                document.execCommand('copy');
                copyMsg.classList.add('show');
                setTimeout(() => {
                    copyMsg.classList.remove('show');
                }, 1500);
            } catch (err) {
                console.error('Fallback: Failed to copy text: ', err);
            }
            document.body.removeChild(tempArea);
        });
    }

    // --- What happens when things are clicked/changed ---

    // When the number slider moves, just update the number display
    numInput.addEventListener('input', (e) => {
        numValue.textContent = e.target.value;
    });

    // When the "Make Random Colors" button is clicked, generate new colors
    makeColorsBtn.addEventListener('click', makeAndShowColors);

    // Make colors right when the page loads for the first time
    makeAndShowColors();
});