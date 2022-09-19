import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import propTypes from 'prop-types';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import { useUser } from './User';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ButtonListStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  justify-items: center;
  width: 60%;
  box-shadow: var(--bs);
  border: 2px solid var(--lightGrey);
  height: 50px;
  margin: 20px auto;
  button {
    background: none;
    border: none;
    margin: 0 auto;
  }
  span {
    border-right: 2px solid var(--lightGrey);
    height: 100%;
  }
  a {
    margin: 0 auto;
  }
`;
const WarningStyles = styled.div`
  text-align: center;
`;

function SingleProduct({ id }) {
  const me = useUser();
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  return (
    <div>
      <ProductStyles data-testid="singleProduct">
        <Head>
          <title>Sick Fits | {Product.name}</title>
        </Head>
        <img
          src={Product.photo.image.publicUrlTransformed}
          alt={Product.photo.altText}
        />
        <div className="details">
          <h2>{Product.name}</h2>
          <p>{Product.description}</p>
          <p>{formatMoney(Product.price)}</p>
        </div>
      </ProductStyles>
      {me === null ? (
        <WarningStyles>
          <p>Please sign in</p>
        </WarningStyles>
      ) : (
        <ButtonListStyles>
          <Link href={{ pathname: '/update', query: { id } }}>Edit ✏️</Link>
          <span />
          <AddToCart id={id} />
          <span />
          <DeleteProduct id={id}>Delete</DeleteProduct>
        </ButtonListStyles>
      )}
    </div>
  );
}

export { SINGLE_ITEM_QUERY, SingleProduct };

SingleProduct.propTypes = {
  id: propTypes.string,
};
