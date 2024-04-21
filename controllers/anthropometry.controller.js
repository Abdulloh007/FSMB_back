const {Anthropometry} = require("../models/index.model");

async function createAnthropometry(req, res) {
  try {
    const { weight, height, shoes, armor, head, helmet } = req.body;
    const userId = req.user.id;

    const existingAnthropometry = await Anthropometry.findOne({
      where: { userId: userId },
    });

    if (existingAnthropometry) {
      return res.status(400).json({ error: "Антропометрия уже существует" });
    }

    const newAnthropometry = await Anthropometry.create({
      userId,
      weight,
      height,
      shoes,
      armor,
      head,
      helmet,
    });

    res.status(201).json({ message: "Антропометрия успешно создана" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateAnthropometry(req, res) {
  try {
    const userId = req.user.id;
    const { weight, height, shoes, armor, head, helmet } = req.body;

    const existingAnthropometry = await Anthropometry.findOne({
      where: { userId: userId },
    });

    if (!existingAnthropometry) {
      return res.status(404).json({ error: "Антропометрия не найдена" });
    }

    await existingAnthropometry.update({
      weight,
      height,
      shoes,
      armor,
      head,
      helmet,
    });

    res.status(200).json({ message: "Антропометрия успешно обновлена" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAnthropometry(req, res) {
  try {
    const userId = req.user.id;

    const anthropometry = await Anthropometry.findOne({
      where: { userId: userId },
    });

    if (!anthropometry) {
      return res.status(404).json({ error: "Антропометрия не найдена" });
    }

    res.status(200).json(anthropometry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
  createAnthropometry,
  updateAnthropometry,
  getAnthropometry,
};
