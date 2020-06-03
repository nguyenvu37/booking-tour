import React, { Component } from 'react';

class FormError extends Component {
    render() {
        return (
            <div className="text-left text-danger font-italic">
                { this.props.errorMessage }
            </div>
        );
    }
}

export default FormError;