const wordElement = document.getElementById('word');
const meaningElement = document.getElementById('meaning');
const nextButton = document.getElementById('nextButton');
const tingSound = document.getElementById('tingSound');

nextButton.addEventListener('click', fetchWordMeaning);

let isFirstTime = true; // Flag to track if it's the first time clicking the button

// Your API keys
const learnerAPIKey = 'd212fcb2-c483-47c9-a4ab-b4c0c18de826';
const schoolAPIKey = 'dac573b4-d597-4141-9c3f-2d078c34c4e6';

function fetchWordMeaning() {
  const randomWordAPI = 'https://random-word-api.herokuapp.com/word';
  
  fetch(randomWordAPI)
    .then(response => response.json())
    .then(data => {
      const word = data[0];
      wordElement.textContent = word;
      
      // First try fetching from the Learner's API
      fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${learnerAPIKey}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0 && data[0].shortdef) {
            const meaning = data[0].shortdef[0];
            meaningElement.textContent = meaning;
          } else {
            // If no result from Learner's API, try the School Dictionary API
            fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${schoolAPIKey}`)
              .then(response => response.json())
              .then(data => {
                if (data.length > 0 && data[0].shortdef) {
                  const meaning = data[0].shortdef[0];
                  meaningElement.textContent = meaning;
                } else {
                  meaningElement.textContent = 'Meaning not Found';
                }
              })
              .catch(error => {
                meaningElement.textContent = 'Meaning not Found';
                console.error(error);
              });
          }
        })
        .catch(error => {
          meaningElement.textContent = 'Meaning not Found';
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });

  playTingSound();

  // Change button text after the first click
  if (isFirstTime) {
    nextButton.textContent = 'Next';
    isFirstTime = false;
  }
}

function playTingSound() {
  tingSound.currentTime = 0;
  tingSound.play();
}




// document.addEventListener('DOMContentLoaded', () => {
//   const fetchButton = document.getElementById('fetchButton');

//   fetchButton.addEventListener('mouseover', () => {
//    fetchButton.classList.add('pop');
//   });

//   fetchButton.addEventListener('mouseout', () => {
//    fetchButton.classList.remove('pop');
//   });

//   const locationInput = document.getElementById('location');
//   const resultDiv = document.getElementById('result');

//   fetchButton.addEventListener('click', async () => {
//     const location = locationInput.value.trim();
//     if (location === '') {
//       resultDiv.textContent = 'Please enter a valid location.';
//       return;
//     }

//     const url = `https://the-weather-api.p.rapidapi.com/api/weather/${location}`;
//     const options = {
//       method: 'GET',
//       headers: {
//         // 'X-RapidAPI-Key': '71bfe70ebbmshe5dc4424ca8f70bp1b067djsn9188a50f1dfd',
//         'X-RapidAPI-Key': '0d49d04fefmsha73fe217d6986acp16b424jsnf567c36a35ca',
//         'X-RapidAPI-Host': 'the-weather-api.p.rapidapi.com'
//       }
//     };
//     resultDiv.innerHTML = '<div class="loading"></div>';
//     async function fetchData() {
//       try {
//         const response = await fetch(url, options);
//         const result = await response.json(); // Parse the response as JSON
//         console.log(result);

//         // Display the fetched data on the webpage
//         resultDiv.innerHTML = `
//           <p>City: ${result.data.city}</p>
//           <p>Current Weather: ${result.data.current_weather}</p>
//           <p id="temp">Temperature: ${result.data.temp}°C</p>
//           <p>Expected Temperature: ${result.data.expected_temp}</p>
//           <p>Wind: ${result.data.wind}</p>
//           <p id="humidity">Humidity: ${result.data.humidity}</p>
//           <p>Visibility: ${result.data.visibility}</p>
//           <p>UV Index: ${result.data.uv_index}</p>
//           <p>AQI: ${result.data.aqi}</p>
//           <p id="remark">AQI Remark: ${result.data.aqi_remark}</p>
//           <p>AQI Description: ${result.data.aqi_description}</p>
//           <p>Last Update: ${result.data.last_update}</p>
//           <img src="${result.data.bg_image}" alt="Weather Image">
//         `;
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchData();
//   });
// });
