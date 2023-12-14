import { useEffect, useState } from "react";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import "../style/MyLoginModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import OAuth from "./OAuth";
import { app } from "./firebase";

const MyLoginModal = ({ closeLoginModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formDataProfile, setFormDataProfile] = useState({});
  // console.log(formDataProfile);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const [signin, setSignIn] = useState(false);
  const dispatch = useDispatch();
  const url = signin
    ? "/API/auth/signin"
    : "/API/auth/signup";

  const [updateSuccess , setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        // console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormDataProfile({ ...formDataProfile, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    if (currentUser) {
      setFormDataProfile({
        ...formDataProfile,
        [e.target.id]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  //   console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      // API call
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // console.log(data);
      if (data.success === false) {
        // Registration successful, you might want to redirect or handle accordingly
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      if (signin === true) {
        closeLoginModal();
      } else {
        // setSignIn(true);
        closeLoginModal();
      }
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      // console.log(currentUser._id);
      dispatch(updateUserStart());
      const res = await fetch(
        `/API/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formDataProfile),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/API/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/API/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.reload();
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <>
      <div className="modal-wrapper"></div>
      <div className="modal-container">
        {currentUser ? (
          <>
            <div className="profilePage">
              <div className="closebutton">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="fa-solid fa-xmark"
                  onClick={closeLoginModal}
                />
              </div>
              <h3 className="center-profile">Profile</h3>
              <form className="UserDetails" onSubmit={handleSubmitUpdate}>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <img
                  id="avatar"
                  onChange={handleChange}
                  onClick={() => fileRef.current.click()}
                  src={formDataProfile.avatar || currentUser.avatar}
                  className="profileImg"
                  alt="UserProfilePic"
                />
                <p className="Upload">
                  {fileUploadError ? (
                    <span style={{ color: "red" }}>
                      Error Image Upload (image must be less than 2 mb)
                    </span>
                  ) : filePerc > 0 && filePerc < 100 ? (
                    <span
                      style={{ color: "grey" }}
                    >{`Uploading ${filePerc}%`}</span>
                  ) : filePerc === 100 ? (
                    <span style={{ color: "green" }}>
                      {" "}
                      Successfully Uploaded{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                {/* <span className='center'>{currentUser.username}</span> */}
                <input
                  type="text"
                  placeholder="username"
                  defaultValue={currentUser.username}
                  id="username"
                  onChange={handleChange}
                  className="input"
                />
                <br />
                <input
                  type="text"
                  placeholder="email"
                  defaultValue={currentUser.email}
                  id="email"
                  onChange={handleChange}
                  className="input"
                />
                <br />
                <input
                  type="password"
                  placeholder="password"
                  defaultValue={currentUser.password}
                  id="password"
                  onChange={handleChange}
                  className="input"
                />
                {/* {console.log(formDataProfile)} */}
                <br />
                {/* <span className='center'>{currentUser.email}</span> */}
                <div className="btn-holder">
                  <button disabled={loading} type="submit" className="btnL">
                    {loading ? "Loading..." : "Update"}
                  </button>
                  <div className="adjust">
                    <span style={{ color: "red" , cursor: "pointer" }} onClick={handleDelete}>delete account</span>
                    <span style={{ color: "red" , cursor: "pointer" }} onClick={handleSignOut}>sign out</span>
                  </div>
                  <p style={{color : "red"}}>{error ? error : ''}</p>
                  <p style={{color : "green"}}>{updateSuccess ? "User is successfully Updated" : ''}</p>
                </div>
              </form>
              {/* <span className="center" style={{color : "green"}}>Listings</span> */}
            </div>
          </>
        ) : (
          <>
            <div className="closebutton">
              {signin ? (
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="lg"
                  className="fa-solid fa-arrow-left"
                  onClick={() => {
                    setSignIn(false);
                  }}
                />
              ) : (
                ""
              )}
              <FontAwesomeIcon
                icon={faXmark}
                className="fa-solid fa-xmark"
                onClick={closeLoginModal}
              />
            </div>
            <div className="login">
              <div className="header">
                <h4 className="headingModal">
                  {signin ? "Sign In" : "Sign Up"}
                </h4>
              </div>
              {/* <br /> */}

              <form className="form" onSubmit={handleSubmit}>
                {signin ? (
                  ""
                ) : (
                  <input
                    type="text"
                    className="input"
                    placeholder="Login Name :"
                    id="username"
                    onChange={handleChange}
                  />
                )}
                <br />

                <input
                  type="text"
                  className="input"
                  placeholder="Email ID :"
                  id="email"
                  onChange={handleChange}
                />
                <br />

                <input
                  type="text"
                  className="input"
                  placeholder="Password :"
                  id="password"
                  onChange={handleChange}
                />
                <br />

                <button type="submit" className="btnL" disabled={loading}>
                  {loading ? "Loading..." : signin ? "SIGN IN" : "SIGN UP"}
                </button>
                <br />

                {signin ? (
                  <>
                    <OAuth closeLoginModal={closeLoginModal} />
                    <p className="signingoogle">
                      Don't have an account?{" "}
                      <span
                        style={{ color: "blue" , cursor: "pointer" }}
                        onClick={() => {
                          setSignIn(false);
                        }} 
                      >
                        Sign Up
                      </span>{" "}
                    </p>{" "}
                  </>
                ) : (
                  <>
                    <span
                      className="Login"
                      onClick={() => {
                        setSignIn(true);
                      }} // && setError(null);
                    >
                      Log In
                    </span>
                  </>
                )}
              </form>
            </div>
            {error && <p className="alert">{error}</p>}
          </>
        )}
      </div>
    </>
  );
};
export default MyLoginModal;
