import img from '../image/download.png'
import Menus from './Menus';
const Home = () => {
    return(
        <div>
            <Menus></Menus>
            <div className="container">
        <h1>Training React</h1>
        <img src={img} alt="BigCo Inc. logo" />
      </div>
        </div>
    )
}
export default Home;