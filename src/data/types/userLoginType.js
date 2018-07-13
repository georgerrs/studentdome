import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserLogin = new ObjectType({
  name: 'userLogin',
  fields: {
    email: { type: StringType },
    password: { type: StringType },
    status: {type: StringType},
  },
});

export default UserLogin;
