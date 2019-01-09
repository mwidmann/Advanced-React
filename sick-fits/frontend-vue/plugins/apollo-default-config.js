import { endpoint } from '../config'
import { QUERY_LOCAL_STATE } from '../graphql/queries'

export default function(context) {
  return {
    httpEndpoint: endpoint,
    httpLinkOptions: {
      credentials: 'include',
    },
    clientState: {
      defaults: {
        cartOpen: true,
      },
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            const { cartOpen } = cache.readQuery({
              query: QUERY_LOCAL_STATE,
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
