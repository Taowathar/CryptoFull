import Crypto from "./Crypto";

const CryptoList = ({ cryptoList, openModal, setCryptoId, setIsFavorite, setSelectedCrypto, user, loggedIn }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr id="table-head">
            {loggedIn ? <th className="table-column-favorite"></th> : null}
            <th
              className="table-column-logo"
              style={{ textAlign: "left", transform: "translateX(22%)" }}
            >
              Name
            </th>
            <th className="table-column-symbol">Symbol</th>
            <th className="table-column-price" style={{ padding: "10px" }}>
              Price (USD)
            </th>
            <th className="table-column-change" style={{ padding: "10px" }}>
              Change (24h)
            </th>
            {loggedIn ? <th></th> : null}
          </tr>
        </thead>
        <tbody>
          {cryptoList.map((crypto) => (
            <Crypto
              key={crypto.id}
              crypto={crypto}
              openModal={openModal}
              isFavorite={false}
              setCryptoId={setCryptoId}
              setIsFavorite={setIsFavorite}
              setSelectedCrypto={setSelectedCrypto}
              user={user} loggedIn={loggedIn}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
