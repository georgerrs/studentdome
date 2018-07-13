import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ViewMessage from './ViewMessage';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';

const title = 'ViewMessage';

export default {

  path: '/message/:threadId/:type',

  action({ store, params }) {

  	// From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;

    const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    //log("is admin", isAdminAuthenticated);
    
    // From URL
    const threadId = Number(params.threadId);
    const userType = params.type;
    
    if (!isAdminAuthenticated) {
      if (!isAuthenticated) {
        return { redirect: '/login' };
      }
    }

    if(userType != 'host' && userType != 'guest') {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    // if (isAdminAuthenticated) {
    //   return {
    //     title,
    //     component: <UserLayout><ViewMessage threadId={threadId} userType={userType} /></UserLayout>,
    //   };
    // } else {
    //   return { redirect: '/login' };
    // } 

    return {
      title,
      component: <UserLayout><ViewMessage threadId={threadId} userType={userType} /></UserLayout>,
    };
  },

};
