import React, { useEffect,useState } from "react";
import axios from 'axios';
function App() {
  const [long,setlongitude] = useState();
  const [lat, setlaitude] = useState();
  const [current,setcurrent] = useState({});
  const [city,setCity] = useState();
 
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setlongitude(position.coords.longitude);
      setlaitude(position.coords.latitude);
    });
  },[])

  const currentstatebutton = () => {
    const url1 = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=6b6892231fd564048f54266f41498803&units=metric';
    console.log("The url is " + url1); 
    axios.get(url1)
    
    .then(response => {
     const data = {
       weather: response.data.weather[0].main,
       current_weather: response.data.main.feels_like,
       temp_min: response.data.main.temp_min,
       temp_max: response.data.main.temp_max,
       humidity: response.data.main.humidity
     }
     setcurrent(data);
    console.log(typeof(current));
     // console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const input_city = () => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=6b6892231fd564048f54266f41498803&units=metric';
    axios.get(url)
    .then(response => {
      const data = {
        weather: response.data.weather[0].main,
        current_weather: response.data.main.feels_like,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
        humidity: response.data.main.humidity
      };
      setcurrent(data);
      console.log(data);
    })

  }

  return (
    <div >
    
      <div style={{   display: "flex",justifyContent: "center",alignItems: "center", paddingTop: "5%"}}>
      <button onClick={currentstatebutton}>Click me to get current weather of based on your location</button>
    </div>
 <div style={{   display: "flex",justifyContent: "center",alignItems: "center", paddingTop: "2%"}}>
    <label>Enter the City :</label>
    <div>
    <input type="text" onChange={e => setCity(e.target.value)}></input>
  </div>
  
 </div>
 <div style={{   display: "flex",justifyContent: "center",alignItems: "center", paddingTop: "2%"}}>
 <button onClick={input_city}>Get weather of User inputted City</button>
 </div>
     <div style={{   display: "flex",justifyContent: "center",alignItems: "center"}}>
     <ul>
     {
       Object.keys(current).map((key,index)  => {
         return <li key={index}>{key} : {current[key]}</li>
       })
      
     }
      </ul>
     </div>

    </div>
  );
}

export default App;
