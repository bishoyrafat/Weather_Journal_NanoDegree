// global variables
const generateBtn = document.querySelector("#generate");
const showResult = document.querySelector(".myInput");

// date
let d = new Date();
let date = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// client side and server side
const showWeatherData = (apiKey) => {
  generateBtn.addEventListener("click", async () => {
    try {
      const zipCode = document.querySelector("#zip").value;
      const feelings = document.querySelector("#feelings").value;
      const temp = fetchURL(apiKey, zipCode);

      temp.then(async (tempData) => {
        const response = await fetch("/setWeatherData", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date,
            tempData,
            feelings,
          }),
        });
        console.log("tempData: " + tempData);
        bindHTMLView(tempData, feelings);
      });
    } catch (err) {
      console.log(err);
    }
  });
};

// get weather data
const fetchURL = async (apiKey, zipCode) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  console.log(res);
  const data = await res.json();
  const temp = data.main.temp;
  console.log(temp);
  return temp;
};

const getWeatherData = async (weatherPath) => {
  const nodeRes = await fetch(weatherPath);
  const finalData = await nodeRes.json();
  return finalData;
};

// ui implement
const bindHTMLView = (weatherData, feelings) => {
  const html = `<div id="entryHolder">
                      <div id="date">${date}</div>
                      <div id="temp">${weatherData} &#8451;</div>
                      <div id="content">${feelings}</div>
                </div>`;
  const entryHolder = document.getElementById("entryHolder");
  entryHolder.insertAdjacentHTML("afterbegin", html);
};

showWeatherData("5bf80c52d7c3ac2bf878fb78f695b309");
