import React from "react";
import addToMailchimp from 'gatsby-plugin-mailchimp';
import {navigate} from 'gatsby';

const activeBtnStyleForDisableState = {
    color: "#FFF",
    opacity: 1,
}

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
        navigate('/thankyou/');
    };
    
    render() {
        return (
            <div className="container-fluid" style={{backgroundColor: `#CFE8FF`}}>
                <form
                    name="subscribeForm"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                >
                    <input type="hidden" name="form-name" value="subscribeForm" />
                    <div className="container py-3" style={{maxWidth: `1040px`}}>
                        <h2 className="text-center py-3">Sign up for more like this.</h2>
                        <div className="row">
                            <div className="col-lg">
                                <p style={{color: `#3D4661`}}>In my weekly Code Snippets 📧, I share actionable coding tips 🧑‍💻, practical life advice 🍀, as well as high-quality insights from the life of a Mechanical Engineer 🤖!</p>
                            </div>

                            <div className="col-lg">
                                <div className="input-group mb-3 container">
                                    <input type="email" name="email" className="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="button-addon2" value={this.state.email} onChange={this.handleInputChange}/>
                                    <button className={`btn btn-primary ${this.state.email ? "" : "disabled"}`} type="submit" id="button-addon2" style={activeBtnStyleForDisableState}>Sign Up</button>
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