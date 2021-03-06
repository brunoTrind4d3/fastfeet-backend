import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll();
    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const deliveryManExits = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExits) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }
    const { id, name, email } = await Deliveryman.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      email: Yup.string().email(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);

    if (email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists' });
      }
    }
    const { name } = await deliveryman.update(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists!' });
    }
    await deliveryman.update({
      active: false,
    });

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
