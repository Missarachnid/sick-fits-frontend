import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { SINGLE_ITEM_QUERY, SingleProduct } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

const product = fakeItem();

const mocks = [
  {
    // when some one requests this query and variable combo
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    // return this data
    result: {
      data: {
        Product: product,
      },
    },
  },
];
const failedMock = [
  {
    // when some one requests this query and variable combo
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    // return this data
    result: {
      errors: [{ message: 'Item not found!!!' }],
    },
  },
];

describe('<SingleProduct', () => {
  it('renders with proper data', async () => {
    // we need to make some fake data
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <CartStateProvider>
          <SingleProduct id="123" />
        </CartStateProvider>
      </MockedProvider>
    );
    // wait for the testid to show up
    await screen.findByTestId('singleProduct');
    // debug();
    expect(container).toMatchSnapshot();
  });
  it('Errors out when an Item is not found', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={failedMock}>
        <CartStateProvider>
          <SingleProduct id="123" />
        </CartStateProvider>
      </MockedProvider>
    );
    // debug();
    await screen.findByTestId('graphql-error');
    expect(container).toHaveTextContent('Shoot!Item not found!!!');
  });
});
