class Schema {
    constructor(valid) {
        this.valid = valid
    }

    validate(payload) {

        const validEmailregExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const validUrlRegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;

        const {firstName, email, age, passport, website, phoneNumbers} = this.valid;
        const passportMessage = passport.validators[1](payload.passport);
        const passportValid = passportMessage.validate()
        const ErrorMessage = {};

        if (typeof payload.firstName !== firstName.type || payload.firstName.length < 3) {
            ErrorMessage.firstName = firstName.message;
        }

        if (!(typeof payload.email === email.type && validEmailregExp.test(payload.email))) {
            ErrorMessage.email = 'Incorect email';
        }

        if (!(typeof payload.age === age.type && payload.age.length !== 0)) {
            ErrorMessage.age = 'age is required';
        }

        if (typeof payload.passport !== passport.type || payload.passport.length > 9 || !passportValid) {
            ErrorMessage.passport = passport.message;
        }

        if (!(typeof payload.website === website.type && validUrlRegExp.test(payload.website))) {
            ErrorMessage.website = 'Incorect website';
        }
        
        if (!Array.isArray(payload.phoneNumbers)) {
            ErrorMessage.phoneNumbers = 'Invalid Phone Number'
        } else {
            for (let i = 0; i < payload.phoneNumbers.length; i++) {
                if (typeof payload.phoneNumbers[i] !== 'string') {
                    ErrorMessage.phoneNumbers = 'Invalid phone number';
                }
            }
        }
      return ErrorMessage;
    }
}

const passportValidator = (extra, message = 'Default error message') => {

    return {

      validate: () => {

          const passportRegexp = /^[A-Z][A-Z][0-9]/;

          if (passportRegexp.test(extra)) {
              return true;
          } else {
              return false;
          }
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