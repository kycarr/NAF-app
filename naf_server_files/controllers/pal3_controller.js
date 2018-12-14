const PORT = process.env.PORT || 8080;
const Item = require('../models/Item');

exports.getQuestion = async (req,res) => {
   console.log("Inside Pal3 route");
   let { questionId } = req.body;
   const question = await Item.find({_id: questionId});
   //return the session ID from here
   console.log(question);
   res.status(200).json({
    question: question,
   });
}