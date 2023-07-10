const { Rented } = require("./rented");
const Joi = require("joi");
const { createSchematic, updateSchematic } = require("./rented.schematic");

// Controller para criar uma nova instância de Rented
const create = async(req, res) => {
    try {
        const { error, value } = createSchematic.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const rented = await Rented.create(value);

        return res.status(201).json(rented);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar a instância de Rented" });
    }
}

// Controller para atualizar uma instância existente de Rented
const update = async(req, res) => {
    const { id } = req.params;

    try {
        const { error, value } = updateSchematic.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const rented = await Rented.findByPk(id);

        if (!rented) {
            return res.status(404).json({ error: "Instância de Rented não encontrada" });
        }

        await rented.update(value);

        return res.status(200).json(rented);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar a instância de Rented" });
    }
}

// Controller para buscar todas as instâncias de Rented
const findAll = async(req, res) => {
    try {
        const rented = await Rented.findAll();
        return res.status(200).json(rented);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar instâncias de Rented" });
    }
}

// Controller para buscar uma instância específica de Rented
const find = async(req, res) => {
    const { id } = req.params;

    try {
        const rented = await Rented.findByPk(id);

        if (!rented) {
            return res.status(404).json({ error: "Instância de Rented não encontrada" });
        }

        return res.status(200).json(rented);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar a instância de Rented" });
    }
}

// Controller para remover uma instância de Rented
const remove = async(req, res) => {
    const { id } = req.params;

    try {
        const rented = await Rented.findByPk(id);

        if (!rented) {
            return res.status(404).json({ error: "Instância de Rented não encontrada" });
        }

        await rented.destroy();

        return res.status(200).json({ message: "Instância de Rented removida com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao remover a instância de Rented" });
    }
}

module.exports = {
    create,
    update,
    findAll,
    find,
    remove,
};
