angular.module('mainController',['addExpenseService'])

.controller('MainController', function ($rootScope,$location) {
queue()
    .defer(d3.json, "/api/allexpense")
    .await(makeGraphs);

function makeGraphs(error, apiData) {
    
    var dataSet = apiData;
    var dateFormat = d3.time.format("%m/%d/%Y");
    dataSet.forEach(function(d) {
        d.date = dateFormat.parse(d.date);
                d.date.setDate(1);
        d.amount = +d.amount;
    });

    var ndx = crossfilter(dataSet);

    var date = ndx.dimension(function(d) { return d.date; });
    var category = ndx.dimension(function(d) { return d.category; });
    var type = ndx.dimension(function(d) { return d.type; });
    
    var amount  = ndx.dimension(function(d) { return d.amount; });


    var projectsByDate = date.group(); 
    var projectsByCategory = category.group(); 
    var projectsByType = type.group();
    
    var all = ndx.groupAll();

    var amount = category.group().reduceSum(function(d) {
        return d.amount;
    });

    var amount = type.group().reduceSum(function(d) {
        return d.type;
    });

    var minDate = date.bottom(1)[0].date;
    var maxDate = date.top(1)[0].date;

    var dateChart = dc.lineChart("#date-chart");
    var categoryChart = dc.rowChart("#category-chart");
    var typeChart = dc.pieChart("#type-chart");

    dateChart
        //.width(600)
        .height(220)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(date)
        .group(projectsByDate)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);

    categoryChart
        //.width(300)
        .height(220)
        .dimension(category)
        .group(projectsByCategory)
        .elasticX(true)
        .xAxis().ticks(5);

    typeChart
        .height(220)
        //.width(350)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1000)
        .dimension(type)
        .group(projectsByType);

    dc.renderAll();

};
})

.controller('AddExpenseController', function ($http,$scope,Expense) {
    var vm =this;

    vm.addExpense = function () {
        vm.message = "";
        console.log("I am called");

        Expense.add(vm.expenseData)
            .then(function (response) {
                vm.expenseData = {};
                vm.message= response.data.message;
     
                queue()
    .defer(d3.json, "/api/allexpense")
    .await(makeGraphs);

function makeGraphs(error, apiData) {
    
    var dataSet = apiData;
    var dateFormat = d3.time.format("%m/%d/%Y");
    dataSet.forEach(function(d) {
        d.date = dateFormat.parse(d.date);
                d.date.setDate(1);
        d.amount = +d.amount;
    });

    var ndx = crossfilter(dataSet);

    var date = ndx.dimension(function(d) { return d.date; });
    var category = ndx.dimension(function(d) { return d.category; });
    var type = ndx.dimension(function(d) { return d.type; });
    
    var amount  = ndx.dimension(function(d) { return d.amount; });


    var projectsByDate = date.group(); 
    var projectsByCategory = category.group(); 
    var projectsByType = type.group();
    
    var all = ndx.groupAll();

    var amount = category.group().reduceSum(function(d) {
        return d.amount;
    });

    var amount = type.group().reduceSum(function(d) {
        return d.type;
    });

    var minDate = date.bottom(1)[0].date;
    var maxDate = date.top(1)[0].date;

    var dateChart = dc.lineChart("#date-chart");
    var categoryChart = dc.rowChart("#category-chart");
    var typeChart = dc.pieChart("#type-chart");

    dateChart
        //.width(600)
        .height(220)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(date)
        .group(projectsByDate)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);

    categoryChart
        //.width(300)
        .height(220)
        .dimension(category)
        .group(projectsByCategory)
        .elasticX(true)
        .xAxis().ticks(5);

    typeChart
        .height(220)
        //.width(350)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1000)
        .dimension(type)
        .group(projectsByType);

    dc.renderAll();

};
              
            });


    }

})
