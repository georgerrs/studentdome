import ShowListingType from '../types/ShowListingType';

import { Listing } from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ManageListings = {

  type: new List(ShowListingType),

  async resolve({ request }) {

    if(request.user && request.user.admin != true) {

      const listingData = await Listing.findAll({
        where: { userId: request.user.id },
        order: 'createdAt DESC'
      });

      return listingData;

    } else {
      return {
        status: "notLoggedIn"
      }
    }

  },
};

export default ManageListings;
