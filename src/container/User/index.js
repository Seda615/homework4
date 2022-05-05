import React, {Component} from "react";
import schema from "../../Schema";
import ErrorMessage from "./Error";

// TODO: add ErrorMessage

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            email: "",
            age: "",
            passport: "",
            website: "",
            phoneNumbers: "",
            errors: {}
        }
    }

    validate = (e) => {
        e.preventDefault()
        const {firstName, email, age, passport, website, phoneNumbers} = this.state;
        const errors = schema.validate({firstName, email, age, passport, website, phoneNumbers: phoneNumbers.split(" ")});
        this.setState({errors});
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {

        const {firstname, email, age, passport, website, phoneNumbers, errors} = this.state;


        return (
            <form action="#" onSubmit={this.validate} className="form">
                <label>Firstname</label>
                <input type="text" name="firstName" value={firstname} onChange={this.handleChange} />
                <ErrorMessage error={errors.firstName} />
                <label>Email</label>
                <input type="text" name="email" value={email} onChange={this.handleChange} />
                <ErrorMessage error={errors.email} />
                <label>Age</label>
                <input type="text" name="age" value={age} onChange={(e) => this.setState({age: +e.target.value})} />
                <ErrorMessage error={errors.age} />
                <label>Passport</label>
                <input type="text" name="passport" value={passport} onChange={this.handleChange} />
                <ErrorMessage error={errors.passport} />
                <label>Website</label>
                <input type="text" name="website" value={website} onChange={this.handleChange} />
                <ErrorMessage error={errors.website} />
                <label>Phone Numbers</label>
                <input type="text" name="phoneNumbers" value={phoneNumbers} onChange={this.handleChange} />
                <ErrorMessage error={errors.phoneNumbers} />
                <input type="submit" value="submit" />
            </form>
        )
    }
}

export default User