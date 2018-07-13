import CurrenciesType from '../../../types/CurrenciesType';
import { Currencies } from '../../../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const baseCurrency = {

  type: CurrenciesType,

  args: {
    id: { type: IntType },
  },

  async resolve({ request }, { id }) {

    if(request.user && request.user.admin == true) {

      let isCurrenciesUpdated = false;
      let isCurrencyUpdated = false;

      const updateCurrencies = await Currencies.update(
          {
              isBaseCurrency: false
          },
          {
            where:{}
          }
      )
      .then(function(instance){
          // Check if any rows are affected
          if(instance > 0) {
            isCurrenciesUpdated = true;
          }
      });

      if(isCurrenciesUpdated) {
          const updateCurrency = await Currencies.update(
                {
                    isBaseCurrency: true,
                    isEnable: true
                },
                {
                  where: {
                    id: id
                  }
                }
            )
            .then(function(instance){
                // Check if any rows are affected
                if(instance > 0) {
                  isCurrencyUpdated = true;
                }
            });

            if(isCurrencyUpdated) {
              return {
                  status: 'success'
              }
            } else {
                return {
                  status: 'failed'
                }
            }

      } else {
          return {
              status: 'failed'
          }
      }

    } else {
        return {
            status: "failed"
        }
    }
  },
};

export default baseCurrency;