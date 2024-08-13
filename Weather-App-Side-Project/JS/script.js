//-----------------------------------------sidebar stuff------------------------------------------------

// Function to open the sidebar
function openNav() {
    document.getElementById("mySidebar").style.width = "250px"; // Set the width of the sidebar
    document.querySelector(".main-body").style.marginLeft = "450px"; // Shift the main content to the right
    document.querySelector(".site-header").style.marginLeft = "450px"; // Set the main content back to its original position

}

// Function to close the sidebar
function closeNav() {
    document.getElementById("mySidebar").style.width = "0"; // Set the width of the sidebar back to 0
    document.querySelector(".main-body").style.marginLeft = "0"; // Set the main content back to its original position
    document.querySelector(".site-header").style.marginLeft = "0"; // Set the main content back to its original position

}

// Get the dropdown button and the dropdown content
var dropbtn = document.querySelector('.dropbtn');
var dropdownContent = document.querySelector('.dropdown-content');

// Toggle the 'show' class on button click
dropbtn.addEventListener('click', function(event) {
    event.stopPropagation(); // This stops the click from propagating to the window
    var sidebar = document.getElementById("mySidebar");
    if (sidebar.style.width === '250px') {
        closeNav(); // Call the closeNav function if sidebar is open
    } else {
        openNav(); // Call the openNav function if sidebar is closed
    }
    dropdownContent.classList.toggle('show'); // Toggle the dropdown content
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (!dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove('show'); // Remove the show class if clicked outside
    }
});

//-----------------openweathermap api shit------------------------------------------------------------------------------------------------------------------------------

// Your OpenWeatherMap API key
var apiKey = '51754338e12aea4d7852b75f7b8a3439';  //remove <remove> to activate API key, make sure no spaces

// Define an array of coordinates for some cities in the United States
var locations = [
    { name: 'Montgomery', lat: 32.3770, lon: -86.3000, region: 'Alabama' },
    { name: 'Juneau', lat: 58.3019, lon: -134.4197, region: 'Alaska' },
    { name: 'Phoenix', lat: 33.4484, lon: -112.0740, region: 'Arizona' },
    { name: 'Little Rock', lat: 34.7465, lon: -92.2896, region: 'Arkansas' },
    { name: 'Sacramento', lat: 38.5767, lon: -121.4944, region: 'California' },
    { name: 'Denver', lat: 39.7392, lon: -104.9903, region: 'Colorado' },
    { name: 'Hartford', lat: 41.7658, lon: -72.6734, region: 'Connecticut' },
    { name: 'Dover', lat: 39.1582, lon: -75.5244, region: 'Delaware' },
    { name: 'Tallahassee', lat: 30.4383, lon: -84.2807, region: 'Florida' },
    { name: 'Atlanta', lat: 33.7490, lon: -84.3880, region: 'Georgia' },
    { name: 'Honolulu', lat: 21.3070, lon: -157.8584, region: 'Hawaii' },
    { name: 'Boise', lat: 43.6150, lon: -116.2023, region: 'Idaho' },
    { name: 'Springfield', lat: 39.7817, lon: -89.6500, region: 'Illinois' },
    { name: 'Indianapolis', lat: 39.7684, lon: -86.1581, region: 'Indiana' },
    { name: 'Des Moines', lat: 41.5868, lon: -93.6250, region: 'Iowa' },
    { name: 'Topeka', lat: 39.0473, lon: -95.6752, region: 'Kansas' },
    { name: 'Frankfort', lat: 38.2009, lon: -84.8733, region: 'Kentucky' },
    { name: 'Baton Rouge', lat: 30.4515, lon: -91.1871, region: 'Louisiana' },
    { name: 'Augusta', lat: 44.3106, lon: -69.7795, region: 'Maine' },
    { name: 'Annapolis', lat: 38.9784, lon: -76.4922, region: 'Maryland' },
    { name: 'Boston', lat: 42.3601, lon: -71.0589, region: 'Massachusetts' },
    { name: 'Lansing', lat: 42.7335, lon: -84.5555, region: 'Michigan' },
    { name: 'St. Paul', lat: 44.9537, lon: -93.0900, region: 'Minnesota' },
    { name: 'Jackson', lat: 32.2988, lon: -90.1848, region: 'Mississippi' },
    { name: 'Jefferson City', lat: 38.5767, lon: -92.1735, region: 'Missouri' },
    { name: 'Helena', lat: 46.5891, lon: -112.0391, region: 'Montana' },
    { name: 'Lincoln', lat: 40.8136, lon: -96.7026, region: 'Nebraska' },
    { name: 'Carson City', lat: 39.1638, lon: -119.7674, region: 'Nevada' },
    { name: 'Concord', lat: 43.2081, lon: -71.5376, region: 'New Hampshire' },
    { name: 'Trenton', lat: 40.2206, lon: -74.7597, region: 'New Jersey' },
    { name: 'Santa Fe', lat: 35.6860, lon: -105.9378, region: 'New Mexico' },
    { name: 'Albany', lat: 42.6526, lon: -73.7562, region: 'New York' },
    { name: 'Raleigh', lat: 35.7796, lon: -78.6382, region: 'North Carolina' },
    { name: 'Bismarck', lat: 46.8083, lon: -100.7837, region: 'North Dakota' },
    { name: 'Columbus', lat: 39.9612, lon: -82.9988, region: 'Ohio' },
    { name: 'Oklahoma City', lat: 35.4676, lon: -97.5164, region: 'Oklahoma' },
    { name: 'Salem', lat: 44.9429, lon: -123.0351, region: 'Oregon' },
    { name: 'Harrisburg', lat: 40.2732, lon: -76.8867, region: 'Pennsylvania' },
    { name: 'Providence', lat: 41.8240, lon: -71.4128, region: 'Rhode Island' },
    { name: 'Columbia', lat: 34.0007, lon: -81.0348, region: 'South Carolina' },
    { name: 'Pierre', lat: 44.3683, lon: -100.3510, region: 'South Dakota' },
    { name: 'Nashville', lat: 36.1627, lon: -86.7816, region: 'Tennessee' },
    { name: 'Austin', lat: 30.2672, lon: -97.7431, region: 'Texas' },
    { name: 'Salt Lake City', lat: 40.7608, lon: -111.8910, region: 'Utah' },
    { name: 'Montpelier', lat: 44.2601, lon: -72.5754, region: 'Vermont' },
    { name: 'Richmond', lat: 37.5407, lon: -77.4360, region: 'Virginia' },
    { name: 'Olympia', lat: 47.0379, lon: -122.9007, region: 'Washington' },
    { name: 'Charleston', lat: 38.3498, lon: -81.6326, region: 'West Virginia' },
    { name: 'Madison', lat: 43.0731, lon: -89.4012, region: 'Wisconsin' },
    { name: 'Cheyenne', lat: 41.1400, lon: -104.8202, region: 'Wyoming' },
    { name: 'Victoria', lat: 48.4284, lon: -123.3656, region: 'British Columbia' },
    { name: 'Edmonton', lat: 53.5461, lon: -113.4938, region: 'Alberta' },
    { name: 'Regina', lat: 50.4452, lon: -104.6189, region: 'Saskatchewan' },
    { name: 'Winnipeg', lat: 49.8951, lon: -97.1384, region: 'Manitoba' },
    { name: 'Toronto', lat: 43.6532, lon: -79.3832, region: 'Ontario' },
    { name: 'Quebec City', lat: 46.8139, lon: -71.2082, region: 'Quebec' },
    { name: 'Fredericton', lat: 45.9636, lon: -66.6431, region: 'New Brunswick' },
    { name: 'Halifax', lat: 44.6488, lon: -63.5752, region: 'Nova Scotia' },
    { name: 'Charlottetown', lat: 46.2382, lon: -63.1311, region: 'Prince Edward Island' },
    { name: 'St. John\'s', lat: 47.5615, lon: -52.7126, region: 'Newfoundland and Labrador' },
    { name: 'Yellowknife', lat: 62.4539, lon: -114.3718, region: 'Northwest Territories' },
    { name: 'Iqaluit', lat: 63.7467, lon: -68.5166, region: 'Nunavut' },
    { name: 'Whitehorse', lat: 60.7212, lon: -135.0568, region: 'Yukon' }
];

locations.sort((a, b) => a.name.localeCompare(b.name));

// Add the cities to the dropdown menus
var citySelects = document.querySelectorAll('.city-select');
citySelects.forEach(citySelect => {
    locations.forEach(location => {
        var option = document.createElement('option');
        option.value = location.name;
        option.textContent = location.name;
        citySelect.appendChild(option);
    });
}); 


//------------------------ first weather section stuff------------------------------------------------------------------------------------------------------------------------------

// Fetch and display the weather data for the selected city
var citySelects = document.querySelectorAll('.city-select');

// Fetch and display the weather data for the selected city
function fetchWeatherData(citySelect) {
    var location = locations.find(location => location.name === citySelect.value);

    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + location.lat + '&lon=' + location.lon + '&appid=' + apiKey;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
                // Log the entire response to the console
                console.log('Response:', data);

                // Convert the temperature to Celsius
                var tempCelsius = data.main.temp - 273.15;

                // Insert the weather data into the HTML
                var parentDiv = citySelect.closest('.quick-weather, .weather-compare');
                parentDiv.querySelector('.temperature').textContent = tempCelsius.toFixed(2) + '°C';
                parentDiv.querySelector('.city-name').textContent = data.name + ', ' + location.region;
                parentDiv.querySelector('.weather-details').textContent = data.weather[0].description;

                // Insert the additional weather data into the HTML
                var currentTemperature = parentDiv.querySelector('.current-temperature');
                var currentPrecipitation = parentDiv.querySelector('.current-precipitation');
                var currentHumidity = parentDiv.querySelector('.current-humidity');
                var currentWindSpeed = parentDiv.querySelector('.current-wind-speed');
                var currentSnowFall = parentDiv.querySelector('.current-snow-fall');
                var currentVisibility = parentDiv.querySelector('.current-visibility');

                if (currentTemperature) currentTemperature.textContent = 'Current Temperature: ' + tempCelsius.toFixed(2) + '°C';
                if (currentPrecipitation) currentPrecipitation.textContent = 'Current Precipitation: ' + (data.rain ? data.rain['1h'] : 'N/A') + ' mm';
                if (currentHumidity) currentHumidity.textContent = 'Current Humidity: ' + data.main.humidity + '%';
                if (currentWindSpeed) currentWindSpeed.textContent = 'Current Wind Speed: ' + data.wind.speed + ' m/s';
                if (currentSnowFall) currentSnowFall.textContent = 'Current Snowfall: ' + (data.snow ? data.snow['1h'] : 'N/A') + ' mm';
                if (currentVisibility) currentVisibility.textContent = 'Current Visibility: ' + (data.visibility ? data.visibility : 'N/A') + ' m';
            
                // Update the last updated time
                var now = new Date();
                var hours = now.getHours();
                var minutes = now.getMinutes().toString().padStart(2, '0'); // Add a leading zero if necessary
                var seconds = now.getSeconds().toString().padStart(2, '0'); // Add a leading zero if necessary
                var amOrPm = hours < 12 ? 'AM' : 'PM';
                if (hours > 12) {
                    hours -= 12;
                } else if (hours === 0) {
                    hours = 12;
                }
                hours = hours.toString().padStart(2, '0'); // Add a leading zero if necessary
                var timeString = hours + ':' + minutes + ':' + seconds + ' ' + amOrPm;
                document.getElementById('last-updated').textContent = timeString;
})
            .catch(error => console.error('Error fetching weather data:', error));
        }



// Call the fetch function when the page loads and when the city is changed
citySelects.forEach(citySelect => {
    citySelect.addEventListener('change', function() {
        fetchWeatherData(citySelect);
    });
    fetchWeatherData(citySelect);
});

// Call the fetch function when the refresh button is clicked
document.getElementById('refresh-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the link
    citySelects.forEach(citySelect => {
        fetchWeatherData(citySelect);
    });
});



//------------------------for the weather warning map stuff------------------------------------------------------------------------------------------------------------------------------

window.onload = () => {

    const aeris = new AerisWeather('4AObWmR085y8OKftmPg8Y', 'SWRAGEif8sDRPEUCSM3xTAbQo1ZnDiroKxvktNAf');

    aeris.views().then(views => {
        const map = new views.InteractiveMap(document.getElementById('map'), {
            center: {
                lat: 40.313,
                lon: 7.207
            },
            zoom: 3,
            layers: 'flat,terrain:blend(overlay),water-depth:80:blend(multiply),alerts,admin',
            timeline: {
                from: -2 * 3600, // seconds
                to: 0 * 3600
            }
        });
        // Animation controls
        const control = document.getElementById('map-toggle-anim');
        map.on('load', () => {
        
            // update the control label based on the map animation state
            map.on('timeline:play', () => {
                control.innerHTML = 'Stop';
            });
            map.on('timeline:stop', () => {
                control.innerHTML = 'Play';
            });
            
            // toggle the animation when the play/stop button is clicked
            control.addEventListener('click', function(e) {
                e.preventDefault();
                map.timeline.toggle();
            });
        });
    });
};
//moved the marker weather alert system to a different js file, too big