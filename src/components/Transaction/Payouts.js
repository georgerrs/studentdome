import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {graphql, gql, compose} from 'react-apollo';
import { FormControl } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';

import {changePayout} from '../../actions/TransactionHistory/changePayout';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class Payouts extends Component {
    static propTypes = {
        className: PropTypes.string,
        formatMessage: PropTypes.func,
        data: PropTypes.shape({
        	loading: PropTypes.bool,
        	getPayouts: PropTypes.arrayOf(PropTypes.shape({
        		id: PropTypes.number.isRequired,
        		payEmail: PropTypes.string.isRequired
        	}))
        }),
        refetch: PropTypes.func,
        changePayout: PropTypes.func.isRequired,
        type: PropTypes.string,
        reservationId: PropTypes.number,
        defaultLabel: PropTypes.string,
        defaultValue: PropTypes.number,
        enableAddPayout: PropTypes.bool
    };

    static defaultProps = {
        defaultLabel: 'All payout method',
        enableAddPayout: false,
        data: {
            loading: true,
            getPayouts: []
        }
    };

    constructor(props) {
    	super(props);
    	this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const { refetch, changePayout, type, reservationId } = this.props;
        if(type === 'change'){
            changePayout(e.target.value, reservationId);
        } else {
            let variables = {
                payoutId: e.target.value
            };
            refetch(variables);
        }
        
    }

    render() {
    	const { className, data: { loading, getPayouts }, defaultLabel, defaultValue, enableAddPayout } = this.props;
        if(enableAddPayout){
            if(!loading && (getPayouts === null || getPayouts.length ===0)){
                return (
                    <Link to={"/user/payout"}><FormattedMessage {...messages.transactionsAddPayout} /></Link>
                )
            }
        }
        return (
            <FormControl 
                componentClass="select" 
                className={className} 
                onChange={this.handleChange}
                defaultValue={defaultValue}
            >
            	<option value="0">{defaultLabel}</option>
            	{
            		!loading &&  getPayouts && getPayouts.map((item, index) => {
            			return (
            				<option value={item.id} key={index}>{item.payEmail}</option>
            			)
            		})
            			
            	}
          	</FormControl>
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    changePayout
};

export default compose(
    connect(mapState, mapDispatch),
    graphql(gql `
    	query getPayouts {
		  getPayouts {
		    id
		    methodId
		    paymentMethod{
		      id
		      name
		    }
		    userId
		    payEmail
		    address1
		    address2
		    city
		    state
		    country
		    zipcode
		    currency
		    default
		    createdAt
		    status
		  }
		}
    `,
    {
        options: {
            ssr: false
        }
    }),
)(Payouts);

