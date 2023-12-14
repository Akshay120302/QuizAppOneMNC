import { useEffect, useState } from "react";
// import 'font-awesome/css/font-awesome.min.css';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../style/Menu.css";
import { useSelector } from "react-redux";

const Menu = ({
  closeMenu,
  handleShowListings,
  setShowSearch,
  handleSubmit,
  setSearchTerm,
  searchTerm,
  setShowListing,
  showListing
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="modal-wrapper2">
        <div className="modal-container2">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="closeMenu"
            onClick={closeMenu}
            size="lg"
          />
          <div className="menu">
            <div className="fir">
              <div className="ProfileImg">
                <FontAwesomeIcon icon={faUser} className="fa-solid fa-user" />
                {/* <i className="fa-solid fa-user"></i> */}
              </div>

              <div className="UserName" onClick={handleShowListings}>
                {currentUser ? currentUser.username : "User Profile"}
              </div>

              {/* {showListing && <Fifth userListings={userListings}/>} */}
            </div>

            <div className="fir">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  setShowListing(false);
                  closeMenu();
                  setShowSearch(true);
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="SearchBar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            </div>

            <div className="fir">
              <Link to="/CreateQuiz">Create Quiz</Link>
            </div>

            <div className="fir" style={{cursor: "pointer" }}>Contact</div>

            <div className="fir" style={{cursor: "pointer" }}>About OneMNC</div>

            <div className="fir" style={{cursor: "pointer" }}>Settings</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
