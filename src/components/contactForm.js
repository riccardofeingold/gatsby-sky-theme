import React from "react";
import {navigate} from 'gatsby';

function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}
  
class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
            "form-name": form.getAttribute("name"),
            ...this.state
            })
        })
            .then(() => navigate("/success"))
            .catch(error => alert(error));
    };
    render() {
        return (
            <form 
                className="pb-4"
                method="POST"
                data-netlify="true"
                data-netlifly-honeypot="bot-field"
                name="contactForm"
                onSubmit={this.handleSubmit}
              >
                <input type="hidden" name="bot-field" onChange={this.handleChange}/>
                <input type="hidden" name="form-name" value="contact" />

                <div className="form-group py-2">
                  <label htmlFor="exampleInputPassword1"><strong>Full Name</strong></label>
                  <input name="nameContact" className="form-control" id="exampleInputPassword1" placeholder="Your Name" onChange={this.handleChange}/>
                </div>
              
                <div className="form-group py-2">
                  <label htmlFor="exampleInputEmail1"><strong>Email address</strong></label>
                  <input name="emailContact" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
              
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1"><strong>Message</strong></label>
                  <textarea name="messageContact" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleChange}></textarea>
                </div>

                <strong>How can I help you with?</strong>
                <ul>
                  <li>Get a Website Created</li>
                  <li>Get a Professional App or Web Design for your company</li>
                  <li>You need help in School or University</li>
                </ul>

                <button className="btn btn-primary" type="submit" name="submitButton">Send</button>

                <div data-netlifly-recaptcha="true"></div>
            </form>
        );
    }
}

export default ContactForm