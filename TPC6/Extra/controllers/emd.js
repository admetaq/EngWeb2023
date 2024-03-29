var Exame = require('../models/emd')

// Exame list
module.exports.list = () => {
    return Exame.find().sort({ dataEMD: -1 })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.modalidades = () => {
    return Exame.distinct("modalidade", {}).sort()
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}



module.exports.atletas = () => {
    return Exame.aggregate([
        {
            $project: {
                nome: {
                    $concat: ["$nome.primeiro", " ", "$nome.último"]
                },
                _id: 0
            }
        },
        {
            $sort: {
                nome: 1
            }
        }
    ])
        .then(resposta => {
            return [...new Set(resposta)]
        })
        .catch(erro => {
            return erro
        })
}

module.exports.aptos = () => {
    return Exame.find({ resultado: true }).count()
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getExame = id => {
    return Exame.findOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addExame = e => {
    return Exame.create(e)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateExame = e => {
    return Exame.updateOne({ _id: e._id }, e)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteExame = id => {
    return Exame.deleteOne({ _id: id })
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}