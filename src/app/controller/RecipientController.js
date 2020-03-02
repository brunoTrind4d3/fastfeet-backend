import Recipient from '../models/recipients';

class RecipientController {
  async store(req, res) {
    const { name, street, number, complement, state, city, cep } = req.body;

    const recipient = await Recipient.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await recipient.update(req.body);
    return res.json({ id, name, street, number, complement, state, city, cep });
  }
}

export default new RecipientController();
