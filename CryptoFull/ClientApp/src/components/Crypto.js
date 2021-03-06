import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { InvestButton } from "./InvestButton";
import axios from "axios";
import { useAxiosGet } from "../hooks/axiosGet";

const Crypto = ({
  crypto,
  openModal,
  isFavorite,
  setCryptoId,
  setIsFavorite,
  setSelectedCrypto,
  user,
  loggedIn
}) => {
  if (user === undefined) {
    user = { id: "1" };
  }
  const [favorite, setfavorite] = useState(isFavorite);
  let [, storage] = useAxiosGet(
    `/api/favorite/${user.id}`,
    []
  );

  useEffect(() => {
    if (storage) {
        for (let cryp of storage) {
        if (cryp.id === crypto.id) {
          crypto.favoriteId = cryp.favoriteId;
          setfavorite(true);
        }
      }
    }
  }, [storage, crypto]);

  const changeFavorite = () => {
    setfavorite(!favorite);
    if (favorite) {
      axios.delete(
        `/api/favorite/${crypto.id}/${user.id}`
      );
    } else {
      axios.post(`/api/favorite/${user.id}`, crypto);
    }
  };

  const setId = () => {
    setCryptoId(crypto.id);
    setSelectedCrypto(crypto);
    setIsFavorite(favorite);
  };

  function onClick() {
    openModal(crypto);
  }

  const change = crypto.price_change_percentage_24h;

  return (
    <tr>
      {loggedIn ? <td style={{ transform: "translate(28%, 8%)" }}>
        <div className="favoriteButton" onClick={changeFavorite}>
          {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      </td> : null}
      <td>
        <Link
          className="detail-link"
          to={`/details/${crypto.id}`}
          onClick={setId}
        >
          <div className="table-data-name">
            <img className="crypto-img" src={crypto.image} alt="logo" />
            <span style={{ transform: "translateY(10%)" }}>{crypto.name}</span>
          </div>
        </Link>
      </td>
      <td className="crypto-symbol">{crypto.symbol}</td>
      <td style={{ textAlign: "right", padding: "10px" }}>
        $
        {crypto.current_price
          ? `${crypto.current_price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : ""}
      </td>

      <td
        style={
          change < 0
            ? { color: "red", textAlign: "right", padding: "10px" }
            : { color: "green", textAlign: "right", padding: "10px" }
        }
      >
        {!change
          ? ""
          : change < 0
          ? `${change.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}%`
          : `+${change.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}%`}
      </td>
      {loggedIn ? <td className="investButton">
        <InvestButton onClick={onClick}>Invest</InvestButton>
      </td> : null}
    </tr>
  );
};

export default Crypto;
