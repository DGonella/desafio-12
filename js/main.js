document.addEventListener("DOMContentLoaded", () => {
    const storedColors = JSON.parse(localStorage.getItem("colors"));
    if (storedColors) {
      colors = storedColors;
    } else {
      colors = [
        { name: "Verde Agua", code: "#9fdec0" },
        { name: "Celeste", code: "#87CEEB" },
        { name: "Marron Madera", code: "#97572B" },
        { name: "Oro", code: "#BE8C29" },
      ];
    }
  
    const select = document.getElementById("colorSelector");
    const addButton = document.getElementById("addColorButton");
    const removeButton = document.getElementById("removeColorButton");
  
    function updateColorSelect() {
      select.innerHTML = "";
      colors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color.code;
        option.textContent = color.name;
        select.appendChild(option);
      });
    }
  
    function saveColorsToLocalStorage() {
      localStorage.setItem("colors", JSON.stringify(colors));
    }
  
    addButton.addEventListener("click", () => {
      const colorNameInput = document.getElementById("colorName");
      const colorCodeInput = document.getElementById("colorCode");
  
      const colorName = colorNameInput.value;
      const colorCode = colorCodeInput.value;
  
      if (colorName && colorCode) {
        colors.push({ name: colorName, code: colorCode });
        updateColorSelect();
        saveColorsToLocalStorage(); 
  
        colorNameInput.value = "";
        colorCodeInput.value = "";
      }
    });
  
    removeButton.addEventListener("click", () => {
      const selectedColor = select.value;
      colors = colors.filter((color) => color.code !== selectedColor);
      updateColorSelect();
      saveColorsToLocalStorage();
    });

    updateColorSelect();

    select.addEventListener("change", () => {
      document.body.style.backgroundColor = select.value;
    });

    let span = document.createElement("span");
    span.style.textAlign = "center";
    span.style.display = "block";
    span.style.fontFamily = "sans-serif";
    span.innerHTML =
      '<span style="color: pink;">Temática elegida:</span> <span style="color: red;">Cocinas cottage</span>';
    document.querySelector("h1").appendChild(span);

    document.querySelectorAll("#circulos > div").forEach((circle) => {
      circle.style.backgroundColor = "white";
    });

    document.addEventListener("click", (event) => {
      if (event.target.parentElement.id === "circulos") {
        const circle = event.target;
        circle.style.backgroundColor = select.value;

        if (document.getElementById("modoSuperpuesto").checked) {
          let next = circle.nextElementSibling;
          while (next) {
            next.style.backgroundColor = select.value;
            next = next.nextElementSibling;
          }
          let prev = circle.previousElementSibling;
          while (prev) {
            prev.style.backgroundColor = select.value;
            prev = prev.previousElementSibling;
          }
        }
      }

      if (event.target.id === "resetButton") {
        document.querySelectorAll("#circulos > div").forEach((circle) => {
          circle.style.backgroundColor = "white";
        });
      }
    });

    function handleResolution() {
      const circulosContainer = document.getElementById("circulos");
      const circles = document.querySelectorAll("#circulos > div");

      if (window.innerWidth < 500) {
        let grayShade = 200;
        circles.forEach((circle) => {
          circle.style.backgroundColor = `rgb(${grayShade}, ${grayShade}, ${grayShade})`;
          grayShade -= 50;
        });
  
        circulosContainer.classList.add("resolucion-baja");
        select.disabled = true;
        document.getElementById("modoSuperpuesto").disabled = true;
      } else {

        circles.forEach((circle) => {
          circle.style.backgroundColor = "white";
        });
        circulosContainer.classList.remove("resolucion-baja");
        select.disabled = false;
        document.getElementById("modoSuperpuesto").disabled = false;
      }
    }
  
    window.addEventListener("resize", handleResolution);

    handleResolution();
  });