const { Car } = require("./car");
const { createSchematic, updateSchematic } = require("./car.schematic");

const findAll = async(req, res) => {
    try {
        const cars = await Car.findAll();
        return res.status(200).json(cars);
    } catch (error) {
        console.error('Erro ao obter os carros:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const find = async(req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
    
        if (!car) {
          return res.status(404).json({ error: 'Carro não encontrado' });
        }
    
        return res.status(200).json(car);
    } catch (error) {
        console.error('Erro ao obter o carro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const create = async(req, res) => {
    try {
        // Validar os dados do carro usando o esquema Joi
        const { error, value } = createSchematic.validate(req.body);
    
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    
        // Criar o carro no banco de dados
        const newCar = await Car.create(value);
    
        return res.status(201).json(newCar);
    } catch (error) {
        console.error('Erro ao criar o carro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const update = async(req, res) => {
    try {
        // Validar os dados de atualização do carro usando o esquema Joi
        const { error, value } = updateSchematic.validate(req.body);
    
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    
        // Verificar se o carro existe no banco de dados
        const car = await Car.findByPk(req.params.id);
    
        if (!car) {
            return res.status(404).json({ error: 'Carro não encontrado' });
        }
    
        // Atualizar o carro no banco de dados
        await car.update(value);
    
        return res.status(200).json(car);
    } catch (error) {
        console.error('Erro ao atualizar o carro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const remove = async(req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
    
        if (!car) {
          return res.status(404).json({ error: 'Carro não encontrado' });
        }
    
        await car.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao remover o carro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    findAll,
    find,
    create,
    update,
    remove
}