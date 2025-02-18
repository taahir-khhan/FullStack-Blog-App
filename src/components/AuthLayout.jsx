import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && !authStatus) {
      // If the route requires authentication and the user is NOT logged in
      navigate("/login", { replace: true });
    } else if (!authentication && authStatus) {
      // If the route does NOT require authentication but the user is logged in
      navigate("/all-post", { replace: true });
    }
  }, [authStatus, navigate, authentication]);

  return <>{children}</>;
}

export default Protected;
