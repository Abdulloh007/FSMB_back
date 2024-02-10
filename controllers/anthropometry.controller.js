const Anthropometry = require("../models/anthropometry.model");

async function createAnthropometry(req, res) {
  try {
    const { weight, height, shoes, armor, head, helmet } = req.body;
    const userId = req.user.id;

    const existingAnthropometry = await Anthropometry.findOne({
      where: { userId: userId },
    });

    if (existingAnthropometry) {
      return res.status(400).json({ msg: "Антропометрия уже существует" });
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

    res.status(201).json({ msg: "Антропометрия успешно создана" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
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
      return res.status(404).json({ msg: "Антропометрия не найдена" });
    }

    await existingAnthropometry.update({
      weight,
      height,
      shoes,
      armor,
      head,
      helmet,
    });

    res.status(200).json({ msg: "Антропометрия успешно обновлена" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
async function getAnthropometry(req, res) {
  try {
    const userId = req.user.id;

    const anthropometry = await Anthropometry.findOne({
      where: { userId: userId },
    });

    if (!anthropometry) {
      return res.status(404).json({ msg: "Антропометрия не найдена" });
    }

    res.status(200).json({ anthropometry });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
module.exports = {
  createAnthropometry,
  updateAnthropometry,
  getAnthropometry,
};
