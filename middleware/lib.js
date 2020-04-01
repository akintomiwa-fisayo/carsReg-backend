/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
// dependencies
const fs = require('fs');
const Url = require('url');
const http = require('http');
const glob = require('glob');
const strSimilarity = require('jaro-winkler');

exports.strToArr = (string) => {
  const arr = [];
  for (let i = 0; i < string.length; i += 1) {
    arr.push(string[i]);
  }

  return arr;
};

exports.strReverse = (string) => {
  const arr = exports.strToArr(`${string}`);
  return arr.reverse().join('');
};

exports.stringSimilarity = (str1, str2) => strSimilarity(str1, str2, { caseSensitive: false }) * 100;
exports.alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
exports.isEmpty = (str) => (str ? !str.trim() : true);
exports.isEmail = (str) => (!((/[a-z0-9]+@+[a-z0-9]+\.+[a-z]{3,}/i.test(str) === false || /[^a-z0-9._@]/i.test(str) === true)));
exports.countries = [
  'afghanistan',
  'albania',
  'algeria',
  'andorra',
  'angola',
  'antigua and barbuda',
  'argentina',
  'armenia',
  'australia',
  'austria',
  'azerbaijan',
  'bahamas',
  'bahrain',
  'bangladesh',
  'barbados',
  'belarus',
  'belgium',
  'belize',
  'benin',
  'bhutan',
  'bolivia',
  'bosnia and herzegovina',
  'botswana',
  'brazil',
  'brunei',
  'bulgaria',
  'burkina faso',
  'burundi',
  'cote d ivoire',
  'cabo verde',
  'cambodia',
  'cameroon',
  'canada',
  'central african republic',
  'chad',
  'chile',
  'china',
  'colombia',
  'comoros',
  'congo',
  'costa rica',
  'croatia',
  'cuba',
  'cyprus',
  'czech republic',
  'democratic republic of the congo',
  'denmark',
  'djibouti',
  'dominica',
  'dominican republic',
  'ecuador',
  'egypt',
  'el salvador',
  'equatorial guinea',
  'eritrea',
  'estonia',
  'ethiopia',
  'fiji',
  'finland',
  'france',
  'gabon',
  'gambia',
  'georgia',
  'germany',
  'ghana',
  'greece',
  'grenada',
  'guatemala',
  'guinea',
  'guineabissau',
  'guyana',
  'haiti',
  'holy see',
  'honduras',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'iran',
  'iraq',
  'ireland',
  'israel',
  'italy',
  'jamaica',
  'japan',
  'jordan',
  'kazakhstan',
  'kenya',
  'kiribati',
  'kuwait',
  'kyrgyzstan',
  'laos',
  'latvia',
  'lebanon',
  'lesotho',
  'liberia',
  'libya',
  'liechtenstein',
  'lithuania',
  'luxembourg',
  'macedonia',
  'madagascar',
  'malawi',
  'malaysia',
  'maldives',
  'mali',
  'malta',
  'marshall islands',
  'mauritania',
  'mauritius',
  'mexico',
  'micronesia',
  'moldova',
  'monaco',
  'mongolia',
  'montenegro',
  'morocco',
  'mozambique',
  'myanmar',
  'namibia',
  'nauru',
  'nepal',
  'netherlands',
  'new zealand',
  'nicaragua',
  'niger',
  'nigeria',
  'north korea',
  'norway',
  'oman',
  'pakistan',
  'palau',
  'palestine state',
  'panama',
  'papua new guinea',
  'paraguay',
  'peru',
  'philippines',
  'poland',
  'portugal',
  'qatar',
  'romania',
  'russia',
  'rwanda',
  'saint kitts and nevis',
  'saint lucia',
  'saint vincent and the grenadines',
  'samoa',
  'san marino',
  'sao tome and principe',
  'saudi arabia',
  'senegal',
  'serbia',
  'seychelles',
  'sierra leone',
  'singapore',
  'slovakia',
  'slovenia',
  'solomon islands',
  'somalia',
  'south africa',
  'south korea',
  'south sudan',
  'spain',
  'sri lanka',
  'sudan',
  'suriname',
  'swaziland',
  'sweden',
  'switzerland',
  'syria',
  'tajikistan',
  'tanzania',
  'thailand',
  'timorleste',
  'togo',
  'tonga',
  'trinidad and tobago',
  'tunisia',
  'turkey',
  'turkmenistan',
  'tuvalu',
  'uganda',
  'ukraine',
  'united arab emirates',
  'united kingdom',
  'united states of america',
  'uruguay',
  'uzbekistan',
  'vanuatu',
  'venezuela',
  'viet nam',
  'yemen',
  'zambia',
  'zimbabwe',
];

exports.envalueString = (string, rep) => {
  let returnee = '';
  let test = false;
  if (rep === undefined) {
    rep = '';
  }

  for (let i = 0; i < string.length; i++) {
    if (string[i] === ' ') {
      test = true;
    } else if (test) {
      if (rep === '_') {
        returnee += `_${string[i]}`;
      } else if (rep === '-') {
        returnee += `-${string[i]}`;
      } else {
        returnee += string[i].toUpperCase();
      }

      test = false;
    } else {
      returnee += string[i];
    }
  }

  return returnee;
};
exports.isUpperCase = (v) => (!!(v.toUpperCase() !== v.toLowerCase() && v === v.toUpperCase()));
exports.devalueString = (string) => {
  let returnee = '';
  for (let i = 0; i < string.length; i += 1) {
    if (exports.isUpperCase(string[i])) {
      // popMessage(string[i] + " is isUpperCase")
      returnee += ` ${string[i].toLowerCase()}`;
    } else if (string[i] === '_' || string[i] === '-') {
      returnee += ' ';
    } else {
      returnee += string[i];
    }
  }

  return returnee;
};
exports.isCountry = (country) => this.countries.indexOf(country) !== -1;
exports.randomNumb = (length = 0) => {
  const len = isNaN(length) ? 0 : length;

  let returnee = '';
  while (true) {
    if (returnee.length < len) {
      returnee += Math.floor(Math.random() * 9);
    } else break;
  }

  return returnee;
};
exports.randomLetter = (length = 0) => {
  const len = isNaN(length) ? 0 : length;
  const alph = exports.alphabets;
  let returnee = '';
  let index = null;
  while (true) {
    if (returnee.length < len) {
      index = Math.floor(Math.random() * (alph.length - 1));

      returnee += alph[index];
    } else break;
  }

  return returnee;
};
/**
 * descriptio for the motherfucker
 */
exports.randomKey = (num = 0, letter = 0, shuffle = true) => {
  let returnee = '';

  if (num > 0) {
    returnee += exports.randomNumb(num);
  }
  if (letter > 0) {
    returnee += exports.randomLetter(letter);
  }

  if (shuffle) {
    returnee = exports.shuffle(returnee);
  }

  return returnee;
};
exports.shuffle = (value) => {
  if (typeof (value) === 'string' || Array.isArray(value)) {
    const newValue = {};
    const maxIndex = value.length;
    const getRandIndex = () => {
      let randIndex = Math.floor(Math.random() * maxIndex);
      if (Object.keys(newValue).indexOf(`${randIndex}`) !== -1) {
        randIndex = getRandIndex();
      }
      return randIndex;
    };

    for (let i = 0; i < value.length; i += 1) {
      newValue[getRandIndex()] = value[i];
    }

    const Value = [];
    Object.keys(newValue).forEach((key) => {
      Value.push(newValue[key]);
    });
    return typeof (value) === 'string' ? Value.join('') : Value;
  }
  return value;
};
exports.deletePath = (pathDir, callback = () => {}) => { // can delete folders and files too
  // NEEED TO HANDLE RETRIES FOR WHEN FILE OR FOLDER DOESNT DELETE ON FIRST TRY
  fs.stat(pathDir, (error, pathStat) => {
    if (error) {
      callback(error);
    } else if (pathStat.isDirectory()) {
      // Get all files in directory
      glob(`${pathDir}/*`, {}, (err, files) => {
        if (err) {
          callback(err);
        } else {
          const filesLength = files.length - 1; // <== files length (index based)
          let counter = -1;
          const deleteDirs = () => (new Promise((resolve) => { // <== Delete all contents found
            counter++;
            if (counter <= filesLength) {
              exports.deletePath(files[counter], (e) => {
                if (e) {
                  callback(e);
                } else deleteDirs().then(resolve); // <== Repeat till all contents are deleted
              });
            } else resolve();
          }));
          deleteDirs().then(() => {
            // Delete initial folder after all content have been deleted
            fs.rmdir(pathDir, callback);
          });
        }
      });
    } else {
      // Treat path as file
      fs.unlink(pathDir, callback);
    }
  });
};
exports.rmdirAsync = function (path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      // Pass the error on to callback
      callback(err, []);
      return;
    }
    const wait = files.length;
    let count = 0;
    const folderDone = function (err) {
      count++;
      // If we cleaned out all the files, continue
      if (count >= wait || err) fs.rmdir(path, callback);
    };
    // Empty directory to bail early
    if (!wait) {
      folderDone();
      return;
    }
    // Remove one or more trailing slash to keep from doubling up
    path = path.replace(/\/+$/, '');
    files.forEach((file) => {
      const curPath = `${path}/${file}`;
      fs.lstat(curPath, (err, stats) => {
        if (err) {
          callback(err, []);
          return;
        }
        if (stats.isDirectory()) {
          exports.rmdirAsync(curPath, folderDone);
        } else fs.unlink(curPath, folderDone);
      });
    });
  });
};
exports.ucFirst = (value) => {
  if (isNaN(value)) {
    let newValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i === 0) {
        newValue = value[0].toUpperCase();
      } else {
        newValue += value[i];
      }
    }
    return newValue;
  }
  return value;
};
exports.lcFirst = (value) => {
  if (isNaN(value)) {
    let newValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i === 0) {
        newValue = value[0].toLowerCase();
      } else {
        newValue += value[i];
      }
    }
    return newValue;
  }
  return value;
};

exports.strNormalize = (str) => str.replace(/[\\\/:*?"<>|%]/g, '');

exports.capitalize = (word) => {
  if (isNaN(word) && !exports.isEmpty(word)) {
    let newWord = '';
    const subValue = word.split(' ');
    const subValueLength = subValue.length;
    for (let j = 0; j < subValueLength; j++) {
      const value = subValue[j];
      for (let i = 0; i < value.length; i++) {
        if (i === 0) {
          newWord += value[0].toUpperCase();
        } else {
          newWord += value[i];
        }
      }

      if (j < subValueLength) {
        newWord += ' ';
      }
    }

    return newWord;
  }
  return word;
};

/**
* Downloads a file via a url link
@param url A url to file to be downloaded
@param dest full path to file name to save the downloaded file as, if not specify and passed a falsy
 value the file will be downloaded to a tmp file, deleted on complete and return
 the <buffer> content else returns the file object
*/
exports.downloadFileUrl = (url = '', dest = '') => {
  const generateTmp = () => new Promise((resolve, reject) => {
    const ref = `~tmp-${this.randomKey(8, 10)}`;
    fs.readdir('./uploads', (error, files) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        for (let i = 0; i < files.length; i += 1) {
          const file = files[i];
          // Get file name alone
          let filename = file.split('.');
          if (filename.length > 1) filename.pop();
          filename = filename.join('.');
          if (filename === ref) generateTmp().then(resolve).catch(reject);
        }
        resolve(`./uploads/${ref}`);
      }
    });
  });

  const downloadFile = (dst) => new Promise((resolve, reject) => {
    // App variables
    const urlArr = Url.parse(url);
    // console.log('parsed url is : ', url);

    const options = {
      host: urlArr.host,
      port: 80,
      path: urlArr.pathname,
    };
    const file = fs.createWriteStream(dst);
    file.on('error', (error) => {
      file.end();
      reject(error);
    });
    file.on('open', () => {
      http.get(options, (res) => {
        res.on('data', (data) => {
          file.write(data);
        }).on('end', () => {
          file.end();
          resolve(file);
        });
      });
    });
  });

  return new Promise((resolve, reject) => {
    try {
      if (!dest || this.isEmpty(dest)) {
        // Generate a tmp file for the download
        generateTmp().then((dst) => {
          downloadFile(dst).then(() => {
            fs.readFile(dst, (error, data) => {
              if (error) {
                reject(error);
              } else {
                resolve(data);
                this.deletePath(dst);
              }
            });
          }).catch(reject);
        });
      } else {
        downloadFile(dest).then(resolve).catch(reject);
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.arrHasArr = (parent, child) => {
  for (const key of child) {
    if (parent.indexOf(key) === -1) {
      return false;
    }
  }

  return true;
};
