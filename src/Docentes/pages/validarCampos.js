//metodo para validar campos
export const validarCampos = (...campos) => {
  let formularioCompleto = true;
  //Para cada campo vamos a validarlo
  campos.forEach((campo) => {
    if ((campo.value = "")) {
      formularioCompleto = false;
      return false;
    }
    else{

    }
  });
  if(formularioCompleto){
    return true;
  }
};
