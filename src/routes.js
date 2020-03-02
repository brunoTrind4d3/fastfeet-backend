import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DeliveryStatusController from './app/controller/DeliveryStatusController';
import DeliveryProblemController from './app/controller/DeliveryProblemController';
import DeliverymanController from './app/controller/DeliverymanController';
import DeliveryController from './app/controller/DeliveryController';
import FileController from './app/controller/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/deliveries', DeliveryStatusController.index);
routes.get('/deliveryman/:id/deliveries', DeliveryStatusController.show);
routes.put(
  '/deliveryman/:deliveryman_id/deliveries/:delivery_id',
  DeliveryStatusController.update
);
routes.post('/files/signature', upload.single('file'), FileController.store);
routes.post('/deliveries/:id/problems', DeliveryProblemController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen', DeliverymanController.index);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/deliveries/:id/problems', DeliveryProblemController.index);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;
