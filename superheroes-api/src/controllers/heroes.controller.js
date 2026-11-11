const Hero = require("../models/Hero.js");

async function list(req, res){
    const movies = await Hero.findAll();
    return res.status(200).json(movies);
};

async function create(req, res){
    const {name, universe, power } = req.body;

    if (!name || !universe || !power){
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios"
        });
    }

    const hero = await Hero.create({name, universe, power})
    return res.status(201).json(hero);

}

async function getById(req, res){
    const hero = await Hero.findByPk(req.params.id);

    if (!hero){
        return res.status(404).json({
            message: "Herói não encontrado"
        });
    }

    return res.status(200).json(hero);
}

async function update(req, res){
    const {name, universe, power } = req.body;

    if (!name || !universe || !power){
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios"
        });
    }

    const hero = await Hero.findByPk(req.params.id);

    if (!hero){
        return res.status(404).json({
            message: "Herói não encontrado"
        });
    }

    await hero.update({name, universe, power});
    return res.status(200).json(hero);
}

async function patch(req, res){
    const {name, universe, power } = req.body;

    if (!name && !universe && !power){
        return res.status(400).json({
            message: "Informe ao menos um campo: nome, universo ou poder"
        });
    }

    const hero = await Hero.findByPk(req.params.id);

    if (!hero){
        return res.status(404).json({
            message: "Herói não encontrado"
        });
    }

    await hero.update({
        name: name || hero.name,
        universe: universe || hero.universe,
        power: power || hero.power
    });
    return res.status(200).json(hero);
}

async function remove(req, res){
    const hero = await Hero.findByPk(req.params.id);

    if (!hero){
        return res.status(404).json({
            message: "Herói não encontrado"
        });
    }

    await hero.destroy();
    return res.status(204).send();
}

module.exports = {
    list,
    getById,
    create,
    update,
    patch,
    remove
};
