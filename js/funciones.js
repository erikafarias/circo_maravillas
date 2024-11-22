const funciones = [
  {
    clase: "funcion-fantasy",
    nombre: "Fantasy",
    fechas: [
      "Palermo 22/11",
      "Palermo 23/11",
      "Palermo 24/11",
      "Córdoba 6/12",
      "Córdoba 7/12",
      "Córdoba 8/12",
      "Mar del Plata 21/12",
      "Mar del Plata 22/12",
      "Mar del Plata 28/12",
      "Mar del Plata 29/12",
    ],
    distendidas: ["Palermo 21/11", "Mar del Plata 19/11", "Córdoba 5/12"],
    mensaje: "ÚLTIMAS FUNCIONES",
  },
  {
    clase: "funcion-fire",
    nombre: "Fire",
    fechas: [
      "Mar del Plata 3/1",
      "Mar del Plata 4/1",
      "Mar del Plata 5/1",
      "Mar del Plata 10/1",
      "Mar del Plata 11/1",
      "Mar del Plata 12/1",
      "Palermo 24/1",
      "Palermo 25/1",
      "Palermo 26/1",
      "Palermo 24/1",
      "Palermo 25/1",
      "Palermo 26/1",
    ],
    distendidas: [],
    mensaje: "PRÓXIMAMENTE MÁS FUNCIONES",
  },
  {
    clase: "funcion-love-story",
    nombre: "Love Story",
    fechas: [
      "Palermo 5/4",
      "Palermo 6/4",
      "Palermo 12/4",
      "Palermo 13/4",
      "Córdoba 26/4",
      "Córdoba 27/4",
      "Córdoba 3/5",
      "Córdoba 4/5",
    ],
    distendidas: ["Palermo 3/4", "Córdoba 24/4"],
    mensaje: "ÚLTIMAS FUNCIONES",
  },
];

const mapas = [
  {
    ubicacion: "Palermo",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.7370213798326!2d-58.42876352350519!3d-34.560213255203244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5a57fefe1ad%3A0xadc229f0dd3725c7!2sGEBA!5e0!3m2!1ses-419!2sar!4v1732240224882!5m2!1ses-419!2sar",
  },
  {
    ubicacion: "Mar del Plata",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7468.559639972063!2d-57.55064013544198!3d-38.090346414709174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584e7372d66e183%3A0x56394e9c1f34d433!2sAv.%20de%20los%20Trabajadores%206230%2C%20B7600%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1732240712812!5m2!1ses-419!2sar",
  },
  {
    ubicacion: "Cordoba",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.6187027816673!2d-64.1850350736236!3d-31.452162497983043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a2e29369f6a9%3A0x353fedceb9a4a6ef!2zSGlww7Nkcm9tbyBDw7NyZG9iYQ!5e0!3m2!1ses-419!2sar!4v1732240777707!5m2!1ses-419!2sar",
  },
];

document.addEventListener("DOMContentLoaded", () => {
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
});
