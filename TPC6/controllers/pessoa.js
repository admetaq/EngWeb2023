var Person = require('../models/pessoa')

// Person list
module.exports.list = () => {
    return Person.find().sort({ nome: 1 })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getPerson = id => {
    return Person.findOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addPerson = e => {
    return Person.insertMany(e)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}


module.exports.updatePerson = e => {
    return Person.updateOne({ _id: e._id }, e)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deletePerson = id => {
    return Person.deleteOne({ _id: id })
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}