document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-contacto");

  formulario.addEventListener(
    "blur",
    (event) => {
      const campo = event.target;
      if (campo.tagName === "INPUT" || campo.tagName === "TEXTAREA") {
        if (!campo.checkValidity()) {
          campo.classList.add("invalid");
          campo.classList.add("border-red-500");
        } else {
          campo.classList.remove("invalid");
          campo.classList.remove("border-red-500");
        }
      }
    },
    true
  );

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formulario.checkValidity()) {
      event.preventDefault();
      formulario.querySelectorAll(":invalid").forEach((campo) => {
        campo.classList.add("invalid");
      });
    } else {
      const modal = document.getElementById("modal-envio");
      modal.classList.remove("hidden");
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 3000);
      document.getElementById("cerrar").addEventListener("click", () => {
        document.getElementById("modal-envio").classList.add("hidden");
      });
      document.getElementById("formulario-contacto").reset();
    }
  });
});
