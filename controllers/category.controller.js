const Category = require('../models/category.model');

async function createCategory(req, res) {
    try {
        const userId = req.user.id;
        const {
            name,
            parent
        } = req.body;

        if (!name) return res.status(400).json({ error: "Пропущено обязательное поле!" })

        const newCategory = await Category.create({
            name,
            parent,
            weightCat
        })
        res.status(200).json({ message: "Успешно создано!", data: newCategory });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Не удалось создать категорию!" })
    }
}

async function getAllCategories(req, res) {
    try {
        const {
            name,
            parent
        } = req.body;
        let filter = {};

        if (name) filter.name = name;
        if (parent) filter.parent = parent;
        

        const categories = Category.findAll({ where: filter });
        res.status(200).json({ data: categories });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Не удалось поучить категорию!" });
    }
}

async function updateCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const userId = req.user.id;
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: "Категория не найдена!" });
        }

        const {
            name,
            parent
        } = req.body;

        if (!name) return res.status(400).json({ error: "Пропущено обязательное поле!" })

        const categories = Category.update(
            {
                name,
                parent
            },
            { where: categoryId }
        );
        res.status(200).json({ message: "Успешно обновлено!" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Не удалось обновить категорию!" });
    }
}

async function deleteCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const userId = req.user.id;

        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Категория не найдена!" });
        }

        await Category.destroy({
            where: { id: categoryId },
        });

        res.status(200).json({ message: "Успешно удалено!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Не удалось удалить лига!" });
    }
}


module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}