/* Global Variables */
const generateBtn = document.querySelector("#generate");
const showResult = document.querySelector(".myInput");

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const showWeatherData = (apiKey) => {
  generateBtn.addEventListener("click", async () => {
    const zipCode = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings").value;
    console.log(zipCode);

    //fetch url
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const req = fetch(url);
    const res = req.then((res) => res.json());
    const temp = await res
      .then((data) => data.main.temp)
      .catch((err) => console.log(`error occured ${err}`));
    console.log(temp);

    // client side and server side
    const response = await fetch("/setWeatherData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      // Body data type must match "Content-Type" header
      body: JSON.stringify({
        date,
        temp,
        feelings,
      }),
    });
    const nodeRes = await fetch("/getWeatherData");
    const finalData = await nodeRes.json();

    // handle temprature
    if (typeof finalData.temp == "undefined") {
      finalData.temp = "please, enter a valid zip code";
    }
    console.log(finalData.date);
    console.log(finalData.temp);
    console.log(feelings);

    // ui implement
    const html = `<div id="entryHolder">
                      <div id="date">${finalData.date}</div>
                      <div id="temp">${finalData.temp} &#8451;</div>
                      <div id="content">${feelings}</div>
                    </div>`;
    const entryHolder = document.getElementById("entryHolder");
    entryHolder.insertAdjacentHTML("afterbegin", html);
  });
};
showWeatherData("5bf80c52d7c3ac2bf878fb78f695b309");
