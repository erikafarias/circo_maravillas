document.addEventListener("DOMContentLoaded", () => {
  fetch('funciones.json')
    .then(response => response.json())
    .then(data => {
      const { funciones, mapas } = data;

      funciones.forEach((funcion) => {
        const container = document.querySelector(`.${funcion.clase}`);
        if (container) {
          const h4 = container.querySelector("h4");
          h4.textContent = funcion.nombre;

          const funcionFechas = container.querySelector(".funcion-fechas");
          funcionFechas.innerHTML = funcion.fechas
            .map((fecha) => `<p>${fecha}</p>`)
            .join("");

          const funcionFechasDistendidas = container.querySelector(
            ".funciones-distendidas"
          );
          if (funcion.distendidas.length > 0) {
            const tituloDistendidas = document.createElement("p");
            tituloDistendidas.textContent = "Funciones distendidas:";
            funcionFechasDistendidas.appendChild(tituloDistendidas);

            funcion.distendidas.forEach((fecha) => {
              const p = document.createElement("p");
              p.textContent = fecha;
              funcionFechasDistendidas.appendChild(p);
            });
          }

          const funcionMensaje = container.querySelector(".funciones-mensaje");
          const mensaje = document.createElement("p");
          mensaje.textContent = funcion.mensaje;
          funcionMensaje.appendChild(mensaje);
        }
      });

      // Selecciona el iframe del mapa y los botones
      const iframe = document.querySelector(".mapa iframe");
      const botones = document.querySelectorAll(".direccion");

      botones.forEach((boton) => {
        boton.addEventListener("click", () => {
          const ubicacionSeleccionada = boton.getAttribute("ubicacion");

          botones.forEach((btn) => btn.classList.remove("activa")); // lo elimino de la opcion seleccionada anterior
          boton.classList.add("activa");

          const mapaSeleccionado = mapas.find(
            (mapa) => mapa.ubicacion === ubicacionSeleccionada
          );

          if (mapaSeleccionado) {
            iframe.src = mapaSeleccionado.mapa;
          }
        });
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
});