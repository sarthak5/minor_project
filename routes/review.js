var async = require('async');
var Company = require('../models/company');
var {ans} = require('../sentiment');
module.exports = (app) => {
    
    app.get('/review/:id', (req, res) => {
        var messg = req.flash('success');
        Company.findOne({'_id':req.params.id}, (err, data) => {
            res.render('company/review', {title: 'Company Review', user:req.user, data:data, msg: messg, hasMsg: messg.length>0});
        });
    }); 
    app.post('/review/:id', (req, res) => {
        try{
            // console.log(req.body.review);
            var analysis = ans(req.body);
            console.log(analysis);
            async.waterfall([
                function(callback){
                    Company.findOne({'_id':req.params.id}, (err, result) => {
                        callback(err, result);
                    });
                },
                
                function(result, callback){
                    Company.update({
                        '_id': req.params.id
                    },
                    {
                        $push: {companyRating: {
                            companyName: req.body.sender,
                            userFullname: req.user.fullname,
                            userRole: req.user.role,
                            companyImage: req.user.company.image,
                            userRating: req.body.clickedValue,
                            userReview: req.body.review
                        }, 
                            ratingNumber: req.body.clickedValue       
                        },
                        $inc: {ratingSum: req.body.clickedValue}
                    }, (err) => {
                        req.flash('success', 'Your review has been added.');
                        res.redirect('/review/'+req.params.id)
                    })
                }
                
            ])

            console.log("this is working fine");
            res.status(200).send({rating: analysis})
        }catch(e){
            res.status(400).send(e.message);
        }
    });
}
