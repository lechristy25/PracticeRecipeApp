import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from "./Recipe";

const App = () => {
  const API_KEY = "94d828b76443ea361568e3ff8c7f910f";
  const API_ID = "7a239ed8";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar " type="text" onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>

      </form>
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}/>
      ))};
    </div>
  );
};

export default App;
