//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields';
class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field  
          key={name} 
          component={SurveyField} 
          type="text" 
          label={label} 
          name={name}
        />
      );    
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>  
      </div>
    );
  }
}
//validating the Form
function validate(values) {
  const errors = {};
  //first validate email
  errors.recipients = validateEmails(values.recipients || '');
  
  //if user didnt provide values
  _.each(formFields, ({ name }) => {
    if(!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });


  //if it's empty - no errors, 
  //otherwise - form values are invalid and doesn't submit
  return errors; 
}
//initialize and configure the form
export default reduxForm({
  validate,
  form: 'surveyForm', //create namespace for the form
  destroyOnUnmount: false //don't destroy the value 
})(SurveyForm);