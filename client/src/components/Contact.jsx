import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyLoginModal from "./MyLoginModal.jsx";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../style/style5.css";
// import First from "./First.jsx";
// import CreateQuiz from "./CreateQuiz.jsx";

const Contact = () => {
  const navigate = useNavigate();

  const [signin, setSignIn] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const closeLoginModal = () => setShowLoginModal(false);

  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => setShowMenu(false);

  // const [showListingsError, setShowListingsError] = useState(false);

  // const [userListings, setUserListings] = useState([]);

  // const [showListing, setShowListing] = useState(false);

  // const [showSearch, setShowSearch] = useState(false);

  // const [quiz, setQuiz] = useState(false);

  // const [questionsID, setQuestionsID] = useState("");

  // const handleShowListings = async () => {
  //   try {
  //     setShowListingsError(false);
  //     const res = await fetch(`/API/user/listings/${currentUser._id}`, {
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       setShowListingsError(true);
  //       return;
  //     }

  //     setUserListings(data);
  //     // console.log(userListings);
  //     setShowListing(true);
  //     closeMenu();
  //     navigate("/");
  //   } catch (error) {
  //     setShowListingsError(true);
  //   }
  // };

  // const handleQuizStart = () => {
  //   setQuiz(true);
  // };

  // const handleQuizDelete = async (listingId) => {
  //   try {
  //     const res = await fetch(`/API/listing/delete/${listingId}`, {
  //       method: "DELETE",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       console.log(data.message);
  //       return;
  //     }

  //     setUserListings((prev) =>
  //       prev.filter((listing) => listing._id !== listingId)
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const [quizUpdate, setUpdateQuiz] = useState(false);

  // const [listingID, setListingID] = useState("");

  // // Search functionality for Menu
  // const [searchTerm, setSearchTerm] = useState("");

  // const [loading, setLoading] = useState(false);
  // const [listings, setListings] = useState([]);
  // const [showMore, setShowMore] = useState(false);

  // const fetchListings = async () => {
  //   setLoading(true);
  //   setShowMore(false);
  //   const res = await fetch(`/API/listing/get?title=${searchTerm}`);
  //   const data = await res.json();
  //   if (data.length > 5) {
  //     setShowMore(true);
  //   } else {
  //     setShowMore(false);
  //   }
  //   setListings(data);
  //   setLoading(false);
  //   navigate(`/?title=${searchTerm}`);
  // };

  // const handleSubmit = (e) => {
  //   // e.preventDefault();
  //   fetchListings();
  // };

  // // console.log(listings)

  // const onShowMoreClick = async () => {
  //   const numberOfListings = listings.length;
  //   const startIndex = numberOfListings;
  //   const urlParams = new URLSearchParams(location.search);
  //   urlParams.set("startIndex", startIndex);
  //   const searchTerm = urlParams.toString();
  //   const res = await fetch(`/API/listing/get?title=${searchTerm}`);
  //   const data = await res.json();
  //   if (data.length < 6) {
  //     setShowMore(false);
  //   }
  //   setListings([...listings, ...data]);
  // };

  // useEffect(() => {
  //   handleSubmit(); // Call the function on component mount
  // }, []);

  return (
    <>
      <div className="quiz-app-UI-design">
        <div className="div5">
          <div className="overlap-group5">
            <div className="ellipse5" />
            <div className="rectangle5" />
            <div className="group5">
              <div className="ellipse5-2" />
              <div className="ellipse5-3" />
              <div className="ellipse5-4" />
              <div className="ellipse5-5" />
            </div>
            <div className="frame5">
              {/* <div className="text-wrapper5">Popular</div> */}
              <div className="frame5-2">
                {/* <div className="frame5-3"></div> */}
              </div>
            </div>
            <div className="frame5-4">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  idname="frame5-5"
                  style={{ color: "#ffffff", transform: "scale(1.5)" }}
                />
              </Link>

              {showMenu && <Menu closeMenu={closeMenu} />}

              {showLoginModal && (
                <MyLoginModal closeLoginModal={closeLoginModal} />
              )}
            </div>
            <div
              className="ellipse-wrapper5New"
              onClick={() => setShowLoginModal(true)}
            >
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt="User"
                  className="profileImgFifth"
                />
              ) : (
                <>
                  <FontAwesomeIcon icon={faUser} />

                  {/* {console.log("This is " + signin)} */}
                </>
              )}
              {/* <FontAwesomeIcon icon={faUser} /> */}
            </div>
          </div>
          <div className="container5">
            Hi This page is under construction , thanks for showing your
            patience !!
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
