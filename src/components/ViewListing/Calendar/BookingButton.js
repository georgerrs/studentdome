import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calendar.css';
import {
  Button, 
  FormGroup,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import Loader from '../../Loader';

// Locale
import messages from '../../../locale/messages';

class BookingButton extends Component {
    static propTypes = {
    	availability: PropTypes.bool.isRequired,
        isDateChosen: PropTypes.bool.isRequired,
        basePrice: PropTypes.number.isRequired,
        isHost: PropTypes.bool.isRequired,
        bookingProcess: PropTypes.func.isRequired,
        listId: PropTypes.number.isRequired,
        guests: PropTypes.number.isRequired,
        startDate: PropTypes.object,
        endDate: PropTypes.object,
        bookingType: PropTypes.string.isRequired,
        bookingLoading: PropTypes.bool,
        formatMessage: PropTypes.func,
        maximumStay: PropTypes.bool,
    };

    static defaultProps = {
    	availability: true,
    	isDateChosen: false,
        bookingLoading: false
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const { bookingProcess, listId, guests, startDate, endDate } = this.props;
        bookingProcess(listId, guests, startDate, endDate);
    }

    render() {
    	const { basePrice, isDateChosen, availability, isHost, bookingType, bookingLoading } = this.props;
        const { formatMessage } = this.props.intl;
        const { maximumStay } = this.props;
        let disabled, buttonLabel;
        if (!isDateChosen || basePrice < 1 || isHost || maximumStay){
            disabled = true;
        } else {
            disabled = false;
        }

        if(bookingType === 'instant'){
            buttonLabel = messages.book;
        } else {
            buttonLabel = messages.requestToBook;
        }
        
        if(!availability && isDateChosen){
            return (
                <div>
                    <FormGroup className={s.formGroup}>
                        <Button className={cx(s.btn, s.btnBlock, s.btnlarge, s.btnPrimary)}>
                            <FormattedMessage {...messages.checkAvailability} />
                        </Button>
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                        <Button className={cx(s.btn, s.btnBlock, s.btnlarge, s.btnPrimaryBorder)}>
                            <FormattedMessage {...messages.viewOtherListings} />
                        </Button>
                    </FormGroup>
                </div>
            );
        } else {
            return (
                <FormGroup className={s.formGroup}>
                    <Loader
                        type={"button"}
                        className={cx(s.btn, s.btnBlock, s.btnlarge, s.btnPrimary)}
                        handleClick={this.handleClick}
                        disabled={disabled}
                        show={bookingLoading}
                        label={formatMessage(buttonLabel)}
                    />
                </FormGroup>
            );
        }
    }
}

export default injectIntl(withStyles(s)(BookingButton));
