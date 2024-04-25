import {encoded, translations} from './data.js'

//console.log("Let's rock")
//console.log(encoded, translations)

const modifyData = () => {
  const reg = /.+Id.?/;

  const decodedFoo = (encoded, translatedObj) => {
    let decoded = [];
    [...encoded].forEach(obj => {
      const newObj = Object.assign({}, obj);;
       for (const keyObj in newObj) {
        const equal = reg.test(keyObj);   
        if (equal && keyObj !== 'groupId') {
            for (const translatedKey in translatedObj) {
             if (Number(newObj[keyObj]) === Number(translatedKey)) {
             newObj[keyObj] = translatedObj[translatedKey];
            }
           }
        }
      }

      decoded.push(newObj);
    });

   return decoded;
};

console.log('decoded:', decodedFoo(encoded, translations));

const getObjIdsList = arr => {
  let tempIds = [];

  arr.forEach(obj => {
    for (const keyObj in obj) {
      const equal = reg.test(keyObj); 
      if (equal) {
        tempIds = [...tempIds, {[keyObj]: obj[keyObj]}];
    }
   }
 });

  return tempIds;
};


 const isFieldsValuesEqual = (obj1, obj2, fields) => {
    return fields.every(field => obj1[field] === obj2[field]);
 };
 
 const getUniqueIdsPair = objects => {
  let tempIdKeys = [];
  objects.forEach(obj => {
    for (const keyObj in obj) {
        tempIdKeys = [...tempIdKeys, keyObj];
       }
    });
    
    const uniqueIdKeys = tempIdKeys.reduce((acc, id) => {
      if (acc.includes(id)) {
        return acc;
      } else {
        return [...acc, id];
      }
    }, []);

    return objects.filter((itemObj, idx, arr) =>
    idx === arr.findIndex(arrItem => isFieldsValuesEqual(arrItem, itemObj, uniqueIdKeys)));
  };

  console.log('uniqueIdsPair',  getUniqueIdsPair(getObjIdsList(encoded)));
};


modifyData();
console.log('encoded', encoded);
