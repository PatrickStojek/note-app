
    // Get the background color of the body element
    const bodyBackgroundColor = getComputedStyle(document.body).backgroundColor;

    // Set the color input value to the body background color
    const colorInput = document.querySelector('input[type="color"]');
    colorInput.value = rgbToHex(bodyBackgroundColor);

    // Function to convert RGB color to HEX format
    function rgbToHex(rgbColor) {
      // Extract RGB values (e.g., "rgb(255, 0, 0)")
      const rgbValues = rgbColor.match(/\d+/g);
      // Convert RGB to HEX format (e.g., "#FF0000")
      const hexColor = '#' + rgbValues.map(value => parseInt(value).toString(16).padStart(2, '0')).join('');
      return hexColor;
    }


    colorInput.oninput = () => {
        document.body.style.backgroundColor = colorInput.value;
    }





///here we are saving the color in the local storage 

colorInput.addEventListener('input', () => {
    localStorage.setItem('backgroundColor', colorInput.value);
});


window.addEventListener('load', () => {
    const backgroundColor = localStorage.getItem('backgroundColor');
    document.body.style.backgroundColor = backgroundColor;
    colorInput.value = backgroundColor;
}) 


///now we want to store in local storag the color of the notes that we have created. for now the note have a class of yellow-background or it wont have it. so we can use this to check if the note has a yellow background or not. if it has it we will store the color of the yellow background, if it doesnt have it we will store the color of the note. 





