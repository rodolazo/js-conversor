const myInput = document.querySelector(".tarjeta__input");
const mySelect = document.querySelector(".tarjeta__select");
const myButton = document.querySelector(".tarjeta__button");
const myResult = document.querySelector(".tarjeta__resultado");
const graph = document.querySelector(".graph");
const baseURL = "https://mindicador.cl/api/";
let chartInstance = null;

//Añado un evento al botón
myButton.addEventListener("click", function () {
  let myQuery = mySelect.value;
  const apiURL = baseURL + myQuery;
  console.log(renderResult(apiURL));
  renderGrafica(myQuery);
  graph.classList.remove("ocultar");
});

//Crear una función para obtener los datos de la API
async function getValues(ruta) {
  try {
    const res = await fetch(ruta);
    const objValue = await res.json();
    return objValue;
  } catch (e) {
    myResult.innerHTML = `Error en el servidor: ${e.message}`;
  }
}

//Crear una función para mostrar en pantalla
async function renderResult(ruta) {
  const myObj = await getValues(ruta);
  let conversion = Number(myInput.value) / myObj.serie[0].valor;
  conversion = conversion.toFixed(4);
  let html = `<p class="tarjeta__result">Resultado: ${conversion} ${mySelect.value}</p>`;
  myResult.innerHTML = html;
}

//GRAFICA
//Crear una función para obtener la data para nuestra gráfica
async function getAndCreateDataToChart(moneda) {
  const apiURL = baseURL + moneda;
  try {
    const res = await fetch(apiURL);
    const conversores = await res.json();
    const labels = conversores.serie.map((item) => {
      return item.fecha;
    });
    const data = conversores.serie.map((item) => {
      const magnitud = item.valor;
      return Number(magnitud);
    });

    const datasets = [
      {
        label: mySelect.value,
        borderColor: "rgb(255, 99, 132)",
        data,
      },
    ];

    return { labels, datasets };
  } catch (e) {
    alert(e.message);
  }
}

//Renderizar gráfica
async function renderGrafica(moneda) {
  const data = await getAndCreateDataToChart(moneda);
  const config = {
    type: "line",
    data,
  };

  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";

  //Elimino instancia de gráfico en el caso de que ya exista
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(myChart, config);
}
