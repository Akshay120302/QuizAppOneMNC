import React from "react";
import {Link} from 'react-router-dom';
import "../style/style2.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { useAuth0 } from "@auth0/auth0-react";
import profile from "../images/Fifth/profile.jpeg";
import profile2 from "../images/Fifth/profile2.jpeg";
import profile3 from "../images/Fifth/profile3.jpeg";
import profile4 from "../images/Fifth/profile4.jpeg";
import rectangle1 from "../images/Fifth/Rectangle1.png";
import rectangle2 from "../images/Fifth/Rectangle2.png";
import rectangle3 from "../images/Fifth/Rectangle3.png";

export const Second = () => {
    // const {isAuthenticated, user } = useAuth0();
    return (
        <div className="quiz-app-UI-design">
            <div className="overlap-wrapper2">
                <div className="overlap2">
                    <div className="rectangle2" />
                    <div className="ellipse2" />
                    <div className="div2" />
                    <div className="ellipse2-2" />
                    <div className="ellipse2-3" />
                    <div className="ellipse2-4">
                    <FontAwesomeIcon icon={faUser}/>
                        <i className="fa-solid fa-user"></i>
                    
                    </div>
                    <img className="rectangle2-2" alt="Rectangle" src={rectangle1} />
                    <img className="rectangle2-3" alt="Rectangle" src={rectangle2}/>
                    <img className="rectangle2-4" alt="Rectangle" src={rectangle3} />
                    <div className="rectangle2-5" />
                    <div className="text-wrapper2">Today</div>
                    <div className="text-wrapper2-2">1</div>
                    <div className="text-wrapper2-3">2</div>
                    <div className="text-wrapper2-4">3</div>
                    <div className="text-wrapper2-5">Month</div>
                    <div className="text-wrapper2-6">453pt</div>
                    <div className="text-wrapper2-7">433pt</div>
                    <div className="text-wrapper2-8">442pt</div>
                    <div className="text-wrapper2-9">All Times</div>
                    <img className="ellipse2-5" alt="Ellipse" src={profile2} />
                    <img className="ellipse2-6" alt="Ellipse" src={profile3} />
                    <img className="ellipse2-7" alt="Ellipse" src={profile4} />
                    <img className="ellipse2-8" alt="Ellipse" src={profile} />
                    <img className="ellipse2-9" alt="Ellipse" src={profile2} />
                    <img className="ellipse2-10" alt="Ellipse" src={profile2} />
                    <img className="ellipse2-11" alt="Ellipse" src={profile2} />
                    <div className="text-wrapper2-10">04</div>
                    <div className="text-wrapper2-11">Moni</div>
                    <div className="text-wrapper2-12">Esha</div>
                    <div className="text-wrapper2-13">Kaosar</div>
                    <div className="text-wrapper2-14">Sam</div>
                    <div className="text-wrapper2-15">Jon</div>
                    <div className="text-wrapper2-16">05</div>
                    <div className="text-wrapper2-17">06</div>
                    <div className="text-wrapper2-18">07</div>
                    <div className="rectangle2-6" />
                    <img className="ellipse2-12" alt="Ellipse" src={profile2} />
                    <div className="text-wrapper2-19">18</div>
                    <div className="group2">
                        <div className="overlap-group2">
                            <div className="rectangle2-7" />
                            <div className="text-wrapper2-20">223pt</div>
                        </div>
                    </div>
                    <div className="overlap-group-wrapper2">
                        <div className="overlap-group2">
                            <div className="rectangle2-7" />
                            <div className="text-wrapper2-21">160pt</div>
                        </div>
                    </div>
                    <div className="div-wrapper2">
                        <div className="overlap-group2">
                            <div className="rectangle2-7" />
                            <div className="text-wrapper2-21">140pt</div>
                        </div>
                    </div>
                    <div className="group2-2">
                        <div className="overlap-group2">
                            <div className="rectangle2-7" />
                            <div className="text-wrapper2-22">130pt</div>
                        </div>
                    </div>
                    <div className="group2-3">
                        <div className="overlap-group2">
                            <div className="rectangle2-7" />
                            <div className="text-wrapper2-22">120pt</div>
                        </div>
                    </div>
                    {/* <img className="frame2" alt="Frame" src="frame-1261155442.svg" /> */}
                    <Link to="/">
                    <svg className="frame2" width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6461 23.6604L16.5561 24.6771C16.0945 25.1076 15.3482 25.1076 14.8915 24.6771L5.34617 15.7786C4.88461 15.3481 4.88461 14.6519 5.34617 14.226L14.8915 5.32288C15.3531 4.89237 16.0994 4.89237 16.5561 5.32288L17.6461 6.33959C18.1126 6.77467 18.1028 7.48454 17.6265 7.91046L11.7097 13.1681H25.8216C26.4746 13.1681 27 13.6581 27 14.2672V15.7328C27 16.3419 26.4746 16.8319 25.8216 16.8319H11.7097L17.6265 22.0895C18.1077 22.5155 18.1175 23.2253 17.6461 23.6604Z" fill="white" fillOpacity="0.9" />
          </svg>
          </Link>
                </div>
            </div>
        </div>
    );
};
export default Second;