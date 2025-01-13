const API_KEY = "f6225674761674369c0e3cbc25da2c3c";

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const form = document.querySelector("#formulario");
const mostrar = document.querySelector(".mostrar-datos");
const datos = document.querySelector(".datos");
mostrar.classList.add("container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.querySelector("#datos").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (!response.ok) {
        datos.style.display = "flex";
        mostrar.innerHTML = `
      No Existe la ciudad, Porfavor Ingresa una ciudad Valida!
      `;
        throw new Error("No existe esa ciudad.");
      }
    })
    .then((data) => {
      const { main, sys, weather, name } = data;
      if (!main || !sys || !weather || !name) {
        datos.style.display = "flex";
        mostrar.innerHTML = `
      No existe esa ciudad
      `;
        return;
      }
      datos.style.display = "flex";
      mostrar.innerHTML = `
      <h1>${name}</h1>
      <p>Temperatura: ${Math.trunc(main.temp - 273.15)} Grados ºC</p>
      <p>Temperatura minima: ${Math.trunc(main.temp_min - 273.15)} Grados ºC</p>
      <p>Temperatura Maxima: ${Math.trunc(main.temp_max - 273.15)} Grados ºC</p>
      <p>Nubes: ${weather[0].description}</p>
    
    `;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
  form.reset();
});
