import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useAxiosGet } from "./hooks/axiosGet";
import CryptoList from "./components/CryptoList";

function App() {
  let [currentPage, setCurrentPage] = useState(1);

  const pageCount = 100;
  const cryptoPerPage = 20;
  const cryptoListURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoPerPage}&page=${currentPage}&sparkline=false`;

  let cryptoList = null;
  const [, fetchedCryptoList] = useAxiosGet(cryptoListURL, [currentPage]);
  if (fetchedCryptoList) {
    cryptoList = fetchedCryptoList;
  }

  const handlePageChange = (selectedObject) => {
    setCurrentPage(selectedObject.selected);
  };

  return (
    <Router>
      <div className="App">
        <Route
          path="/"
          exact
          render={() => (
            <>
              <div className="table-container">
                {cryptoList && <CryptoList cryptoList={cryptoList} />}
              </div>
              <div className="pagination-field">
                <ReactPaginate
                  pageCount={pageCount}
                  pageRange={2}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination-field"}
                  previousLinkClassName={"page"}
                  breakClassName={"page"}
                  nextLinkClassName={"page"}
                  pageClassName={"page"}
                  disabledClassNae={"disabled"}
                  activeClassName={"active"}
                />
              </div>
            </>
          )}
        />
      </div>
    </Router>
  );
}

export default App;
