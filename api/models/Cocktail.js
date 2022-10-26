const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    title: String,
    amount: String
});

const CocktailSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    publish: {
        required: true,
        type: Boolean,
        default: false,
        enum: [false, true]
    },
    addedBy: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    recipe: {
        type: String,
        required: true,
    },
    ingredients: [IngredientSchema]
});

CocktailSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;