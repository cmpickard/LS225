/* eslint-disable max-lines-per-function */
let _ = function(element) {
  let obj = {
    first() {
      return element[0];
    },

    last() {
      return element[element.length - 1];
    },

    without(...vals) {
      let copy = [];
      for (let idx = 0; idx < element.length; idx++) {
        if (!vals.includes(element[idx])) copy.push(element[idx]);
      }

      return copy;
    },

    lastIndexOf(val) {
      let found = -1;
      for (let idx = element.length - 1; idx > -1; idx--) {
        if (element[idx] === val) {
          found = idx;
          return found;
        }
      }

      return found;
    },

    sample(times = 1) {
      let vals = [];
      for (let iteration = 0; iteration < times; iteration++) {
        let randIdx = Math.floor(Math.random() * element.length);
        vals.push(element[randIdx]);
      }

      return vals.length === 1 ? vals[0] : vals;
    },

    findWhere(obj) {
      for (let idx = 0; idx < element.length; idx++) {
        let thisObj = element[idx];
        if (Object.entries(obj).every(([key, val]) => {
          return thisObj[key] === val;
        })) {
          return element[idx];
        }
      }

      return undefined;
    },

    where(obj) {
      return element.filter(currObj => {
        return Object.keys(obj).every(key => currObj[key] === obj[key]);
      });
    },

    pluck(key) {
      let matches = element.filter(obj => Object.hasOwn(obj, key));
      return matches.map(obj => obj[key]);
    },

    keys() {
      return Object.keys(element);
    },

    values() {
      return Object.values(element);
    },

    pick(...props) {
      let newObj = {};
      for (let prop of props) {
        if (Object.hasOwn(element, prop)) {
          newObj[prop] = element[prop];
        }
      }

      return newObj;
    },

    omit(...props) {
      let newObj = {};
      for (let prop in element) {
        if (!props.includes(prop)) {
          newObj[prop] = element[prop];
        }
      }

      return newObj;
    },

    has(prop) {
      return Object.hasOwn(element, prop);
    },

    isElement(obj) {
      return obj.nodeType === 1;
    },

    isArray(obj) {
      return Object.getPrototypeOf(obj) === Array.prototype;
    },

    isObject(obj) {
      return (Object.getPrototypeOf(obj) === Object.prototype ||
              obj instanceof Object);
    },

    isFunction(obj) {
      return Object.getPrototypeOf(obj) === Function.prototype;
    },

    isString(val) {
      return typeof val === 'string' ||
         Object.getPrototypeOf(val) === String.prototype;
    },

    isNumber(val) {
      return typeof val === 'number' ||
      Object.getPrototypeOf(val) === Number.prototype;
    },

    isBoolean(val) {
      return typeof val === 'boolean' ||
             Object.getPrototypeOf(val) === Boolean.prototype;
    },
  };

  return obj;
};

_.range = function range(num1, num2) {
  let nums = [];
  if (num2 === undefined) {
    for (let num = 0; num < num1; num++) {
      nums.push(num);
    }
  } else {
    for (let num = num1; num < num2; num++) {
      nums.push(num);
    }
  }

  return nums;
};

_.extend = function extend(...objs) {
  for (let idx = objs.length - 1; idx > 0; idx--) {
    let copyFrom = objs[idx];
    let copyTo = objs[idx - 1];
    for (let prop in copyFrom) {
      copyTo[prop] = copyFrom[prop];
    }
  }

  return objs[0];
};

_.isElement = function isElement(obj) {
  return obj.nodeType === 1;
};

_.isArray = function isArray(obj) {
  return Object.getPrototypeOf(obj) === Array.prototype;
};

_.isObject = function isObject(obj) {
  return (Object.getPrototypeOf(obj) === Object.prototype ||
          obj instanceof Object);
};

_.isFunction = function isFunction(obj) {
  return Object.getPrototypeOf(obj) === Function.prototype;
};

_.isString = function isString(val) {
  return typeof val === 'string' ||
         Object.getPrototypeOf(val) === String.prototype;
};

_.isNumber = function isNumber(val) {
  return typeof val === 'number' ||
         Object.getPrototypeOf(val) === Number.prototype;
};

_.isBoolean = function isBoolean(val) {
  return typeof val === 'boolean' ||
         Object.getPrototypeOf(val) === Boolean.prototype;
};

console.log(Object.hasOwn(_, 'range') === true);
console.log(_.isObject([]));