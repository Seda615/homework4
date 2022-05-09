import React, {Component} from "react";
import schema from "../../Schema";
import ErrorMessage from "./Error";
import Input from "./Input";


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                email: "",
                age: "",
                passport: "",
                website: "",
                phoneNumbers: "",  
            },
            errors: {}
        }
    }

    validate = (e) => {
        e.preventDefault()
        const {user} = this.state;
        const {phoneNumbers, age} = user;
        const errors = schema.validate({...user, age: +age, phoneNumbers: phoneNumbers.split(" ")});
        this.setState({errors, user: {firstName: "", email: "", age: "", passport: "", website: "", phoneNumbers: ""}});
    }

    handleChange = (e) => {
        this.setState({user: {...this.state.user,[e.target.name]: e.target.value}});
    }

    render() {
        const {user, errors} = this.state;
        const {firstName, email, age, passport, website, phoneNumbers} = user;

        return (
            <form action="#" onSubmit={this.validate} className="form">
                <Input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
                <ErrorMessage error={errors.firstName} />
                <Input type="text" name="email" value={email} onChange={this.handleChange} />
                <ErrorMessage error={errors.email} />
                <Input type="text" name="age" value={age} onChange={this.handleChange} />
                <ErrorMessage error={errors.age} />
                <Input type="text" name="passport" value={passport} onChange={this.handleChange} />
                <ErrorMessage error={errors.passport} />
                <Input type="text" name="website" value={website} onChange={this.handleChange} />
                <ErrorMessage error={errors.website} />
                <Input type="text" name="phoneNumbers" value={phoneNumbers} onChange={this.handleChange} />
                <ErrorMessage error={errors.phoneNumbers} />
                <Input type="submit" value="submit" className="button" />
            </form>
        )
    }
}

export default User