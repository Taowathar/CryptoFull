import React, { useEffect, useState } from "react";
import Crypto from "./Crypto";
import { useAxiosGet } from "../hooks/axiosGet";

const FavoriteList = ({
  setCryptoId,
  setIsFavorite,
  openModal,
  setSelectedCrypto,
  user,
  loggedIn
}) => {
  if (user === undefined) {
    user = { id: "1" };
  }

  let [favorites, setFavorites] = useState([]);
  let [, storage] = useAxiosGet(
    `/api/favorite/${user.id}`,
    []
  );

  useEffect(() => {
    setFavorites(storage);
  }, [storage]);

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
            {loggedIn ? <th></th>: null}
          </tr>
        </thead>
        <tbody>
          {favorites &&
            favorites.map((crypto) => (
              <Crypto
                openModal={openModal}
                key={crypto.id}
                crypto={crypto}
                isFavorite={true}
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

export default FavoriteList;
