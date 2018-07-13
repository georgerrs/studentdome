import ReportUserType from '../../../types/ReportUserType';
import { ReportUser } from '../../../models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType
} from 'graphql';

const getAllReport = {

    type: new List(ReportUserType),

    async resolve({ request }) {
        return await ReportUser.findAll({
            order: 'id DESC'
        });
    }
};

export default getAllReport;

/**
query getAllReport{
  getAllReport{
    id
    reporterId
    userId
    reportType
  }
}

**/