const { Op } = require("sequelize");
const Family = require("../models/family.model");
const User = require("../models/user.model");

const RelationshipType = {
  SPOUSE: "супруг(а)",
  CHILD: "ребенок",
  PARENT: "родитель",
  SIBLING: "брат/сестра",
  GRANDPARENT: "дедушка/бабушка",
  GRANDCHILD: "внук(иня)",
  UNCLE: "дядя",
  AUNT: "тетя",
  COUSIN: "двоюродный(ая) брат/сестра",
  NEPHEW: "племянник",
  NIECE: "племянница",
  IN_LAW: "родственник(ца) по браку",
};

async function getFamily(req, res) {
  try {
    const user = req.user;
    const families = await Family.findAll({
      where: {
        [Op.or]: [{ userId1: user.id }, { userId2: user.id }]
      }
    });
    return res.status(200).json(families);
  } catch (error) {
    return res
      .status(409)
      .json({ error: "Ошибка при получении данных о семье: " + error.message });
  }
}

async function addFamily(req, res) {
  try {
    const userId1 = req.user.id;
    const { userId2, relationship } = req.body;

    if (!Object.values(RelationshipType).includes(relationship)) {
      return res
        .status(409)
        .json({ error: "Предоставлен недопустимый тип отношений." });
    }

    const existingFamily = await Family.findOne({
      where: {
        userId1,
        userId2,
        relationship,
      },
    });

    if (existingFamily) {
      return res.status(400).json({ error: "Член семьи уже существует." });
    }

    const newFamily = await Family.create({
      userId1,
      userId2,
      relationship,
    });
    return res.status(201).json(newFamily);
  } catch (error) {
    return res
      .status(409)
      .json({ error: "Ошибка при добавлении члена семьи: " + error.message });
  }
}

async function removeFamily(req, res) {
  try {
    const userId1 = req.user.id;
    const { userId2, relationship } = req.body;

    const deletedCount = await Family.destroy({
      where: {
        userId1,
        userId2,
        relationship,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Член семьи не найден." });
    }

    return res
      .status(200)
      .json({ message: "Член семьи успешно удален." });
  } catch (error) {
    return res
      .status(409)
      .json({ error: "Ошибка при удалении члена семьи: " + error.message });
  }
}

module.exports = {
  getFamily,
  addFamily,
  removeFamily,
  RelationshipType,
};
