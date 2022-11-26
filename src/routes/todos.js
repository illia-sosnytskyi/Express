import express from 'express';
import * as todoController from '../controllers/todos.js';

export const router = express.Router();

router.get('/', todoController.getAll);
router.get('/:todoId', todoController.getOne);

router.post('/', todoController.add);
router.delete('/:todoId', todoController.remove);
router.put('/:todoId', todoController.update);

const hasAction = (action) => {
  return (req, res, next) => {
    if (req.query.action === action) {
      next();
    } else {
      next('route');
    }
  }
}

router.patch('/', hasAction('delete'), todoController.removeMany);
router.patch('/', hasAction('update'), todoController.updateMany);
