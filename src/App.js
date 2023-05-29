import './App.css';
import { useEffect , useState } from 'react';

function App() {
  const API_KEY = "0fc64af38132d2b4c02cf814b596ce2f";
  const APP_ID = "2fd9efce";

  useEffect(() => {
    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`
    fetch(url).then(response => {
     return response.json();
    })
    .then(res => {
      console.log("final response" , res);
    })
    .catch(err => {
      console.log("Error: " , err);
    })
  } , []);

  return (
    <div className="App">
      <header className="App-header">Hello World</header>
    </div>
  );
}

export default App;
