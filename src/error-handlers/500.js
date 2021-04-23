'use strict';


module.exports = (err, req, res, next) => {
  res.status(500).json({msg: `something is broke (500) error:${err}`});
}