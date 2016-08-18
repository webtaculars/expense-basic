var Expense = require('./models/expense');

module.exports = function(app) {

  //GET ALL EXPENSE DETAILS
  app.get('/api/allexpense', function(req, res) {
    Expense.find({}, {_id:0,'date':1,'category':1,'type':1,'amount':1}, function(err, allexpense) {
     if (err) 
     res.send(err);
      res.json(allexpense); 
    });
   });

  //ADD EXPENSE
  app.post('/api/addexpense',function(req,res){

      var expense = new Expense({
          date: req.body.date,
          category: req.body.category,
          type: req.body.type,
          amount:req.body.amount
      });

      expense.save(function(err){
          if(err){
              res.json({'message':'Check if there is some error.'});
              return;
          }
          res.json({
              success: true,
              message: 'Expense added'
          });
           
        });

    });

  // DELETE EXPENSE
  app.post('/api/deleteexpense',(function(req,res){
                Expense.remove({
                    date: req.body.date,
                    category: req.body.category,
                    type: req.body.type,
                    amount:req.body.amount                    
                }, function (err,response) {
                    if(err){
                        res.send(err);
                        return;
                    }
                    res.json(response);
                })
        })
  );

   // UPDATE EXPENSE AMOUNT
    /*app.post('/api/updateexpense',function(req,res){
       
     
            Expense.find({"date":req.body.date, "category":req.body.type}).update({$set:{amount:req.body.amount}},function(err,response){
                if(err){
                    res.send(err);
                    return;
                }
                res.json(response);

            })
   });*/

    app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
   });
}