import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// External component
import {Range} from 'rc-slider';


// Redux form
import {change} from 'redux-form';

// Helper
import {convert} from '../../../helpers/currencyConvertion';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!rc-slider/assets/index.css';

class PriceRange extends Component {
    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        from: PropTypes.string.isRequired,
        base: PropTypes.string.isRequired,
        rates: PropTypes.object.isRequired,
        change: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        min: 0,
        max: 0
    };
    
    constructor (props) {
        super(props);
        this.updateValue = this.updateValue.bind(this);
        this.onAfterChange = this.onAfterChange.bind(this);
    }

    async updateValue(sliderState) {
        const { change } = this.props;
        await change('SearchForm', 'priceRangeLabel', sliderState);
    }

    async onAfterChange(sliderState){
        const { change, from, base, rates, handleSubmit } = this.props;
        let minPrice, maxPrice;
        let values = sliderState;
        if(rates != null && rates != undefined){
            minPrice = convert(base, rates, sliderState[0], from);
            maxPrice = convert(base, rates, sliderState[1], from);
            values = [minPrice, maxPrice];
        }
        await change('SearchForm', 'priceRange', values);
        await change('SearchForm', 'currentPage', 1);
        await handleSubmit();
    }
    
    render() {
        const { min, max } = this.props;

        return (
            <div>
                <Range
                    min={min}
                    max={max}
                    defaultValue={[min, max]}
                    onChange={this.updateValue}
                    onAfterChange={this.onAfterChange}
                    allowCross={false}
                />
            </div>
        );
    }
}

const mapState = (state) => ({
  base: state.currency.base,
  rates: state.currency.rates
});

const mapDispatch = {
    change
};

export default withStyles(s) (connect(mapState, mapDispatch)(PriceRange));