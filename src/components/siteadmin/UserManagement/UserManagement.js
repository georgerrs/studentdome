import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td } from  'reactable';
import { connect } from 'react-redux';

import { deleteUser } from '../../../actions/siteadmin/users';
import Link from '../../../components/Link';
import messages from './messages';

// Toaster
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserManagement.css';
import * as FontAwesome from 'react-icons/lib/fa';

class UserManagement extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    editUser: PropTypes.func,
    deleteUser: PropTypes.func,
    title: PropTypes.string.isRequired,
  };

  render () {
    const { data, editUser, deleteUser, title } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <div className={'table-responsive'}>
          {
            data && data.length > 0 && <a
              href="/export-admin-data?type=users"
              className={cx('pull-right', s.exportLink)}
            >
              Export Data into CSV
            </a>
          }
          <Table className="table"
            filterable={['First name', 'Last name', 'Email address', 'Phone number']}
            noDataText="No matching records found."
            sortable={true}
            defaultSort={{column: 'Created Date', direction: 'desc'}}
            itemsPerPage={20}
          >
            {
              data && data.map(function(value, key) {
                return (
                    <Tr key={key}>
                      <Td column={"Profile Id"} data={value.profile.profileId} />
                      <Td column={"First name"} data={value.profile.firstName} />
                      <Td column={"Last name"} data={value.profile.lastName} />
                      <Td column={"Email address"} data={value.email} />
                      <Td column={"Phone number"} data={value.profile.phoneNumber} />
                      <Td column={"Created Date"} data={moment(value.profile.createdAt).format('MM/DD/YYYY')} />
                      <Td column="View">
                        <a href={"/users/show/" + value.profile.profileId} target="_blank" >
                          View
                        </a>
                      </Td>
                      <Td column="Delete">
                      <div>
                        <Confirm
                          onConfirm={() => deleteUser(value.id, value.profile.profileId)}
                          body="Are you sure you want to delete this?"
                          confirmText="Confirm Delete"
                          title="Deleting User"
                        >
                          <a href="javascript:void(0)">Delete</a>
                        </Confirm>
                      </div>
                      </Td>
                    </Tr>
                )
              })
            }
          </Table>
          </div>
        </div>
      </div>
      );
    }

}

const mapState = (state) => ({
});

const mapDispatch = {
  deleteUser,
};

export default withStyles(s)(connect(mapState, mapDispatch)(UserManagement));

