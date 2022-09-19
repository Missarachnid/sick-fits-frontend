import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PleaseSignIn from '../components/PleaseSignIn';

import RequestReset from '../components/RequestReset';

import { useUser } from '../components/User';
import DisplayError from '../components/ErrorMessage';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const AccountStyles = styled.div`
  .account {
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.07);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    padding: 20px;
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 600;
    margin: 20px 0;
  }
`;
const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      date
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}
function formatDate(inp) {
  return new Date(inp).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function AccoutPage() {
  const me = useUser();
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;

  return (
    <PleaseSignIn>
      <AccountStyles>
        <div className="account">
          <h2>Account Information</h2>
          <p>Name: {me?.name}</p>
          <p>Email: {me?.email}</p>
        </div>

        <div className="account">
          <h2>You have {allOrders.length} orders</h2>
          <OrderUl>
            {allOrders.map((order) => (
              <OrderItemStyles key={order.id}>
                <Link href={`/order/${order.id}`}>
                  <a>
                    <div className="order-meta">
                      <p>{countItemsInAnOrder(order)} Items</p>
                      <p>{formatDate(order.date)}</p>
                      <p>
                        {order.items.length} Product
                        {order.items.length === 1 ? '' : 's'}
                      </p>
                      <p>{formatMoney(order.total)}</p>
                    </div>
                    <div className="images">
                      {order.items.map((item) => (
                        <img
                          key={`image-${item.id}`}
                          src={item.photo?.image?.publicUrlTransformed}
                          alt={item.name}
                        />
                      ))}
                    </div>
                  </a>
                </Link>
              </OrderItemStyles>
            ))}
          </OrderUl>
        </div>

        <RequestReset />
      </AccountStyles>
    </PleaseSignIn>
  );
}

/* Before Orders Change
import styled from 'styled-components';
import { useUser } from '../components/User';
import RequestReset from '../components/RequestReset';
import PleaseSignIn from '../components/PleaseSignIn';

const AccountStyles = styled.div`
  #account {
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    padding: 20px;
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 600;
  }
`;

export default function AccoutPage() {
  const me = useUser();

  return (
    <PleaseSignIn>
      <AccountStyles>
        <div id="account">
          <h2>Account Information</h2>
          <p>Name: {me?.name}</p>
          <p>Email: {me?.email}</p>
        </div>

        <RequestReset />
      </AccountStyles>
    </PleaseSignIn>
  );
}



*/
