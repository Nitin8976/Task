const mongoose = require('mongoose');
const {config} = require('dotenv')
config()
 module.exports.connection=function()
 {
 mongoose.connect(process.env.MONGODB_URL)
 .then(function()
 {
   console.log("mongo is connected")
 })
 .catch(function(err)
 {
   console.log(err+"error occurred")
 })
 }
