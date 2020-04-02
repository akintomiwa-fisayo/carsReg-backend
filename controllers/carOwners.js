const db = require('../dbconn');


exports.findSome = (req, res, next) => {
  const { filterId } = req.params;

  const failRequest = (error, code = 400) => {
    res.status(code).json({
      status: 'error',
      error,
    });
  };

  const getFilter = () => new Promise((resolve) => {
    if (!isNaN(filterId)) {
      db.query('SELECT * FROM filters WHERE id = $1', [filterId]).then(({ rows: [filter] }) => {
        if (filter) {
          resolve(filter);
        } else failRequest('Filter not found');
      }).catch(next);
    } else failRequest('Filter not found');
  });

  const getCarOwners = (filter) => new Promise((resolve) => {
    console.log('filter', filter);
    db.query(`SELECT 
      id ::INTEGER,
      first_name as "firstName",
      last_name  as "lastName",
      email,
      country,
      car_model as "carModel",
      car_model_year ::INTEGER as "carModelYear",
      car_color as "carColor",
      gender,
      job_title as "jobTitle",
      bio
      FROM car_owners
      WHERE 
      car_model_year :: INTEGER BETWEEN $1 AND $2 
      AND gender = $3 OR gender = NULL
      AND country = ANY ($4) OR $4 = NULL
      AND car_color = ANY ($5) OR $5 = NULL
    `, [
      filter.start_year,
      filter.end_year,
      filter.gender,
      filter.countries,
      filter.colors,
    ]).then(({ rows: carOwners }) => {
      resolve(carOwners);
    }).catch(next);
  });


  getFilter()
    .then(getCarOwners)
    .then((carOwners) => {
      res.status(200).json({
        status: 200,
        data: carOwners,
      });
    });
};
