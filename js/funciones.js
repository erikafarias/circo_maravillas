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
    mensaje: "Últimas funciones",
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
      funcionMensaje.textContent = funcion.mensaje;
    }
  });
});
