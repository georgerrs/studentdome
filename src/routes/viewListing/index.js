import React from 'react';
import Layout from '../../components/Layout';
import ViewListing from './ViewListing';
import NotFound from '../notFound/NotFound';
import fetch from '../../core/fetch';
import {url, fileuploadDir} from '../../config.js';

const title = 'View Listing';

function renderNotFound() {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      status: 404,
    };
}

export default {

  path: '/rooms/:listId/:preview?',

  async action({ params }) {

    let listTitle, listDescription, listPhoto, lat, lng;
    const query = `
      query GetListMeta($listId: Int!) {
        getListMeta(listId: $listId) {
          id
          title
          description
          isPublished
          listPhotos {
            id
            name
          }
          status
          lat
          lng
        }
      }
    `;

    // From URI
    const listId = params.listId;
    let preview = false;
    
    if(params.preview) {
      preview = true;
    }

    if(listId === undefined || isNaN(listId)) {
      renderNotFound();
      return;
    }

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        variables: {listId}
      }),
    });
    const { data } = await resp.json(); 
    if(data && data.getListMeta) {
      if(!data.getListMeta.isPublished && !preview) {
        renderNotFound();
        return;
      }
      listTitle = data.getListMeta.title;
      listDescription = data.getListMeta.description;
      lat = data.getListMeta.lat;
      lng = data.getListMeta.lng;

      if(data.getListMeta.listPhotos && data.getListMeta.listPhotos.length > 0) {
        listPhoto = url +  '/' + fileuploadDir + data.getListMeta.listPhotos[0].name;
      }
    } else {
        renderNotFound();
        return;
    }
    return {
      title: listTitle || title,
      description: listDescription || '',
      image: listPhoto || '',
      component: <Layout><ViewListing title={title} preview={preview} lat={lat} lng={lng} listId={Number(listId)} /></Layout>,
    };
  },

};
