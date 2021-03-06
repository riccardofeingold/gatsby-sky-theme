import React from "react";
import axios from 'axios';
import { navigate } from "gatsby-link";

const activeBtnStyleForDisableState = {
    color: "#FFF",
    opacity: 1,
}

class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            message: "",
            submitting: false,
            status: null,
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleServerResponse = (ok, msg, form) => {
        this.setState({
          submitting: false,
          status: { ok, msg }
        });
        if (ok) {
          form.reset();
        }
    };
    handleOnSubmit = e => {
        e.preventDefault();
        const form = e.target;
        this.setState({ submitting: true });
        axios({
            method: "post",
            url: "https://getform.io/f/0f996a48-4423-4c56-bf8f-8a149ebb2c77",
            data: new FormData(form)
        })
        .then(r => {
            this.handleServerResponse(true, "Thanks!", form);
            navigate("/success/");
        })
        .catch(r => {
            this.handleServerResponse(false, r.response.data.error, form);
        });

        this.setState({
            name: "",
            email: "",
            message: "",
        })
    };

    render() {
        return (
            <div className="container p-4 shadow" style={{maxWidth: `720px`, backgroundColor: `#FFF`, borderRadius: `10px`}}>
                <form
                    name="contactForm"
                    method="POST"
                    onSubmit={this.handleOnSubmit}
                    className="pb-4"
                >
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
                    <div className="text-end">
                        <button className={`btn btn-primary ${this.state.message && this.state.name && this.state.email ? "" : "disabled"}`} type="submit" style={activeBtnStyleForDisableState}>Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ContactForm