import UserAccountType from '../types/userAccountType';
import { User, UserLogin, UserClaim, UserProfile } from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const userAccount = {

  type: UserAccountType,

  async resolve({ request, response }) {

      if(request.user && request.user.admin != true) {

      //Collect from Logged-in User
      let loggedInId = request.user.id;
      let loggedInEmail = request.user.email;

      /*return await UserProfile.findOne({
        where: { userId: loggedInId }
      });*/

      // Get All User Profile Data
      const userProfile = await UserProfile.find({
        attributes: [
          'profileId',
          'firstName',
          'lastName',
          'displayName',
          'dateOfBirth',
          'gender',
          'phoneNumber',
          'preferredLanguage',
          'preferredCurrency',
          'location',
          'info',
          'createdAt',
          'picture'
        ],
        where: { userId: request.user.id},
      });

      const userEmail = await User.findOne({
        attributes:[
          'email'
        ],
        where: { id: request.user.id}
      })

        if (userProfile && userEmail ) {

        return {
          userId: request.user.id,
          profileId: userProfile.dataValues.profileId,
          firstName: userProfile.dataValues.firstName,
          lastName: userProfile.dataValues.lastName,
          displayName: userProfile.dataValues.displayName,
          gender: userProfile.dataValues.gender,
          dateOfBirth: userProfile.dataValues.dateOfBirth,
          email: userEmail.email,
          phoneNumber: userProfile.dataValues.phoneNumber,
          preferredLanguage: userProfile.dataValues.preferredLanguage,
          preferredCurrency: userProfile.dataValues.preferredCurrency,
          location: userProfile.dataValues.location,
          info: userProfile.dataValues.info,
          createdAt: userProfile.dataValues.createdAt,
          picture: userProfile.dataValues.picture,
          status: "success"
        }

      }
    } else {
      return {
        status: "notLoggedIn"
      }
    }
  },
};

export default userAccount;
