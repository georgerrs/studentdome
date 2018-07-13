import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AvatarUpload.css';
import * as FontAwesome from 'react-icons/lib/fa';
import envelope from './envelope.png';

// Component
import Link from '../../Link';
import Avatar from '../../Avatar';
import DropZone from './DropZone';
import Loader from '../../Loader';

// Locale
import messages from '../../../locale/messages';

class AvatarUpload extends Component {
    static propTypes = {
			profilePhotoLoading: PropTypes.bool,
    	guestPicture: PropTypes.string,
			guestDisplayName: PropTypes.string.isRequired,
			nextPage: PropTypes.func.isRequired,
			emailVerified: PropTypes.bool.isRequired,
			formatMessage: PropTypes.func,
    };

	static defaultProps = {		
		profilePhotoLoading: false
	};
		constructor(props) {
    	super(props);
    	this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
    	const { nextPage, emailVerified } = this.props;
			if(emailVerified){
    		nextPage('payment');
    	} else {
    		nextPage('verification');
    	}
    }

    render() {
			const { guestPicture, guestDisplayName, profilePhotoLoading } = this.props;
			const { formatMessage } = this.props.intl;
        return (
	        <Grid>
		        <Row>
		          <div className={s.pageContainer}>
		            <div className={s.activationStepPanel}>
		              <div className={s.panelBody}>
										<h3 className={s.space1}>
											<span><FormattedMessage {...messages.addProfilePhoto} /></span>
										</h3>
		                <div className={cx(s.textLead, s.space4)}>
		                  <div>
		                    <span>
													<FormattedMessage {...messages.uploadInfo} />
												</span>
		                  </div>
		                </div>									
		                <div className={cx(s.space4, s.spaceTop4)}>
		                    <div className={s.space2}>
													<Avatar
														isUser
														title={guestDisplayName}
														className={cx(s.profileImage, s.mediaPhoto, s.mediaRound)}
													/>
		                  	</div>
		                </div>
										<Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.fullWidth, s.button, s.btnPrimaryBorder, s.btnlarge, s.noPadding)}>
											<DropZone 
												guestPicture={guestPicture}
												defaultMessage={formatMessage(messages.dropzoneUpload)}
											/>
		                  
		                </Col>
		                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.spaceTop2)}>
										{
											guestPicture && <Button 
												className={cx(s.button, s.btnPrimary)}
												onClick={this.handleClick}
											>
												<FormattedMessage {...messages.continue} />
											</Button>
										}
		                  
		                </Col>
		              </div>
		            </div>
		          </div>
		        </Row>
	      	</Grid>
        );
    }
}

export default injectIntl(withStyles(s)(AvatarUpload));