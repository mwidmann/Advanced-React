import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';

const PleaseSignIn = props => {
  const { children } = props;
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { me }, loading }) => {
        if (loading) return <p>loading...</p>;
        if (!me)
          return (
            <div>
              <p>Please sign in</p>
              <Signin />
            </div>
          );
        return children;
      }}
    </Query>
  );
};

export default PleaseSignIn;
