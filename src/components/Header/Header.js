// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import * as FontAwesome from 'react-icons/lib/fa'
import cx from 'classnames';
import { 
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

// Internal Components
import Link from '../Link';
import Navigation from '../Navigation';
import LanguageSwitcher from '../LanguageSwitcher';
import Logo from '../Logo';

// Assets
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';

// Redux action
import { toggleOpen, toggleClose } from '../../actions/Menu/toggleControl';


class Header extends React.Component {
  static propTypes = {
    borderLess : PropTypes.bool,
    showMenu: PropTypes.bool,
    toggleOpen: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
  };

  static defaultProps = {
    borderLess: false,
    showMenu: false
  }

  constructor(props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu() {
    const { showMenu, toggleOpen, toggleClose } = this.props;
    if(showMenu) {
      toggleClose();
    } else {
      toggleOpen();
    }
  }

  render() {
    const { siteSettings, borderLess, showMenu, toggleOpen } = this.props;
    let borderClass;
    if(borderLess){
      borderClass = s.rentAllHeaderBorderLess;
    }
    return (
      <div className={s.root}>
        <Toaster />
        <LoadingBar />
        <div className={s.container}>
          <Navbar fluid className={cx(s.rentAllHeader, 'rentAllHeader', borderClass)} expanded={showMenu} onToggle={this.handleMenu}>
            <Navbar.Header>
              <Navbar.Brand className={cx('hidden-xs')}>
                <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
              </Navbar.Brand>
              <Navbar.Toggle className={s.navBarToggle} children={
                <span>
                  <Logo link={"#"} className={cx(s.brand, s.brandImgToggle)} />
                  {
                    !showMenu && <FontAwesome.FaChevronDown />
                  }

                  {
                    showMenu && <FontAwesome.FaChevronUp />
                  }
                  
                </span>
              }/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Navigation />
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
  showMenu: state.toggle.showMenu
});

const mapDispatch = {
  toggleOpen,
  toggleClose
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Header)));
