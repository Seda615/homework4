import React, {Component} from "react";

class ErrorMessage extends Component {

    render() {

        const {error} = this.props;

        return (
            <div className="red">{error}</div>
        )
    }
}

export default ErrorMessage