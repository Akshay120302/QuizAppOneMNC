import {GoogleAuthProvider , getAuth , signInWithPopup} from 'firebase/auth';
import { app } from './firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';

export default function OAuth({closeLoginModal}) {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {

            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth , provider);

            console.log(result);

            const res = await fetch('http://localhost:3001/API/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName , email : result.user.email, photo : result.user.photoURL}),
            });

            const data = await res.json();
            console.log(data)
            dispatch(signInSuccess(data));
            // navigate('./');
            closeLoginModal();

            
        } catch (error) {
            console.log("Could Not Sign In with Google", error);
        }
    }
  return (
    <button type="button" onClick={handleGoogleClick} style={{
        margin: "0px 20px 20px 63px",
        width: "200px",
        height: "50px",
        borderRadius: "10px",
        color: "#000000",
        backgroundColor: "#ffc102",
        fontSize: "16px",
        fontWeight: "600"
      }} className="btnL">
      CONTINUE WITH GOOGLE
    </button>
  );
}

    //style={{margin: "20px"},{width: "150px"},{height: "40px"},{border-radius: "10px"},{color: "#000000"},{margin-left: "83px"},{background-color: "#ffc102"},{font-size: "16px"},{font-weight: "600"}}

