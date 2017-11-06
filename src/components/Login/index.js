import React, { Component } from 'react';
import { Link } from 'react-router';

import { post } from '../../util';

const excludedFieldsForValidation = ['errors'];
const excludedFieldsForPost = ['errors'];

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

class LoginForm extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: [],

    }
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
      const result = await post('users/login', selectFieldsForPost(this.state));
      window.localStorage.setItem('user_details', JSON.stringify(result.data));
      this.setState({ submitSucceeded: true });
      this.props.router.push('/');
    }
  }

  render() {
    const {
      email,
      password
    } = this.state;
    return (
      <div>
        <ul className="resp-tabs-list hor_1">
          <li><Link to="signup">SignUp</Link></li>
          <li><Link to="login">LogIn</Link></li>
        </ul>
        <div className="w3_agile_login">
          <form onSubmit={this.handleSubmit.bind(this)} className="agile_form">
            <p>Email</p>
            <input type="email" name="email" value={email} onChange={this.handleInputChange} />
            <p>Password</p>
            <input type="password" name="password" value={password} onChange={this.handleInputChange} />
            <input type="submit" className="agileinfo" />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;