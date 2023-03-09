//metodo para validar campos
export const   validarCampos = (...inputs) =>{
  let inputsVacios = false;

  for (let input of inputs) {
    if (input.value.trim() === "") {
      inputsVacios = true;

      // Crear elemento <p> con mensaje de error
      const errorElement = document.createElement("p");
      errorElement.textContent = "Por favor ingresa un valor en este campo";
      errorElement.style.color = "red";
      errorElement.style.fontSize = "14px";
      errorElement.style.marginTop = "5px";

      // Insertar elemento de error después del input
      input.parentNode.insertBefore(errorElement, input.nextSibling);

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        input.parentNode.removeChild(errorElement);
      }, 3000);
    } else {
      // Ocultar el mensaje de error si el campo no está vacío
      const errorElement = input.nextSibling;
      if (errorElement && errorElement.tagName === "P") {
        input.parentNode.removeChild(errorElement);
      }
    }
  }

  if (inputsVacios) {
    console.log("Uno o más inputs están vacíos");
    return false;
  }

  console.log("Todos los inputs tienen un valor");
  return true;
}
