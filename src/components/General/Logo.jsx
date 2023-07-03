import image from "../../assets/images/logo.png";
import {Link} from "react-router-dom"

const Logo = () => {
    return <Link to ="/" className="logo">
        <img className="logoImg" src={image} alt="BreadyDog"/>
    </Link>
}

export default Logo;