import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { CartStateProvider } from '../lib/cartState';
import { Pagination } from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination />', () => {
  it('displays a loading message', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={makePaginationMocksFor(1)}>
          <Pagination />
        </MockedProvider>
      </CartStateProvider>
    );
    expect(container).toHaveTextContent('Loading...');
  });
  it('renders pagination for 18 items', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={makePaginationMocksFor(18)}>
          <Pagination page={1} />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByTestId('pagination');
    expect(container).toHaveTextContent('Page 1 of 5');
    expect(container).toMatchSnapshot();
  });
  it('disables the prev on first page', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={makePaginationMocksFor(18)}>
          <Pagination page={1} />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
  it('disables the next on the last page', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={makePaginationMocksFor(18)}>
          <Pagination page={5} />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });
  it('enables all on middle page', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={makePaginationMocksFor(18)}>
          <Pagination page={3} />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
});
