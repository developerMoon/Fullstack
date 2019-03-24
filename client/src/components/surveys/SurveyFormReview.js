//SurveyFormReview shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';

const SurveyFormReview = ({ onCancel }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <button
        className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

//take redux state and transform it to props
function mapStateToProps(state) {
   return { formValues: state.form.surveyForm.values }; //values of the surveyForm
}

//connect: pull values out of redux store
export default connect(mapStateToProps)(SurveyFormReview);