import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {graphql, gql, compose} from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import { FormControl } from 'react-bootstrap';
class Listings extends Component {
    static propTypes = {
        className: PropTypes.string,
        formatMessage: PropTypes.func,
        data: PropTypes.shape({
        	loading: PropTypes.bool,
        	ManageListings: PropTypes.arrayOf(PropTypes.shape({
        		id: PropTypes.number.isRequired,
        		title: PropTypes.string.isRequired
        	}))
        }),
        refetch: PropTypes.func.isRequired,
        formatMessage: PropTypes.func,
    };

    constructor(props) {
    	super(props);
    	this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
    	const { refetch } = this.props;
        let variables = {
            listId: e.target.value
        };
        refetch(variables);
    }

    render() {
    	const { className, data: { loading, ManageListings } } = this.props;
        const { formatMessage } = this.props.intl; 
        return (
            <FormControl componentClass="select" className={className} onChange={this.handleChange}>
                <option value="0">{formatMessage(messages.allListings)}</option>
            	{
            		!loading &&  ManageListings && ManageListings.map((item, index) => {
            			return (
            				<option value={item.id} key={index}>{item.title}</option>
            			)
            		})
            			
            	}
          	</FormControl>
        );
    }
}

export default compose(
    injectIntl,
    graphql(gql `
    	{
		    ManageListings {
		        id
		        title
		    }
		}
    `,
    {
        options: {
            ssr: false
        }
    }),
)(Listings);
