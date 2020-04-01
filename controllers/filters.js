const db = require('../dbconn');


exports.getAll = (req, res, next) => {
  db.query(`SELECT 
    id,
    start_year as "startYear",
    end_year as "endYear",
    gender,
    countries ,
    colors
    FROM filters
  `).then(({ rows: data }) => {
    res.status(200).json({
      status: 'success',
      data,
    });
  }).catch(next);
};
