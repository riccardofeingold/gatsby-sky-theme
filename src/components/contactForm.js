import React from "react";

class ContactForm extends React.Component {
    render() {
        return (
            <form 
                className="pb-4"
                method="POST"
                data-netlify="true"
                netlifly-honeypot="bot-field"
                name="contactForm"
              >
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="form-group py-2">
                  <label htmlFor="exampleInputPassword1"><strong>Full Name</strong></label>
                  <input name="name" className="form-control" id="exampleInputPassword1" placeholder="Your Name"/>
                </div>
              
                <div className="form-group py-2">
                  <label htmlFor="exampleInputEmail1"><strong>Email address</strong></label>
                  <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
              
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1"><strong>Message</strong></label>
                  <textarea name="message" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <strong>How can I help you with?</strong>
                <ul>
                  <li>Get a Website Created</li>
                  <li>Get a Professional App or Web Design for your company</li>
                  <li>You need help in School or University</li>
                </ul>

                <button className="btn btn-primary" type="submit">Send</button>

                <div data-netlifly-recaptcha="true"></div>
            </form>
        );
    }
}

export default ContactForm