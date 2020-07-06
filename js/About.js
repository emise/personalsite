import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      errors: "",
      success: "",
      loading: false,
    };
  }

  handleInputChange = (e) => {
    const target = event.target;
    const value = target.value;
    const name = target.name

    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    for (const property in this.state) {
      if (property == "errors" || property == "success" || property == "loading") continue;
      if (this.state[property] === "") {
        this.setState({ errors: "Please fill out all fields", loading: false });
        return
      }
    }

    const { name, email, subject, message } = this.state;
    axios.post("/api/inquire", { name, email, subject, message }).then(() => {
      this.setState({ errors: "", success: "Thanks for your message!", loading: false });
    }).catch(() => {
      this.setState({
        errors: "Sorry, something went wrong. Try again later?",
        success: "",
        loading: false
      });
    });
  }

  render() {
    const { name, email, subject, message, errors, success, loading } = this.state;

    return (
      <div>
        Angela is a millennial who works in tech as a software engineer.
        She won a local piano competition when she was in high school, since considered
        the pinnacle of her creative accolades. She has received acclaim from her friends for
        her experimental and artistic output.

        <blockquote>
            "This is great work"
            - A Friend, Facebook Chat
        </blockquote>

        <a href='https://github.com/emise/personalsite' target="_blank">source code</a>
        <hr />
        <h3>Inquiries, questions, comments</h3>
        <form className="inquire-form" onSubmit={this.handleSubmit}>
          <label>Name:
            <input name="name" type="text" value={name} onChange={this.handleInputChange} disabled={loading} />
          </label>
          <label>Email:
            <input name="email" type="email" value={email} onChange={this.handleInputChange} disabled={loading} />
          </label>
          <label>Subject:
            <input name="subject" type="text" value={subject} onChange={this.handleInputChange} disabled={loading} />
          </label>
          <label>Message:
            <textarea name="message" rows="4" value={message} onChange={this.handleInputChange} disabled={loading} />
          </label>

          <input type="submit" value="Send" disabled={loading} />
        </form>
        {loading && <FontAwesomeIcon icon={faSpinner}  spin />}
        {errors && <div className="form-errors">{errors}</div>}
        {success && <div className="form-success">{success}</div>}
      </div>
    ); 
  } 
} 

export default About;
