import React, { Component } from 'react';
import { Link } from 'react-router';

import { post } from '../../util';

const excludedFieldsForValidation = ['errors', 'submitSucceeded'];
const excludedFieldsForPost = ['errors', 'submitSucceeded'];

function validate(values) {
  const errors = [];
  Object.entries(values)
    .filter(targetField => !excludedFieldsForValidation.includes(targetField[0]))
    .forEach(targetField => {
      if (!targetField[1]) {
        errors.push(targetField[0]);
      }
    });
  return errors;
}

function selectFieldsForPost(values) {
  let valuesCopy = { ...values };
  excludedFieldsForPost.forEach(field => {
    delete valuesCopy[field];
  });
  return valuesCopy;
}

class Signup extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      description: '',
      password: '',
      eye: '',
      errors: []
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    if (target.type !== 'checkbox' && value) {
      const { errors } = this.state;
      if (errors.includes(name)) {
        this.setState({
          errors: errors.filter(e => e !== name)
        });
      }
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: []
    });
    const validationErrors = validate(this.state);
    if (validationErrors.length) {
      this.setState({
        errors: validationErrors
      });
    } else {
      const result = await post('users', selectFieldsForPost(this.state));
      this.setState({ submitSucceeded: true });
    }
  }

  renderError = name => {
    const { errors } = this.state;
    if (errors.includes(name)) {
      return (
        <div>
          <p className="red-color">{name.toUpperCase()} is Required</p>
          <br />
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      email,
      description,
      password,
      eye
    } = this.state;
    return (
      <div>
        <ul className="resp-tabs-list hor_1">
          <li><Link to="signup">SignUp</Link></li>
          <li><Link to="login">LogIn</Link></li>
        </ul>
        <div className="agile_its_registration">
          <form onSubmit={this.handleSubmit.bind(this)} id="signup" className="agile_form">
            <p>Email</p>
            <input type="email" name="email" value={email} onChange={this.handleInputChange} />
            {this.renderError('email')}
            <p>Description</p>
            <input type="text" name="description" value={description} onChange={this.handleInputChange} />
            {this.renderError('description')}
            <p>Password</p>
            <input type="password" name="password" value={password} onChange={this.handleInputChange} />
            {this.renderError('password')}
            <p>Eye</p>
            <input type="text" name="eye" value={eye} onChange={this.handleInputChange} />
            {this.renderError('eye')}
            <input type="submit" value="Signup" />
          </form>
        </div>
      </div>

    );
  }
}

export default Signup;
