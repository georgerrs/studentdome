// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, reset } from 'redux-form';

// Translation
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

import { toastr } from 'react-redux-toastr';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AddPhoneNumberForm.css';
import {
  Button,
  FormGroup,
  Col,
  Row,
  ControlLabel,
  FormControl,
  InputGroup } from 'react-bootstrap';

import { graphql, gql, compose } from 'react-apollo';

// Internal Components
import CountryList from '../../CountryList';
import Loader from '../../Loader';

// Redux Actions
import { sendVerificationSms } from '../../../actions/SmsVerification/sendVerificationSms';
import { openSmsVerificationModal } from '../../../actions/SmsVerification/modalActions';

class AddPhoneNumberForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.func
  };

  constructor(props){
    super(props);
    this.state = {
      country: '+91',
      phoneNumber: '',
      submitting: false,
      error: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    const { formatMessage } = this.props.intl;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm() {
    const { sendVerificationSms } = this.props;
    const { country, phoneNumber } = this.state;
    let error = null, submitting = false;
    if (!phoneNumber) {
      error = {
        phoneNumber: 'Please enter a phone number.'
      };
    } else if (isNaN(phoneNumber)) {
      error = {
        phoneNumber: 'Please enter a phone number.'
      };
    } 

    submitting = (error === null) ? true : false;
    
    this.setState({ 
      submitting,
      error
    });

    if (error === null && submitting) {
      const { status, errorMessage } = await sendVerificationSms(country, phoneNumber);
      
      if (status != '200') {
        if (errorMessage) {
          error = {
            phoneNumber: errorMessage
          };
        } else {
          error = {
            phoneNumber: 'Sorry, something went wrong. Please try again'
          };
        }
      }
    }
    if (this.refs.addPhoneNumberForm) {
      this.setState({ submitting: false, error });
    }
  }

  render () {
    const {formatMessage} = this.props.intl;
    const { country, phoneNumber, submitting, error } = this.state;
    
    return (
      <div className={s.formContainer} ref="addPhoneNumberForm">
        {error && error.phoneNumber && <span className={s.errorMessage}>{error.phoneNumber}</span>}
        <FormGroup className={s.formGroup}>
          <label className={s.labelText} >
            Choose a country
          </label>
          <CountryList 
            input={
              {
                name: 'country',
                onChange: this.handleChange,
                value: country
              }
            } 
            className={cx(s.formControlSelect)} 
            dialCode
            onChange={this.handleChange} />
        </FormGroup>

        <FormGroup className={s.formGroup}>
          <label className={s.labelText} >
            Add a phone number
          </label>
          <InputGroup>
            <InputGroup.Addon className={s.inputGroupAddon}>{country}</InputGroup.Addon>
            <FormControl 
              name={'phoneNumber'}
              value={phoneNumber} 
              placeholder={''} 
              type={'text'} 
              className={cx(s.formControlInput)}
              onChange={this.handleChange} />
          </InputGroup>
        </FormGroup>
          
        <FormGroup className={cx(s.formGroup, 'text-right')}>
          {/* <Button 
            className={cx(s.button, s.btnPrimary, s.btnLarge)} 
            type="button" 
            onClick={this.submitForm}
            disabled={submitting}>
            
          </Button> */}
          <Loader
            type={"button"}
            buttonType={"button"}
            className={cx(s.button, s.btnPrimary, s.btnlarge)}
            disabled={submitting}
            show={submitting}
            label={'Verify via SMS'}
            handleClick={this.submitForm}
          />
        </FormGroup>
      </div>
    )
  }

}

const mapState = (state) => ({
  profileId: state.account.data.profileId
});

const mapDispatch = {
  sendVerificationSms,
  openSmsVerificationModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(AddPhoneNumberForm);
