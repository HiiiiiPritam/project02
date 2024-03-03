import express from 'express';
import { addNewCategory, getAllCategories } from '../controllers/category-controllers.js';

let router= express.Router();

router.get('/',getAllCategories);
router.post('/add',addNewCategory)

export default router