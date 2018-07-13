import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/css/styles.scss';

import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';


class DateRange extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        numberOfMonths: PropTypes.number.isRequired,
        setPersonalizedValues: PropTypes.func.isRequired,
        formatMessage: PropTypes.func,
        personalized: PropTypes.shape({
            startDate: PropTypes.string,
            endDate: PropTypes.string
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null,
        };
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    componentDidMount(){
        const { personalized } = this.props;
        if(personalized != undefined){
            if(personalized.startDate && personalized.endDate){
                this.setState({ 
                    startDate: moment(personalized.startDate),
                    endDate: moment(personalized.endDate)
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const { personalized } = nextProps;
        if(personalized != undefined){
            if(personalized.startDate && personalized.endDate){
                this.setState({ 
                    startDate: moment(personalized.startDate),
                    endDate: moment(personalized.endDate)
                });
            }
        }
    }
    

    onDatesChange({ startDate, endDate }) {
        const { onChange, setPersonalizedValues } = this.props;
        this.setState({ startDate, endDate });
        if(startDate != null && endDate != null){
            onChange(`'${moment(startDate).format("YYYY-MM-DD")}' AND '${moment(endDate).format("YYYY-MM-DD")}'`);
            setPersonalizedValues({ name: 'startDate', value: moment(startDate).format("YYYY-MM-DD") });
            setPersonalizedValues({ name: 'endDate', value: moment(endDate).format("YYYY-MM-DD") });
        }
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }


    render() {
        const { focusedInput, startDate, endDate } = this.state;
        const { numberOfMonths } = this.props;
        const { formatMessage } = this.props.intl;
        return ( 
            <div>
                <DateRangePicker
                  {...this.props}
                  onDatesChange={this.onDatesChange}
                  onFocusChange={this.onFocusChange}
                  focusedInput={focusedInput}
                  startDate={startDate}
                  endDate={endDate}
                  numberOfMonths={numberOfMonths}
                  startDatePlaceholderText={formatMessage(messages.checkIn)}
                  endDatePlaceholderText={formatMessage(messages.checkOut)}
                  hideKeyboardShortcutsPanel
                />
            </div>
        );
    }
}


const mapState = (state) => ({
  personalized: state.personalized
});

const mapDispatch = {
    setPersonalizedValues
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));

