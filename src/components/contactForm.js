import React from "react";
import { navigate } from 'gatsby-link'

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
} 

export default function ContactForm() {
    const [state, setState] = React.useState({})

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
            'form-name': form.getAttribute('name'),
            ...state,
        }),
        })
        .then(() => navigate(form.getAttribute('action')))
        .catch((error) => alert(error))
    }

    return (
        <form 
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/success"
            onSubmit={handleSubmit}
            className="pb-4"
            >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
                <label>
                    Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                </label>
            </p>
            <div className="form-group py-2">
                <label htmlFor="name"><strong>Full Name</strong></label>
                <input name="nameContact" className="form-control" id="name" placeholder="Your Name" onChange={handleChange}/>
            </div>
            
            <div className="form-group py-2">
                <label htmlFor="email"><strong>Email address</strong></label>
                <input name="emailContact" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            
            <div className="form-group">
                <label htmlFor="message"><strong>Message</strong></label>
                <textarea name="messageContact" className="form-control" id="message" rows="3" onChange={handleChange}></textarea>
            </div>

            <strong>How can I help you with?</strong>
            <ul>
                <li>Get a Website Created</li>
                <li>Get a Professional App or Web Design for your company</li>
                <li>You need help in School or University</li>
            </ul>

            <button className="btn btn-primary" type="submit" name="submitButton">Send</button>
        </form>
    )
}