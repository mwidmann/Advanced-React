import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      quantity
    }
  }
`;

class AddToCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.string,
  };

  render() {
    const { id, children } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { loading, error }) => (
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              addToCart().catch(err => {
                alert(err.message);
              });
            }}
          >
            Add{loading ? 'ing' : ''} To Cart 🛒
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToCart;
