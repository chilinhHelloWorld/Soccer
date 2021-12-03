import football from "../image/football.jpg";
import icon from "../image/football.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User } from "../interfaces/InterfaceUser";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { countriesSearch } from "../data/countriesSearch";
import { positionsSearch } from "../data/positionsSearch";
interface props {}

const DetailPlayer: React.FC<props> = () => {
  let { id } = useParams();
  const [userData, getUserData] = useState<User>();
  const getUser = async () => {
    const user = await axios({
      url: `https://localhost:${process.env.REACT_APP_API_PORT}/api/Player/${id}`,
      method: "GET",
    });

    return user;
  };
  useEffect(() => {
    const user = getUser();
    user.then((response) => getUserData(response.data));
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
