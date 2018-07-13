// General
import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux form
import { Field, reduxForm, change } from 'redux-form';

// Google Places Suggest Component
import GoogleMapLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';
import { FormControl } from 'react-bootstrap';

// Constants
import { googleMapAPI } from '../../../config';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

class PlacesSuggest extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    googleMaps: PropTypes.object,
    setPersonalizedValues: PropTypes.func,
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  };

  static defaultProps = {
      personalized: {
          location: null
      }
  };

  constructor (props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
  }

  async handleSearchChange (value) {
    const { setPersonalizedValues, change, handleSubmit } = this.props;
    setPersonalizedValues({ name: 'location', value });
    setPersonalizedValues({ name: 'lat', value: null });
    setPersonalizedValues({ name: 'lng', value: null });
    setPersonalizedValues({ name: 'geography', value: null });
    if (!value) {
      await change('SearchForm', 'location', value);
      await change('SearchForm', 'geography', value);
      await change('SearchForm', 'lat', null);
      await change('SearchForm', 'lng', null);
      await change('SearchForm', 'geoType', null);
      await change('SearchForm', 'currentPage', 1);
      //await handleSubmit();
    }
  }

  async handleSelectSuggest (data) {
    const { change, handleSubmit, setPersonalizedValues } = this.props;
    let locationData = {}, types, geoType;
    if (data && data.gmaps) {
      types = data.gmaps.types;

      data.gmaps.address_components.map((item, key) => {
        if (item.types[0] == "administrative_area_level_1") {
          locationData["administrative_area_level_1_short"] = item.short_name;
          locationData["administrative_area_level_1_long"] = item.long_name;
        } else if (item.types[0] == "country") {
          locationData[item.types[0]] = item.short_name;
        } else {
          locationData[item.types[0]] = item.long_name;
        }
      });

      if (types.indexOf("country") > -1) {
        geoType = "country";
      } else if (types.indexOf("administrative_area_level_1") > -1) {
        geoType = "state";
      } else {
        geoType = null;
      }
      
      setPersonalizedValues({ name: 'location', value: data.label });
      setPersonalizedValues({ name: 'lat', value: data.location.lat });
      setPersonalizedValues({ name: 'lng', value: data.location.lng });
      setPersonalizedValues({ name: 'geoType', value: geoType });
      setPersonalizedValues({ name: 'geography', value: JSON.stringify(locationData) });
      await change('SearchForm', 'location', data.label);
      await change('SearchForm', 'geography', JSON.stringify(locationData));
      await change('SearchForm', 'currentPage', 1);
      await change('SearchForm', 'lat', data.location.lat);
      await change('SearchForm', 'lng', data.location.lng);
      await change('SearchForm', 'geoType', geoType);
      await handleSubmit();
    }
  }

  render() {
    const { label, className, containerClassName, personalized } = this.props;

    return (
        <div>
          <Geosuggest 
              ref={el=>this._geoSuggest=el}
              placeholder={label}
              inputClassName={className}
              className={containerClassName}
              initialValue={personalized.location}
              onChange={this.handleSearchChange}
              onSuggestSelect={this.handleSelectSuggest}
          />
        </div>
    );
  }
}

const mapState = (state) => ({
  personalized: state.personalized
});

const mapDispatch = {
  change,
  setPersonalizedValues
};

export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(PlacesSuggest)), {
  libraries: ["places"],
  region: "US",
  language: "en",
  key: googleMapAPI,
});
