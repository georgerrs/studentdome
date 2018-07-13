import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

const UserVerifiedInfoType = new ObjectType({
  name: 'UserVerifiedInfo',
  fields: {
    id: { type: IntType },
    userId: { type: new NonNull(ID) },
    isEmailConfirmed: { type: BooleanType },
    isFacebookConnected: { type: BooleanType },
    isGoogleConnected: { type: BooleanType },
    isIdVerification: { type: BooleanType },
    status: { type: StringType },
    isPhoneVerified: { type: BooleanType },
  },
});

export default UserVerifiedInfoType;