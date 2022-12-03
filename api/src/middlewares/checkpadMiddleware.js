const validateBody = (req, res, next) => {
    const { body } = req;

    if (body.status === undefined) {
        return res.status(400).json({message: 'Corpo inválido'});
    }

    if (body.status === '') {
        return res.status(400).json({message: 'Propriedades vazias'});
    }

    if (!(body.status === 'Disponível' || body.status === 'Indisponível')) {
        return res.status(400).json({message: 'Status inválido'});
    }
    
    next();
};

module.exports = {
    validateBody
};