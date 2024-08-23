import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        timer: 5000,
      });
    }
  };

  const posisiLogin = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg bg-danger rounded mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#" to="/">
          MyClub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/"
                to="/"
              >
                NEWS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/"
                to="/schedule"
              >
                SCHEDULE
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/"
                to="/tranfermarket"
              >
                TRANFERMARKET
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/"
                to="/home/myclub"
              >
                MyClub
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/"
                to="/home/mydreamclub"
              >
                MyDreamClub
              </Link>
            </li>
            {posisiLogin && (
              <li className="nav-item">
                <Link
                  onClick={handleLogout}
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Logout
                </Link>
              </li>
            )}
            {!posisiLogin && (
              <li className="nav-item">
                <Link
                  onClick={handleLogout}
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
