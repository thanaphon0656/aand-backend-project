import mongoose from "mongoose";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * It returns true if the id is a valid mongoose id, and false if it's not
 * @param {string} id - The id to check
 * @returns A function that takes an id and returns a boolean
 */
const IdValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const isValidLimitAndPage = (limit: number, page: number) => {
  if (limit < 0 || page < 0) {
    return true
  }
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

const validateDataInArray = (data, field) => {
  const errors = [];

  // Initialize the validationRules object
  const validationRules = {};

  // Iterate through the fields in the `field` array and dynamically define rules for each field
  for (let index = 0; index < field.length; index++) {
    const fields = field[index];

    // Dynamically define rules for each field
    validationRules[fields] = [
      { if: (value) => value !== undefined, message: `Validation error: "${fields}" is required.` },
      { if: (value) => value !== "", message: `Validation error: "${fields}" is not allowed to be empty.` },
      { if: (value) => value !== null, message: `Validation error: "${fields}" is not allowed to be null.` },
    ];

    // Custom rules for specific fields
    if (fields === 'quantity') {
      validationRules[fields].push({
        if: (value) => typeof value === 'number',
        message: `${fields} must be a number.`,
      });
    } else if (fields === 'item_id') {
      validationRules[fields].push({
        if: (value) => typeof value === 'string',
        message: `${fields} must be a string.`,
      });
    }
  }

  // Case: "items" should be an array and should contain valid objects
  if (!data.items || !Array.isArray(data.items)) {
    errors.push({ message: '"items" must be an array.' });
  } else {
    // Iterate through each item to validate its fields dynamically
    data.items.forEach((item) => {
      Object.keys(validationRules).forEach((fields) => {
        const rules = validationRules[fields];

        // If the field is present in the item, validate it
        if (item[fields] !== undefined) {
          for (let rule of rules) {
            if (!rule.if(item[fields])) {
              errors.push({ message: rule.message });
              break; // Stop after the first failed condition
            }
          }
        } else {
          // If the field is missing, explicitly add the "is required" error
          errors.push({ message: `Validation error: "${fields}" is required.` });
        }
      });
    });
  }

  return errors;
};

export { isEmpty, IdValidId, isValidLimitAndPage, isValidEmail, validateDataInArray };
