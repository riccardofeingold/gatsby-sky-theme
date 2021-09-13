import React from "react";
import { navigate } from 'gatsby-link'

class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.ContactForm = React.createRef()
        this.state = {
            name: "",
            email: "",
            message: "",
        }
    }

    encode = data => {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&")
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: this.encode({
                "form-name": form.getAttribute("name"),
                ...this.state,
            }),
        })
        .then(() => navigate("/success/"))
        .catch(error => alert(error))

        this.setState({
            name: "",
            email: "",
            message: "",
        })
    }

    render() {
        return (
            <div className="container p-4 shadow" style={{maxWidth: `720px`, backgroundColor: `#FFF`, borderRadius: `10px`}}>
                <form 
                    data-netlify="true"
                    name="contactForm"
                    method="POST"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                    className="pb-4"
                >
                    <input type="hidden" name="form-name" value="contactForm" />
                    <p hidden>
                        <label>
                            Don’t fill this out: <input name="bot-field"/>
                        </label>
                    </p>
                    <div className="form-group py-2">
                        <label htmlFor="name"><strong>Full Name</strong></label>
                        <input name="name" className="form-control" id="name" placeholder="Your Name" onChange={this.handleChange}/>
                    </div>
                    
                    <div className="form-group py-2">
                        <label htmlFor="email"><strong>Email address</strong></label>
                        <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    
                    <div className="form-group py-2">
                        <label htmlFor="message"><strong>Message</strong></label>
                        <textarea name="message" className="form-control" id="message" rows="3" onChange={this.handleChange}></textarea>
                    </div>

                    <strong>How can I help you with?</strong>
                    <ul>
                        <li>Get a Website Created</li>
                        <li>Get a Professional App or Web Design for your company</li>
                        <li>Need help in School or University</li>
                    </ul>

                    <button className={`btn btn-primary ${this.state.message && this.state.name && this.state.email ? "" : "disabled"}`} type="submit">Send</button>
                </form>
            </div>
        )
    }
}

export default ContactForm