import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { genderName } = useParams();

  const [searchInput, setSearchInput] = useState("");

  const searchClickHandler = (e) => {
    e.preventDefault();
    navigate(
      `/cloth/${genderName || "All"}?query=${encodeURIComponent(searchInput)}`
    );
    setSearchInput("");
  };

  const cartItems = useSelector((state) => state.cart.cartItems.items);
  console.log(cartItems);

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-light">
          <div className="container-fluid mx-5">
            <NavLink className="navbar-brand display-2" to="/">
              <h1>StyleMe</h1>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navBar"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-center mt-2"
              id="navBar"
            >
              <ul className="navbar-nav me-5">
                <li className="nav-item h6 px-3">
                  <NavLink className="nav-link" to="/cloth/All">
                    ALL
                  </NavLink>
                </li>
                <li className="nav-item h6 px-3">
                  <NavLink className="nav-link" to="/cloth/Men">
                    MEN
                  </NavLink>
                </li>
                <li className="nav-item h6 px-3">
                  <NavLink className="nav-link" to="/cloth/Women">
                    WOMEN
                  </NavLink>
                </li>
                <li className="nav-item h6 px-3">
                  <NavLink className="nav-link" to="/cloth/Kids">
                    KIDS
                  </NavLink>
                </li>
              </ul>

              <form
                className="d-flex w-100 justify-content-between"
                role="search"
                onSubmit={searchClickHandler}
              >
                <div
                  style={{ position: "relative", width: "100%" }}
                  className="me-5"
                >
                  <input
                    type="search"
                    style={{
                      paddingLeft: "2.75rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #ced4da",
                      padding: "0.5rem 2.75rem",
                    }}
                    placeholder="Search by title and t...."
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6c757d",
                      pointerEvents: "none",
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </div>
              </form>
            </div>
            <div className="ms-auto me-4">
              <NavLink
                className="btn btn-secondary px-4 text-light "
                to="/login"
              >
                Login
              </NavLink>
            </div>
            <div className="d-flex mt-1">
              <NavLink className="navbar-brand display-2 " to="/whislist">
                <h2>
                  <ion-icon name="heart-outline"></ion-icon>
                </h2>
              </NavLink>
              <NavLink
                className="navbar-brand display-2 ml-3 position-relative"
                to="/cart"
              >
                <h2>
                  <ion-icon name="cart-outline"></ion-icon>
                  <span
                    className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle text-light text-center"
                    style={{
                      fontSize: "0.95rem",
                      width: "1.50rem",
                      height: "1.50rem",
                      lineHeight: ".80rem",
                      margin: "0.25rem",
                    }}
                  >
                    {totalItemsInCart}
                  </span>
                </h2>
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
