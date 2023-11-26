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

export const validarNumeros = (event) => {
  const teclaPresionada = event.key;
  const esNumero = /[0-9]/.test(teclaPresionada);
  const input = event.target;
  const mensaje = 'Solo se permiten números';
  const hr = document.createElement('hr')
  if (!esNumero) {
    event.preventDefault();
    if (!input.nextSibling || input.nextSibling.nodeName !== 'SPAN') {
      input.insertAdjacentHTML('afterend', `<span style="color: red; display:block;">${mensaje}</span> `);

      

    }
  } else if (input.nextSibling && input.nextSibling.nodeName === 'SPAN') {
    input.parentNode.removeChild(input.nextSibling);
    input.parentNode.style.backgroundColor = '';
  }
}


