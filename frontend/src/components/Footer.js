import react, {useState} from "react"
import { Link } from "react-router-dom";
import { BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";
import { AiFillHome, AiFillAppstore} from "react-icons/ai";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiStore } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";


const Footer = () => {

    const [active, setActive] = useState("home")

    return (
        <div className="footer">            
                    
             <div>            
            <ul>
                <li>
                    <Link to="/">
                        {/* <span ><AiFillHome /></span> */}
                        <span >Home</span>
                    </Link>
                </li>
                <li >
                    <Link to="/">
                        {/* <span ><AiFillAppstore/></span> */}
                        <span>Official Store</span>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        {/* <span ><BiStore/></span> */}
                        <span>Market Place</span>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        {/* <span ><BsFillBookmarkHeartFill/></span> */}
                        <span> Saved NFTs</span>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        {/* <span><FaUserAlt/></span> */}
                        <span >Profile</span>
                    </Link>
                </li>        
              
           </ul>
            </div>  <div>            
                <h3>Proyecto ZzZz</h3>
            </div> <div>            
                    <a target="_blank" rel="noreferrer"  rel="noopener" href={'https://www.instagram.com'}><BsInstagram  className="instagramfooter" /></a>
                    <a target="_blank" rel="noreferrer"  rel="noopener" href={'https://www.facebook.com'}><BsFacebook as={Link} className="facebookfooter" /></a>
                    <a target="_blank" rel="noreferrer"  rel="noopener" href={'https://www.youtube.com'}><BsYoutube as={Link} className="youtubefooter"/></a>
            </div>               
                     
            <div>            
                <h5>© Copyright - 2022 Mindhub</h5>
            </div>            
                {/* <img
                    height="110"
                    width="140"
                    className="logofooter"
                    src={logofooter}
                />{" "} */}               
        </div>
    )
}

export default Footer
