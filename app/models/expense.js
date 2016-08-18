var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ExpenseSchema =new Schema({
    date: {type:String, required: true},
    category: {type:String, required: true},
    type: {type: String, required: true},
    amount: {type: Number, required: true}
});


module.exports = mongoose.model('Expense',ExpenseSchema);

