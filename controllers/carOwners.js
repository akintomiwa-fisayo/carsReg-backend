const db = require('../dbconn');


exports.findSome = (req, res, next) => {
  let filter = {};
  const resultLength = 15;
  const { filterId } = req.params;
  let { offset } = req.query;
  if (isNaN(offset)) {
    offset = 0;
  }

  const failRequest = (error, code = 400) => {
    res.status(code).json({
      status: 'error',
      error,
    });
  };

  const getFilter = () => new Promise((resolve) => {
    if (!isNaN(filterId)) {
      db.query(`
        SELECT id,
        start_year as "startYear",
        end_year as "endYear",
        gender,
        countries ,
        colors 
        FROM filters 
        WHERE id = $1`, [
        filterId,
      ]).then(({ rows: [filt] }) => {
        if (filt) {
          filter = filt;
          resolve();
        } else failRequest('Filter not found');
      }).catch(next);
    } else failRequest('Filter not found');
  });

  const getCarOwners = () => new Promise((resolve) => {
    console.log({ filter }, 'gender', filter.gender || 'null');
    db.query(`SELECT 
      id,
      first_name as "firstName",
      last_name  as "lastName",
      email,
      country,
      car_model as "carModel",
      car_model_year as "carModelYear",
      car_color as "carColor",
      gender,
      job_title as "jobTitle",
      bio
      FROM car_owners
      WHERE 
      car_model_year :: INTEGER BETWEEN $1 AND $2 
      AND CASE WHEN $3 = 'null' THEN true WHEN gender = $3 THEN true ELSE false END
      AND CASE WHEN $4 = 'null' THEN true WHEN country = ANY($4::text[]) THEN true ELSE false END
      AND CASE WHEN $5 = 'null' THEN true WHEN car_color = ANY($5::text[]) THEN true ELSE false END
      ORDER BY id
      LIMIT $6
      OFFSET $7
    `, [
      filter.startYear,
      filter.endYear,
      filter.gender || 'null',
      filter.countries || 'null',
      filter.colors || 'null',
      resultLength,
      offset,
    ]).then(({ rows: carOwners }) => {
      resolve(carOwners);
    }).catch(next);
  });


  getFilter()
    .then(getCarOwners)
    .then((carOwners) => {
      res.status(200).json({
        status: 200,
        data: {
          carOwners,
          filter,
        },
      });
    });
};
