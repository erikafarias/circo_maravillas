function toggle(element) {
  const respuesta = element.nextElementSibling;
  const icono = element.querySelector("i");
  const esVisible = respuesta.style.display === "block";

  // Si está visible, lo cerramos
  if (esVisible) {
    respuesta.style.display = "none";
    icono.classList.remove("fa-chevron-up");
    icono.classList.add("fa-chevron-down");
  } else {
    document.querySelectorAll(".contenedor-respuesta").forEach((item) => {
      item.style.display = "none";
    });
    document.querySelectorAll(".boton-pregunta i").forEach((btnIcono) => {
      btnIcono.classList.remove("fa-chevron-up");
      btnIcono.classList.add("fa-chevron-down");
    });

    respuesta.style.display = "block";
    icono.classList.remove("fa-chevron-down");
    icono.classList.add("fa-chevron-up");
  }
}
