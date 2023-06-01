import { NextPage } from 'next'
import React, { useEffect, useState } from "react";
import { getDocs, QuerySnapshot } from "@firebase/firestore";
import { makeArrayFromSnapshot, queryAllRecipesOrdered } from "~/helpers/firebase";

const IndexView: NextPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    retrieveAllRecipes();
  }, []);
  const retrieveAllRecipes = async () => {
    const recipesSnapshot: QuerySnapshot =
      await getDocs(queryAllRecipesOrdered);
    const recipesFromDb = makeArrayFromSnapshot(recipesSnapshot);
    console.log('recipesFromDb', recipesFromDb);
    setRecipes(recipesFromDb);
  }
  return (
    <h1>Index View</h1>
  );
}

export default IndexView
