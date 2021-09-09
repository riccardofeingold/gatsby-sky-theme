import React from "react";
import addToMailchimp from 'gatsby-plugin-mailchimp';

class SubscribeForm extends React.Component {
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
                    onSubmit={this.handleSubmit.bind(this)}
                >
                    <div className="container pb-3" style={{maxWidth: `1040px`}}>
                        <h2 className="text-center py-3">Sign up for more like this.</h2>
                        <div className="row">
                            <div className="col-lg">
                                <p style={{color: `#3D4661`}}>Join a growing community of more than 120,000 (🤯) friendly readers. Every Sunday I share actionable productivity tips, practical life advice, and high-quality insights from across the web, directly to your inbox.</p>
                            </div>

                            <div className="col-lg">
                                <div className="input-group mb-3 container">
                                    <input type="email" name="email" className="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="button-addon2" value={this.state.email} onChange={this.handleInputChange}/>
                                    <button className="btn btn-primary" type="submit" id="button-addon2">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SubscribeForm