import React from "react"
import MealList from "./MealList"
import Promotext from "./Promotext"

const Meals = (props) => {
    return (
        <React.Fragment>
            <Promotext/>
            <MealList/>
        </React.Fragment>
    )
}


export default Meals


