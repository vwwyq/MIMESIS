import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { AppDispatch } from '../redux/store';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const user = resultsFromGoogle.user;

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    googlePhotoUrl: user.photoURL,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            } else {
                dispatch(signInFailure(data.message));
            }
        } catch (error) {
            dispatch(signInFailure((error as Error).message));
            console.error('Google sign-in failed:', error);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all"
            onClick={handleGoogleClick}
        >
            <AiFillGoogleCircle className="w-6 h-6" />
            Continue with Google
        </motion.button>
    );
}
