// Espera a que el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    // Intentar cargar colores desde localStorage
    const storedColors = JSON.parse(localStorage.getItem("colors"));
    if (storedColors) {
      colors = storedColors;
    } else {
      // Si no hay colores en localStorage, usar este array inicial
      colors = [
        { name: "Verde Agua", code: "#9fdec0" },
        { name: "Celeste", code: "#87CEEB" },
        { name: "Marron Madera", code: "#97572B" },
        { name: "Oro", code: "#BE8C29" },
      ];
    }
  
    // Seleccionar elementos importantes del DOM
    const select = document.getElementById("colorSelector");
    const addButton = document.getElementById("addColorButton");
    const removeButton = document.getElementById("removeColorButton");
  
    // Función para actualizar el select con los colores actuales
    function updateColorSelect() {
      select.innerHTML = "";
      colors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color.code;
        option.textContent = color.name;
        select.appendChild(option);
      });
    }
  
    // Función para guardar los colores en localStorage
    function saveColorsToLocalStorage() {
      localStorage.setItem("colors", JSON.stringify(colors));
    }
  
    // Evento para agregar un nuevo color
    addButton.addEventListener("click", () => {
      const colorNameInput = document.getElementById("colorName");
      const colorCodeInput = document.getElementById("colorCode");
  
      const colorName = colorNameInput.value;
      const colorCode = colorCodeInput.value;
  
      if (colorName && colorCode) {
        colors.push({ name: colorName, code: colorCode });
        updateColorSelect();
        saveColorsToLocalStorage(); // Guardar colores actualizados en localStorage
  
        // Vaciar los campos de entrada después de agregar el color
        colorNameInput.value = "";
        colorCodeInput.value = "";
      }
    });
  
    // Evento para eliminar un color seleccionado
    removeButton.addEventListener("click", () => {
      const selectedColor = select.value;
      colors = colors.filter((color) => color.code !== selectedColor);
      updateColorSelect();
      saveColorsToLocalStorage(); // Guardar colores actualizados en localStorage
    });
  
    // Rellenar el selector con opciones basadas en el array de colores
    updateColorSelect();
  
    // Evento para cambiar el color de fondo del cuerpo al seleccionar un color
    select.addEventListener("change", () => {
      document.body.style.backgroundColor = select.value;
    });
  
    // Crear un span para mostrar la temática elegida y añadirlo al título
    let span = document.createElement("span");
    span.style.textAlign = "center";
    span.style.display = "block";
    span.style.fontFamily = "sans-serif";
    span.innerHTML =
      '<span style="color: pink;">Temática elegida:</span> <span style="color: red;">Cocinas cottage</span>';
    document.querySelector("h1").appendChild(span);
  
    // Establecer el color de fondo inicial de los círculos a blanco
    document.querySelectorAll("#circulos > div").forEach((circle) => {
      circle.style.backgroundColor = "white";
    });
  
    // Manejar clics en los círculos y el botón de reset
    document.addEventListener("click", (event) => {
      if (event.target.parentElement.id === "circulos") {
        const circle = event.target;
        circle.style.backgroundColor = select.value;
  
        // Cambiar el color de los círculos adyacentes si el modo superpuesto está activado
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
  
      // Resetear el color de todos los círculos al clickear el botón de reset
      if (event.target.id === "resetButton") {
        document.querySelectorAll("#circulos > div").forEach((circle) => {
          circle.style.backgroundColor = "white";
        });
      }
    });
  
    // Función para manejar cambios en la resolución de la ventana
    function handleResolution() {
      const circulosContainer = document.getElementById("circulos");
      const circles = document.querySelectorAll("#circulos > div");
  
      // Cambiar el estilo en resoluciones bajas
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
        // Restablecer el estilo en resoluciones mayores
        circles.forEach((circle) => {
          circle.style.backgroundColor = "white";
        });
        circulosContainer.classList.remove("resolucion-baja");
        select.disabled = false;
        document.getElementById("modoSuperpuesto").disabled = false;
      }
    }
  
    // Agregar listener para el evento de redimensionar la ventana
    window.addEventListener("resize", handleResolution);
  
    // Inicializar el estado de los elementos al cargar la página
    handleResolution();
  });