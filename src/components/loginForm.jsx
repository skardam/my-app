import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { auth } from "./firebase";
// import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  signIn = (e) => {
    e.preventDefault();
    ///FIrebase code
    auth
      .signInWithEmailAndPassword(
        this.state.account.username,
        this.state.account.password
      )
      .then((auth) => {
        this.props.history.push("./dashboard");
      })
      .catch((error) => alert(error.message));
  };

  register = (e) => {
    e.preventDefault();

    //Firebase code
    auth
      .createUserWithEmailAndPassword(
        this.state.account.username,
        this.state.account.password
      )
      .then((auth) => {
        console.log(auth);
        if (auth) {
          alert("User Registered");
        }
      })
      .catch((error) => alert(error.message));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Submitted...");
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    const items = result.error.details;
    items.map((item) => {
      return (errors[item.path[0]] = item.message);
    });
    // for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ value, name }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };

    account[input.name] = input.value;
    this.setState({ account, errors });
    this.validate();
  };

  render() {
    const { account, errors } = this.state;
    //console.log((() => {}).length);
    return (
      <div class="container">
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group"></div>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
            type="text"
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
            type="password"
          />

          <button
            onClick={this.signIn}
            disabled={this.validate()}
            className="btn btn-primary"
          >
            Sign In
          </button>

          <button
            onClick={this.register}
            disabled={this.validate()}
            className="btn btn-primary"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
