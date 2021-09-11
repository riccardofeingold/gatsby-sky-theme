import React from "react";

const ContactForm = () => (
    <form 
        name="contactForm"
        method="POST"
        data-netlifly="true"
        data-netlifly-honeypot="bot-field"
        action="/success"
        className="pb-4"
        >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />

        <div className="form-group py-2">
            <label htmlFor="name"><strong>Full Name</strong></label>
            <input name="nameContact" className="form-control" id="name" placeholder="Your Name"/>
        </div>
        
        <div className="form-group py-2">
            <label htmlFor="email"><strong>Email address</strong></label>
            <input name="emailContact" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        
        <div className="form-group">
            <label htmlFor="message"><strong>Message</strong></label>
            <textarea name="messageContact" className="form-control" id="message" rows="3"></textarea>
        </div>

        <strong>How can I help you with?</strong>
        <ul>
            <li>Get a Website Created</li>
            <li>Get a Professional App or Web Design for your company</li>
            <li>You need help in School or University</li>
        </ul>

        <button className="btn btn-primary" type="submit" name="submitButton">Send</button>
    </form>
);

export default ContactForm