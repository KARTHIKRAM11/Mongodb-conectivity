const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
    height : Number,
    weight : Number,
    bmi : Number,
    category : String 
});

const bmimodel = mongoose.model('bmiModel' , bmiSchema);

module.exports = bmimodel;