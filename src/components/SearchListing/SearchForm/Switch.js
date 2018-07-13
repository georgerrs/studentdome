import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwitchButton from 'lyef-switch-button';
// Redux
import { connect } from 'react-redux';
// Redux form
import {change} from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!lyef-switch-button/css/main.css';


class Switch extends Component {
    static propTypes = {
    	change: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state ={
        	checked: false
        };
        this.handleCallback = this.handleCallback.bind(this);
    }

    async handleCallback(){
    	const { change, handleSubmit } = this.props;
    	this.setState({ checked: !this.state.checked });
    	let type;
    	if(!this.state.checked){
    		type = 'instant';
    	} else {
    		type = 'request';
    	}
    	await change('SearchForm', 'bookingType', type);
        await change('SearchForm', 'currentPage', 1);
    	await handleSubmit();
    }

    render() {
    	const { checked } = this.state;
        return (
            <SwitchButton
	            id="booking-type"
	            isChecked={checked}
	            action={this.handleCallback}
	        />
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    change
};

export default withStyles(s) (connect(mapState, mapDispatch)(Switch));

