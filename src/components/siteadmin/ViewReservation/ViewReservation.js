import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import { connect } from 'react-redux';
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
    Table
} from 'react-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewReservation.css';
import * as FontAwesome from 'react-icons/lib/fa';


// Components
import Payout from '../ReservationManagement/Payout';
import Refund from '../ReservationManagement/Refund';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from '../ReservationManagement/ModalForm';
import History from '../../../core/history';

// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';
import HostServiceFee from './HostServiceFee';

class ViewReservation extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            reservationState: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                title: PropTypes.string.isRequired
            }),
            hostData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            hostPayout: PropTypes.shape({
                id: PropTypes.number.isRequired,
                payEmail: PropTypes.string.isRequired
            }),
            hostTransaction: PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
            guestData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            transaction: PropTypes.shape({
                payerEmail: PropTypes.string.isRequired,
                paymentType: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            cancellationDetails: PropTypes.shape({
                refundToGuest: PropTypes.number.isRequired,
                payoutToHost: PropTypes.number.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired,
                guestServiceFee: PropTypes.number.isRequired,
                hostServiceFee: PropTypes.number.isRequired,
            }),
        }),
        viewReceiptAdmin: PropTypes.func.isRequired,
    };

    static defaultProps = {
        data: []
    };





    componentWillReceiveProps(nextProps) {
        const { completed, loading } = nextProps;
        const { refetch } = this.props;
        if (completed && !loading) {
            console.log('comp will receive props')
            refetch();
        }
    }

    render() {
        const { title, data, data: { listData, cancellationDetails, transaction } } = this.props;
        let subTotal = data.total + data.guestServiceFee;
        let amountPaytoGuest = 0;
        let amountPaytoHost = 0;
        if (cancellationDetails) {
            amountPaytoGuest = cancellationDetails.refundToGuest;
            amountPaytoHost = cancellationDetails.payoutToHost;
        } else {
            amountPaytoHost = Number(data.total) - Number(data.hostServiceFee);
        }
        let nextDay = moment(data.checkIn).add(1, 'days');
        let today = moment();
        let dayDifference = nextDay.diff(today, 'days');
      

        const reservestate = data.reservationState;
        const booktype = listData.bookingType;
        const Guestname = data.guestData.firstName + " " + data.guestData.lastName;
        const Hostname = data.hostData.firstName + " " + data.hostData.lastName;
        const reservationStatus = reservestate.charAt(0).toUpperCase() + reservestate.slice(1);
        const bookingType = booktype.charAt(0).toUpperCase() + booktype.slice(1);
        const gobackcss = { padding: '10px' };

        return (
            <div className={cx(s.pagecontentWrapper)}>
                <ModalForm />
                <div className={s.contentBox}>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={'table-responsive'}>
                        <Link to={"/siteadmin/reservations"} className={cx('pull-right')} style={gobackcss}>
                            Go back
                        </Link>
                        <Table >

                            <tbody>
                                <tr>
                                    <td>  Reservation Id   </td>
                                    <td>  {data.id}    </td>
                                </tr>
                                <tr>
                                    <td>  Confirmation Code   </td>
                                    <td>  {data.confirmationCode}    </td>
                                </tr>
                                <tr>
                                    <td>  Reservation Status  </td>
                                    <td>  {reservationStatus} </td>
                                </tr>
                                <tr>
                                    <td>  Listing Title  </td>
                                    <td> <a href={"/rooms/" + data.listData.id} target="_blank"> {data.listData.title}  </a>  </td>
                                </tr>
                                <tr>
                                    <td> Checkin  </td>
                                    <td>  {moment(data.checkIn).format("Do MMMM YYYY")}    </td>
                                </tr>
                                <tr>
                                    <td>  Checkout   </td>
                                    <td>  {moment(data.checkOut).format("Do MMMM YYYY")}    </td>
                                </tr>
                                <tr>
                                    <td>  Booking Type   </td>
                                    <td>  {bookingType}   </td>
                                </tr>
                                <tr>
                                    <td>  Amount Paid   </td>
                                    <td>  <CurrencyConverter
                                        amount={subTotal}
                                        from={data.currency} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Guest Service Fee   </td>
                                    <td> {
                                        !cancellationDetails && <div><CurrencyConverter amount={data.guestServiceFee}
                                            from={data.currency} /> </div>
                                    }
                                        {
                                            data && cancellationDetails && <div> <CurrencyConverter amount={cancellationDetails.guestServiceFee}
                                                from={data.currency} /></div>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Host Service Fee  </td>
                                    <td>

                                        <HostServiceFee
                                            hostId={data.hostId}
                                            checkIn={data.checkIn}
                                            id={data.id}
                                            hostPayout={data.hostPayout}
                                            amount={data.total}
                                            currency={data.currency}
                                            hostTransaction={data.hostTransaction}
                                            reservationState={data.reservationState}
                                            cancelData={data.cancellationDetails}
                                            hostServiceFee={data.hostServiceFee}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>  Guest Name   </td>
                                    <td> <a href={"/users/show/" + data.guestData.profileId} target="_blank"> {Guestname}   </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>  Guest Phone Number  </td>
                                    {
                                        data && data.guestData.phoneNumber != null &&
                                        <td>  {data.guestData.phoneNumber}    </td>
                                    }
                                    {
                                        !data.guestData.phoneNumber && <td> None    </td>
                                    }
                                </tr>
                                <tr>
                                    <td> Guest Email  </td>
                                    <td>  {data.guestUser.email}    </td>
                                </tr>
                                <tr>
                                    <td>  Host Name   </td>
                                    <td> <a href={"/users/show/" + data.hostData.profileId} target="_blank"> {Hostname}   </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>  Host Phone Number  </td>
                                    {data && data.hostData.phoneNumber != null &&
                                        <td>  {data.hostData.phoneNumber}    </td>
                                    }
                                    {
                                        !data.hostData.phoneNumber && <td> None    </td>
                                    }
                                </tr>
                                <tr>
                                    <td> Host Email  </td>
                                    <td>  {data.hostUser.email}  </td>
                                </tr>



                                <tr>
                                    <td>  Cancel Date  </td>
                                    {data && data.cancellationDetails && <td>  {moment(data.cancellationDetails.createdAt).format("Do MMMM YYYY")}    </td>
                                    }
                                    {
                                        !data.cancellationDetails && <td>     </td>
                                    }
                                </tr>
                                <tr>
                                    <td> Refund Amount   </td>
                                    {
                                        data.cancellationDetails && data.cancellationDetails != null && <td> <CurrencyConverter amount={data.cancellationDetails.refundToGuest}
                                            from={data.currency} />    </td>
                                    }  {
                                        !data.cancellationDetails && <td> 0 </td>
                                    }
                                </tr>
                                {/* <tr>
                                    <td>Refund Status</td>
                                    <td>
                                        <Refund
                                            id={data.id}
                                            reservationState={data.reservationState}
                                            transactionData={transaction}
                                            refundData={data.refundStatus}
                                            cancelData={cancellationDetails}
                                        />



                                    </td>
                                </tr> */}
                                <tr>
                                    <td> Payout Amount  </td>

                                    <td><CurrencyConverter amount={amountPaytoHost}
                                        from={data.currency} />
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td>Payout Status</td>
                                    <td>
                                        <Payout
                                            hostId={data.hostId}
                                            checkIn={data.checkIn}
                                            id={data.id}
                                            hostPayout={data.hostPayout}
                                            amount={data.total}
                                            currency={data.currency}
                                            hostTransaction={data.hostTransaction}
                                            reservationState={data.reservationState}
                                            cancelData={data.cancellationDetails}

                                        />
                                    </td>
                                </tr> */}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }

}
const mapState = (state) => ({
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});

const mapDispatch = {
    viewReceiptAdmin,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ViewReservation));



