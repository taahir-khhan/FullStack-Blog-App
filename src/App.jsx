import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components/index";
import { logIn, logOut } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUserState()
      .then((userData) => {
        if (userData) {
          dispatch(logIn(userData));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className='min-h-screen flex flex-col bg-black'>
      <Toaster position='top-right' />

      {/* Header */}
      <Header />

      {/* Main Content with Animation */}
      <main className='flex-grow'>
        <AnimatePresence mode='wait'>
          {loading ? (
            // Loading Spinner
            <div className='flex justify-center items-center h-full'>
              <div className='w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></div>
            </div>
          ) : (
            <Outlet />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
