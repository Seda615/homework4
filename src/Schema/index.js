class Schema {
    constructor(valid) {
        this.valid = valid
    }

    required = (val) => {
        return val.length  !== 0;
    }

    min = (val, min) => {
        return val.length >= min;
    }

    max = (val, max) => {
        return val.length <= max;
    }

    url = (val) => {
        const validUrlRegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
        return validUrlRegExp.test(val);
    }

    email = (val) => {
        const validEmailregExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return validEmailregExp.test(val);
    }

    phone = (val) => {
        for (let i = 0; i < val.length; i++) {
            if (typeof +val !== 'number' || isNaN(val)) {
                return false
            }
        }
        return true;
    }

    string = (val) => {
        return typeof val === 'string';
    }

    number = (val) => {
        return typeof val === 'number' && !isNaN(val);
    }

    array_string = (values) => {
        if (Array.isArray(values) && values.length !== 0) {
            for (let value of values) {
                if (typeof value !== 'string') {
                    return false;
                }
            }
        } else {
            return false;
        }
        return true;
    }

    validate(payload) {

        const ErrorMessage = {};
        const names = Object.keys(this.valid);

        for (let name of names) {

            const validName = this.valid[name];
            const validators = Array.isArray(validName.validators) ? validName.validators : [validName.validators];
            const type = validName.type;
            const typeFunc = type.replace(/\[/, '_').replace(/\]/, '');

            if (this[typeFunc](payload[name])) {
                for (let validator of validators) {
                    const validArray = typeof validator === 'string' ? validator.split(':') : validator;
                    
                    if (typeof validator === 'function') {
                        const {message, validate} = validator(payload[name])

                        if (!validate()) {
                            ErrorMessage[name] = message;
                        }

                    } else {

                        if (!this[validArray[0]](payload[name], validArray[1])) {
                            const message = validName.message;
                            ErrorMessage[name] = message ? message.replace(/{min}/, validArray[1]) : `Invalide ${name}`;
                        }

                    }
                }

            } else {
                ErrorMessage[name] = `${name} must be ${type}`;
            }
        }
      return ErrorMessage;
    }
}

const passportValidator = (extra, message = 'Default error message') => {

    return {

      validate: () => {
          const passportRegexp = /^[A-Z][A-Z][0-9]/;

          return passportRegexp.test(extra)
      },

      message
    }
  }

const schema = new Schema({
    firstName: {
      type: 'string',
      validators: ['min:3'],
      message: 'The field must contain min {min} letters'
    },
    email: {
      type: 'string',
      validators: 'email'
    },
    age: {
      type: 'number',
      validators: ['required']
    },
    passport: {
      type: 'string',
      validators: ['max:9', passportValidator],
      message: 'Invalid phone inputs'
    },
    website: {
      type: 'string',
      validators: ['url']
    },
    phoneNumbers: {
      type: 'array[string]',
      validators: 'phone'
    }
  });

  export default schema