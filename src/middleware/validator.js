'use strict'

module.exports = (req,res,next) =>{
    req.query.name ? next() : next('NOPE')
}

