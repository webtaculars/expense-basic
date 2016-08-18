angular.module('addExpenseService',[])


.factory('Expense', function ($http) {
    var expenseFactory = {};

    expenseFactory.add = function (expenseData) {
    	console.log('asd');
        return $http.post('/api/addexpense',expenseData);
    }

    return expenseFactory;
})
