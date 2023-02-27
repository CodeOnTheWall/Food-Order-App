import { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../../hooks/use-http";
// i could do this project without a custom hook since im only sending get request and dont need cross compatability for post request
// hence in AvailableMeals.js, I could fetch the data there

const AvailableMeals = () => {
  const [mealsArray, setMealsArray] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  // giving sendRequest an alias of fetchTasks (re naming it to this file)
  // above is object destructuring from useHttp custom hook
  // App.js is mounted, useEffect below sends fetchTasks url (requestConfig) and transformedTasks (applyData) to use-http custom hook
  // in that hook, we process/transform that data, then that data gets inserted back into applyData(taskObjectData)
  // and that insertion back into transformedTasks is tasksObjectData

  // we are passing the request specific configuration and the data transformation directly to the request
  // (sendRequest)

  useEffect(() => {
    const transformedMeals = (mealsObjectData) => {
      // tasksObjectData is the expected param, i.e. {-NH0bsMyvtn5p2QJhyLg: {…}}
      // hence taskKey is the -NH0bsMyvtn5p2QJhyLg, and inside we have property of text
      const loadedMealsArray = [];
      for (const mealKey in mealsObjectData) {
        // console.log(mealKey);
        // mealKey are the ids from firebase, i.e. m1, m2, m3, m4
        loadedMealsArray.push({
          id: mealKey,
          name: mealsObjectData[mealKey].name,
          description: mealsObjectData[mealKey].description,
          price: mealsObjectData[mealKey].price,
        });
      }
      // taskKey is automatically given to us via firebase, we are renaming it id
      // looping over const of taskKey inside tasksObj, giving them an id and text
      setMealsArray(loadedMealsArray);
    };
    // dont have to add anything here to dependencies as Im not using anything external
    fetchMeals(
      {
        url: "https://react-http-5971a-default-rtdb.firebaseio.com/meals.json",
        // here is requestConfig
      },
      transformedMeals
      // here is applyData function
    );
  }, [fetchMeals]);
  // adding this as a dependency to re run this effect whenever fetchTasks changes
  // right now this would cause infinite loop because we will call fetchMeals(), which would then execute sendRequest function
  // (but now we wrap sendRequest in useCallback)
  // and that function sets some states, and the component (here) where custom hook is used, will re render
  // upon re render, which would call fetchMeals again etc - and thats the loop
  // this is why we will use useCall back inside use-http.js for sendRequest

  let mealList = <h2>No meals found</h2>;

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  if (mealsArray.length > 0) {
    mealList = (
      <ul>
        {mealsArray.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    );
  }

  let content = mealList;

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
