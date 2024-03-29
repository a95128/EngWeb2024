var mongoose = require('mongoose')

var compositorSchema = new mongoose.Schema({
    id: String,
    nome: String,
}), {versionKey: false}

module.exports = mongoose.model('compositor', compositorSchema)