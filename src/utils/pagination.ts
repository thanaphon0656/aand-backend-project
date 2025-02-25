type buildDataReturn = {
  results: any;
  page: number;
  limit: number;
  total: number;
};

const checkPageLimit = (results: any, limit: number, page: number) => {
  if (limit == 0 && page == 0) {
    return results;
  }

  const numberOfItems = results.length;
  const numberPerPage = limit;
  const currentPage = page;
  const numberOfPages = Math.ceil(numberOfItems / numberPerPage);

  const trimStart = (currentPage - 1) * numberPerPage;
  const trimEnd = trimStart + numberPerPage;
  results = results.slice(trimStart, trimEnd);

  return results;
};

const buildDataReturn = ({ results, page, limit, total }: buildDataReturn) => {
  return {
    status: true,
    count: total,
    page: page,
    limit,
    data: results,
  };
};


export { checkPageLimit, buildDataReturn };
