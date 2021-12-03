import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { countriesSearch } from "../data/countriesSearch";
import { positionsSearch } from "../data/positionsSearch";
import football from "../image/football.jpg";
import icon from "../image/football.png";
import { Player } from "../interfaces/Player";
interface props {}

const DetailPlayer: React.FC<props> = () => {
  const [player, setPlayer] = useState<Player>();
  let { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await axios({
      url: `https://localhost:${process.env.REACT_APP_API_PORT}/Player/${id}`,
      method: "GET",
    });
    if (data) setPlayer(data);
  };

  return (
    <div className="wrapper">
      <Link to="/" className="btn-link btn-back">
        Back
      </Link>
      {player ? (
        <div className="player">
          <div className="player-info">
            <h3>Player Information</h3>
            <ul>
              <li>
                Name: <strong className="gray">{player.playerName}</strong>
              </li>
              <li>
                DoB:{" "}
                <strong className="gray">
                  {format(new Date(player.dateOfBirth), "dd-MM-yyyy")}
                </strong>
              </li>
              <li>
                Nationality:{" "}
                <strong className="gray">
                  {
                    //@ts-ignorets
                    countriesSearch[player.nativeCountry] //@ts-ignore
                      ? countriesSearch[player.nativeCountry]
                      : player.nativeCountry
                  }
                </strong>
              </li>
              <li>
                Position:{" "}
                <strong className="gray">
                  {
                    //@ts-ignore
                    positionsSearch[player.position]
                      ? //@ts-ignore
                        positionsSearch[player.position]
                      : player.position
                  }
                </strong>
              </li>
              <li>
                Position: <strong className="gray">{player.overall}</strong>
              </li>
            </ul>
            <img src={icon} alt="" />
          </div>
          <div className="player-image">
            <img src={football} alt="" />
          </div>
        </div>
      ) : (
        <div> loading</div>
      )}
    </div>
  );
};
export default DetailPlayer;
