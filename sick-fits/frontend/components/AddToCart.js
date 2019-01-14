import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

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
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }}>
        {(addToCart, { error }) => (
          <button
            type="button"
            onClick={() => {
              addToCart().catch(err => {
                alert(err.message);
              });
            }}
          >
            {children}
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToCart;
