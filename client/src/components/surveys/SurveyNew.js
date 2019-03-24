//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
class SurveyNew extends Component {
  //component level state
  //initializing state : constructor
  /*constructor(props) {
    super(props);

    this.state = { new: true };
  }*/

  state = { showFormReview: false }; //equivalent to constructor method

  renderContent() {
    if (this.state.showFormReview){ //if true
      return <SurveyFormReview 
        onCancel={() => this.setState({ showFormReview: false })}
      />;
    }
    return (
      <SurveyForm 
        onSurveySubmit={() => this.setState({ showFormReview: true })} 
      /> 
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default SurveyNew;