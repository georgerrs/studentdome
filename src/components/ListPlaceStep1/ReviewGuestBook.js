// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl } from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import ListPlaceTips from '../ListPlaceTips';

import updateStep3 from './updateStep3';

class ReviewGuestBook extends Component {

  static propTypes = {
    previousPage: PropTypes.func,
    nextPage: PropTypes.func
  };

  constructor (props) {
    super(props);
    this.state = {
      reviewGuestBook: []
    };
  }

  componentWillMount () {
    const { listingFields } = this.props;
    if(listingFields != undefined) {
      this.setState({ reviewGuestBook: listingFields.reviewGuestBook });
    }
  }

  componentWillReceiveProps (nextProps) {
    const { listingFields } = nextProps;
    if(listingFields != undefined) {
      this.setState({ reviewGuestBook: listingFields.reviewGuestBook });
    }
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { reviewGuestBook } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <h3 className={cx(s.landingContentTitle, s.space5)}><FormattedMessage {...messages.reviewGuestBookTitle} /></h3>
            <p className={cx(s.landingStep3, s.space3)}><span><FormattedMessage {...messages.reviewGuestBookDescription} /></span></p>
            <form onSubmit={handleSubmit}>
              <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                      <ul className={cx( 'list-unstyled', s.noPadding, s.noMargin, s.unorderedList)}>
                          { 
                            reviewGuestBook.map((item, key) => { 
                              if(item.isEnable === "1") {
                              return (
                              <li key={key}>
                                  <span className={s.displayTable}>
                                  <span className={s.displayTableCell}><FontAwesome.FaCheck className={cx(s.checkIcon)} /></span>
                                  <span className={cx(s.landingStep3, s.space3, s.displayTableCell)}> {item.itemName} </span>
                                  </span>
                              </li>
                              ) 
                            }
                            }) 
                          }
                      </ul>
                      <ControlLabel className={s.landingLabel}>
                          <FormattedMessage {...messages.reviewGuestBookNote} />
                      </ControlLabel>
                  </FormGroup>
              </div>
              <hr className={s.horizontalLineThrough} />
              <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                  <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={()=> previousPage("house-rules")}>
                      <FormattedMessage {...messages.back} />
                  </Button>
                  <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={()=> nextPage("advance-notice")}>
                      <FormattedMessage {...messages.next} />
                  </Button>
                  </Col>
              </FormGroup>
            </form>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    );
  }
}

ReviewGuestBook = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(ReviewGuestBook);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s) (connect(mapState, mapDispatch)(ReviewGuestBook)));
