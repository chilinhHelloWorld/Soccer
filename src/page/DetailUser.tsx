import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { countriesSearch } from "../data/countriesSearch";
import { positionsSearch } from "../data/positionsSearch";
import football from "../image/football.jpg";
import icon from "../image/football.png";
import { Player } from "../interfaces/InterfaceUser";
interface props {}

const DetailPlayer: React.FC<props> = () => {
  let { id } = useParams();
  const [userData, getUserData] = useState<Player>();
  const getUser = async () => {
    const { data } = await axios({
      url: `https://localhost:${process.env.REACT_APP_API_PORT}/api/Player/${id}`,
      method: "GET",
    });
    if (data) getUserData(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="wrapper">
      {userData ? (
        <div className="player">
          <div className="player-info">
            <h3>Player Information</h3>
            <ul>
              <li>
                Name: <strong className="gray">{userData.playerName}</strong>
              </li>
              <li>
                DoB:{" "}
                <strong className="gray">
                  {format(new Date(userData.dateOfBirth), "dd-MM-yyyy")}
                </strong>
              </li>
              <li>
                Nationality:{" "}
                <strong className="gray">
                  {
                    //@ts-ignorets
                    countriesSearch[userData.nativeCountry] //@ts-ignore
                      ? countriesSearch[userData.nativeCountry]
                      : userData.nativeCountry
                  }
                </strong>
              </li>
              <li>
                Position:{" "}
                <strong className="gray">
                  {
                    //@ts-ignore
                    positionsSearch[userData.position]
                      ? //@ts-ignore
                        positionsSearch[userData.position]
                      : userData.position
                  }
                </strong>
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
