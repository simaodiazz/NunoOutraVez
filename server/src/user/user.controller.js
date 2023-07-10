const jwt = require('jsonwebtoken');
const { createSchematic, updateSchematic } = require('./user.schematic');
const { User } = require('./user');
const { UserDTO } = require('./user.dto');

const generateToken = (userId) => {
    const secretKey = 'JIasjBw012bjskAB'; // Substitua pela sua chave secreta
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
};

const create = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const { error } = createSchematic.validate({ name, email, password, phone });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'E-mail já cadastrado' });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            phone
        });

        const token = generateToken(newUser.id);

        return res.status(201).json({ user: newUser, token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

const findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        response.json(users.map(user => new UserDTO(user.name)));
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter usuário' });
    }
};

const find = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json(new UserDTO(user.name));
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter usuário' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const { error } = updateSchematic.validate({ name, email, phone });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        user.name = name;
        user.email = email;
        user.phone = phone;
        await user.save();

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await user.destroy();

        return res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const isPasswordValid = await user.checkPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = generateToken(user.id);

        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao efetuar login' });
    }
};

module.exports = {
    create,
    find,
    findAll,
    update,
    remove,
    login
};
