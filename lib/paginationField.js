import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will handle it
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // check if we have existing items;
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are some, but not enough for the request, and on the last page - just send
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, just reutrn them from the cache, and we don't need to go to the network
      if (items.length) {
        /* console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`
        ); */
        return items;
      }

      return false; // fallback to network

      // asks the read function for those items
      // we can either return the items b/c they are in the cache
      // or we can return false so there will be an network request
      // if the items are returned from the network, run merge
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // after a network request, this function is run.
      // console.log(`merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      return merged;
    },
  };
}
