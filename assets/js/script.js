const myInput = document.querySelector(".tarjeta__input");
const mySelect = document.querySelector(".tarjeta__select");
const myButton = document.querySelector(".tarjeta__button");
const myResult = document.querySelector(".tarjeta__resultado");
const baseURL = "https://mindicador.cl/api/";

//Añado un evento al botón
myButton.addEventListener("click", function () {
  let myQuery = mySelect.value;
  const apiURL = baseURL + myQuery;
  console.log(renderResult(apiURL));
});

//Crear una función para obtener los datos de la API
async function getValues(ruta) {
  const res = await fetch(ruta);
  const objValue = await res.json();
  return objValue;
}

//Crear una función para mostrar en pantalla
async function renderResult(ruta) {
  const myObj = await getValues(ruta);
  console.log(myObj.serie[0].valor);
}
