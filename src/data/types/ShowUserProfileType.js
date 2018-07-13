import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import ReviewsType from './ReviewsType';
import ProfileType from './ProfileType';
import {Reviews} from '../models';

const ShowUserProfileType = new ObjectType({
  name: 'ShowUserProfile',
  fields: {
    userId: { type: StringType },
    profileId: { type: IntType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    createdAt: { type: StringType },
    picture:  { type: StringType },
    reviewsCount: {
      type: IntType,
      async resolve(profile) {
        return await Reviews.count({
          where: {
            userId: profile.userId
          }
        });
      }
    },
    userData: {
      type: ProfileType,
      resolve(reviews) {
        return UserProfile.findOne({
          where: { profileId: reviews.profileId }
        });
      }
    },
    reviews: {
      type: new List(ReviewsType),
      async resolve(profile) {
        return await Reviews.findAll({
          where: {
            userId: profile.userId
          },
          limit: 1
        });
      }
    }
  },
});

export default ShowUserProfileType;
