import "./App.css";
import { useEffect, useState , useRef} from "react";

function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const API_KEY = "0fc64af38132d2b4c02cf814b596ce2f";
  const APP_ID = "2fd9efce";

  const search = ()=> {
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = "";
  }
  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res.hits, "res hits");
        updateIngredientList(res.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setLoading(false);
      });
  }

  useEffect(() => {
    searchForRecipe('paneer');
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <div className="InputWrapper">
          <input ref={inputRef} placeholder="Search for recipe"/>
          <button onClick={search}>Search</button>
        </div>
        {loading && <p >Loading...</p>}
        <div className="Wrapper">
          {ingredientList.map((item , index) => {
            const {label, image, ingredientLines} = item.recipe;
            return (
              <div key={index} className="Ingredient">
                <span>{label}</span>
                <img src={image}></img>
                <div className="Steps">
                  {ingredientLines.map((step , index) => {
                    return <p key={index}>{step}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
