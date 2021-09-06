import React from "react";
import addToMailchimp from 'gatsby-plugin-mailchimp';

export default class SubscribeForm extends React.Component {
    state = {
        email: '',
        message: '',
    };
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };
    
    handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addToMailchimp(this.state.email);
        this.setState({ message: result.msg });
    };
    
    render() {
        return (
            <div className="container-fluid" style={{backgroundColor: `#CFE8FF`}}>
                <form
                    name="subscribeForm"
                    method="POST"
                    netlifyhoneypot="bot-field"
                    data-netlify="true"
                    id="subscribe-form"
                    className="subscribe-form"
                    onSubmit={this.handleSubmit}
                >
                    <h2 className="text-center py-3">Sign up for more like this.</h2>

                    <div className="container">
                        <div className="input-group mb-3 container" style={{maxWidth: `500px`}}>
                            <input type="email" name="email" className="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="button-addon2" value={this.state.email} onChange={this.handleInputChange}/>
                            <button className="btn btn-primary" type="submit" id="button-addon2" onClick={this.showThankYou}>Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
} 