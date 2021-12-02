import football from "../image/football.jpg";
import icon from "../image/football.png";

interface props {}

const DetailPlayer: React.FC<props> = () => {
  return (
    <div className="wrapper">
      <div className="player">
        <div className="player-info">
          <h3>Player Information</h3>
          <ul>
            <li>
              Name: <strong className="gray">Blukaku</strong>
            </li>
            <li>
              DoB: <strong className="gray">22/11/1996 </strong>
            </li>
            <li>
              Nationality: <strong className="gray">Brazil</strong>
            </li>
          </ul>
          <img src={icon} alt="" />
        </div>
        <div className="player-image">
          <img src={football} alt="" />
        </div>
      </div>
    </div>
  );
};
export default DetailPlayer;
