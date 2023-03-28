const mongoose = require('mongoose')

var moradaSchema = new mongoose.Schema({
    cidade: String,
    distrito: String
}, { _id: false })

var ppSchema = new mongoose.Schema({
    party_abbr: String,
    party_name: String
}, { _id: false })

var atributosSchema = new mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String
}, { _id: false })


var pessoaSchema = new mongoose.Schema({
    _id: String,
    nome: String,
    sexo: String,
    BI: String,
    CC: String,
    idade: Number,
    morada: moradaSchema,
    profissao: String,
    partido_politico: ppSchema,
    religiao: String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    descrição: String,
    marca_carro: String,
    destinos_favoritos: [String],
    atributos: atributosSchema
}, { versionKey: false });

module.exports = mongoose.model('persons', pessoaSchema)
