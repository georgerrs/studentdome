// General
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../locale/messages';


// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import s from './Search.css';

// Components
import SearchForm from '../../components/SearchListing/SearchForm';
import SearchResults from '../../components/SearchListing/SearchResults';
import MapResults from '../../components/SearchListing/MapResults';
import Loader from '../../components/Loader';

// Redux Action
import {showMap, showResults, showForm} from '../../actions/mobileSearchNavigation';

class Search extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.object,
    searchSettings: PropTypes.object,
    filterToggle: PropTypes.bool,
    showMap: PropTypes.func.isRequired,
    showResults: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
    mobileSearch: PropTypes.shape({
      searchMap: PropTypes.bool,
      searchResults: PropTypes.bool,
      searchForm: PropTypes.bool
    })
  };

  static defaultProps = {
    mobileSearch: {
      searchMap: false,
      searchResults: true,
      searchForm: false
    }
  };

  mobileNavigation(){
    const { 
      mobileSearch: {searchMap, searchResults}, 
      showMap, 
      showResults, 
      showForm 
    } = this.props;

    let leftNav, rightNav;
    if(searchResults){
      leftNav = <Button className={cx(s.filterButton)} bsStyle="link" onClick={() => showMap()}><FormattedMessage {...messages.map} /><FontAwesome.FaMapO /></Button>;
      rightNav = <Button className={cx(s.filterButton)} bsStyle="link" onClick={() => showForm()}><FormattedMessage {...messages.filters} /><FontAwesome.FaSliders /></Button>
    }

    if(searchMap) {
      leftNav = <Button className={cx(s.filterButton)} bsStyle="link" onClick={() => showResults()}><FormattedMessage {...messages.results} /><FontAwesome.FaEllipsisH /></Button>
      rightNav = <Button className={cx(s.filterButton)} bsStyle="link" onClick={() => showForm()}><FormattedMessage {...messages.filters} /><FontAwesome.FaSliders /></Button>
    }

    return(
      <div className={cx(s.mobileNavigation)}>
        <div className={s.buttonOuter}>
          <div className={cx(s.buttonContainer)}>
            {
              leftNav
            }
            {
              rightNav
            }
          </div>
        </div>  
      </div> 
    );
  }

  render() {
    const { 
      mobileSearch: {searchMap, searchResults, searchForm},
      searchSettings,
      initialFilter,
      filterToggle
     } = this.props;

    let DesktopResults = true;
    if(filterToggle === true){
      DesktopResults = false;
    }
    const isBrowser = typeof window !== 'undefined';
    const smallDevice = isBrowser ? window.matchMedia('(max-width: 768px)').matches : undefined;

    if(!isBrowser) {
      return (
              <div className={s.searchLoaderContainer}>
                <Loader type={"text"} />
              </div>
            );
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={cx(s.searchResultContainer)}>
            {
              !smallDevice && <div className={cx(s.filtersBody)}>
                <SearchForm initialFilter={initialFilter} searchSettings={searchSettings} />
              </div>
            }

            {
              smallDevice && searchForm && <div className={cx(s.filtersBody)}>
                <SearchForm initialFilter={initialFilter} searchSettings={searchSettings} />
              </div>
            }

            {
              !smallDevice && DesktopResults && <div className={cx(s.resultsBody)}>
                <SearchResults />
              </div>
            }

            {
              smallDevice && searchResults && <div className={cx(s.resultsBody)}>
                <SearchResults />
              </div>
            }
            
          </div>
          
            {
              !smallDevice && <div className={cx(s.searchMapContainer)}>
                <MapResults initialFilter={initialFilter} searchSettings={searchSettings} />
              </div>
            }

            {
              smallDevice && searchMap && <div className={cx(s.searchMapContainer)}>
                <MapResults initialFilter={initialFilter} searchSettings={searchSettings} />
              </div>
            }

            {
              !searchForm && this.mobileNavigation()
            }
           
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  filterToggle: state.toggle.filterToggle,
  mobileSearch: state.mobileSearch.data
});

const mapDispatch = {
  showMap,
  showResults,
  showForm
};

export default withStyles(s)(connect(mapState, mapDispatch)(Search));
