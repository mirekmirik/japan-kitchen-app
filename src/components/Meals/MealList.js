import React, { useEffect, useState, useCallback } from "react";
import styles from "./MealList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import Spinner from "../../Spinner/Spinner";


const MealList = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpErrorMessage, setIsHttpErrorMessage] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      const response = await fetch('https://jokes-app-d2918-default-rtdb.europe-west1.firebasedatabase.app/meals.json')

      if (!response.ok) {
        throw new Error('Что-то пошло не так...')
      }

      const data = await response.json()
      console.log(data)
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch((err) => {
      setIsLoading(false)
      setIsHttpErrorMessage(err.message)
    })


  }, [])


  if (isLoading) {
    return <Spinner />
  }

  if (httpErrorMessage) {
    return (
      <section className={styles['text-error']}>
        <p>{httpErrorMessage}</p>
      </section>
    )
  }

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default MealList;
