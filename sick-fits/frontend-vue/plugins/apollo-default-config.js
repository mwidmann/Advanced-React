import { endpoint } from '../config'

export default function(context) {
  return {
    httpEndpoint: endpoint,
    httpLinkOptions: {
      credentials: 'include',
    },
    clientState: {
      defaults: {
        cartOpen: false,
      },
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            const { cartOpen } = cache.readQuery({
              query: require('~/graphql/queries/LocalState.gql'),
            })
            const data = {
              data: {
                cartOpen: !cartOpen,
              },
            }
            cache.writeData(data)
            return data
          },
        },
      },
    },
  }
}
