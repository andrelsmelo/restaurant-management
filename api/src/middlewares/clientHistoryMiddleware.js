const validateBody = (req, res, next) => {
    const { body } = req;

    if (body.name === undefined || body.cpf === undefined || body.phone === undefined) {
        return res.status(400).json({message: 'Corpo inválido'});
    }

    if (body.name === '' || body.cpf === '' || body.phone === '') {
        return res.status(400).json({message: 'Propriedades vazias'});
    }
    
    next();
};

module.exports = {
    validateBody
};