const calculateTintAndShade = (hexColor, shadePercentage = 0.2) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const shadeR = Math.round(Math.max(0, r - r * shadePercentage));
    const shadeG = Math.round(Math.max(0, g - g * shadePercentage));
    const shadeB = Math.round(Math.max(0, b - b * shadePercentage));

    return {
        shade: {
            hex:
                '#' +
                [shadeR, shadeG, shadeB]
                    .map(x => x.toString(16).padStart(2, '0'))
                    .join(''),
        },
    };
};

function updateColors() {
    const colorInput = document.getElementById('colorInput').value;
    const result = calculateTintAndShade(colorInput, 0.4); // Shade at 20%

    document.getElementById('originalColor').style.backgroundColor = colorInput;
    document.getElementById('shadeColor').style.backgroundColor = result.shade.hex;

    document.getElementById('shadeHex').textContent = `Shade Hex: ${result.shade.hex}`;
}

// Initial color setup
updateColors();

document.addEventListener('DOMContentLoaded', function() {
    const calculateTintAndShade = (hexColor, shadePercentage = 0.2) => {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
    
        const shadeR = Math.round(Math.max(0, r - r * shadePercentage));
        const shadeG = Math.round(Math.max(0, g - g * shadePercentage));
        const shadeB = Math.round(Math.max(0, b - b * shadePercentage));
    
        return {
            shade: {
                hex:
                    '#' +
                    [shadeR, shadeG, shadeB]
                        .map(x => x.toString(16).padStart(2, '0'))
                        .join(''),
            },
        };
    };
    
    function updateColors() {
        const colorInput = document.getElementById('colorInput').value;
        const result = calculateTintAndShade(colorInput, 0.4); // Shade at 20%
    
        document.getElementById('originalColor').style.backgroundColor = colorInput;
        document.getElementById('shadeColor').style.backgroundColor = result.shade.hex;
    
        document.getElementById('shadeHex').textContent = `Shade Hex: ${result.shade.hex}`;
    }
    
    // Initial color setup
    updateColors();
});
