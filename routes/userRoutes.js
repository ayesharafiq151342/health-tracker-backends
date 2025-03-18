import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getData, Status_check } from '../controller/userController.js';
import { createExercise, editExercise, deleteExercise ,getExercises  } from '../controller/exerciseController.js';

import { createRecord, editRecord, deleteRecord ,getRecords } from '../controller/recordController.js';
import { createMeal, editMeal, deleteMeal , Meal} from '../controller/mealController.js';

const userRoutes = express.Router();

// Middleware for authentication
userRoutes.get('/data', userAuth, getData);
userRoutes.put('/update-status', Status_check);
//Exercise Routes 

userRoutes.post('/create-exercise', userAuth, createExercise);
userRoutes.get('/exercises', userAuth, getExercises);
userRoutes.put('/edit-exercise/:id', userAuth, editExercise);
userRoutes.delete('/delete-exercise/:id', userAuth, deleteExercise);

// Medical Records 
userRoutes.get('/get-records', userAuth, getRecords);
userRoutes.post('/create-record', userAuth, createRecord);
userRoutes.put('/edit-record/:id', userAuth, editRecord);
userRoutes.delete('/delete-record/:id', userAuth, deleteRecord);



userRoutes.get("/meals", userAuth, Meal); // Get meals
userRoutes.post("/create-meal",userAuth, createMeal); // Create meal
userRoutes.put("/edit-meal/:id", userAuth, editMeal); // Edit meal
userRoutes.delete("/delete-meal/:id", userAuth, deleteMeal); 
export default userRoutes;
