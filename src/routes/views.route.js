import { Router } from 'express';

const route = Router();

route.get('/', (req, res) => {
  res.render('index');
});

route.get('/mensaje', (req, res) => {
  res.render('mensaje');
});

export default route;
