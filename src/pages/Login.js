import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../features/userSlice";
import { useState } from "react";
import UserForm from "./UserForm";
import UserView from "./UserView";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [selectedUser, setSelectedUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (user.name && user.phoneNumber && user.email && user.password) {
    //   setFormData(true);
    // }
    if (selectedUser) {
      setLoginMessage(`Welcome, ${selectedUser.name}!`);
      console.log("Logging in user:", selectedUser);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="ml-4 pt-4">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            Entered Users
          </button>

          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title"
                id="offcanvasWithBothOptionsLabel"
              >
                Let's Login To StyleMe
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <UserView onSelectUser={setSelectedUser} />
          </div>
        </div>

        <div
          className="container pt-5"
          style={{ alignContent: "center", width: "50%" }}
        >
          <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded position-relative">
            <div className="row">
              <div className="col-md-5 col-12">
                <img
                  src="https://images.pexels.com/photos/5632346/pexels-photo-5632346.jpeg?auto=compress&cs=tinysrgb&w=400"
                  className="img-fluid rounded object-fit-cover"
                  style={{ height: "100%" }}
                  alt="loginImg"
                />
              </div>

              <div className="col-md-7 col-12">
                <div className="card-body">
                  {loginMessage ? (
                    <h2 className="text-center mt-5 fw-semibold">
                      {" "}
                      {loginMessage}{" "}
                    </h2>
                  ) : (
                    <form
                      id="userForm"
                      onSubmit={handleSubmit}
                      className="my-4"
                    >
                      {selectedUser ? (
                        <>
                          <label htmlFor="userEmail" className="form-label">
                            Email:{" "}
                          </label>
                          <input
                            type="email"
                            className="form-control mb-4 shadow"
                            id="userEmail"
                            placeholder="Enter your email"
                            value={selectedUser.email || ""}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                email: e.target.value,
                              })
                            }
                          />

                          <label htmlFor="userPassword" className="form-label">
                            Password:{" "}
                          </label>
                          <input
                            type="password"
                            className="form-control mb-4 shadow"
                            id="userPassword"
                            placeholder="Enter your password"
                            value={selectedUser.password || ""}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                password: e.target.value,
                              })
                            }
                          />

                          <div className="text-center ">
                            <button
                              className="btn btn-primary w-50 w-sm-25 shadow rounded"
                              type="submit"
                              id="userBtn"
                            >
                              Sign In
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="fw-semibold fs-5 text-center">
                          Please select a user to login
                        </p>
                      )}
                    </form>
                  )}

                  <div className=" text-center">
                    <Link to="/userForm" className="link-underline-light">
                      {selectedUser ? " " : "Create Account"}
                    </Link>
                  </div>
                  {status === "loading" && <p>Logging in...</p>}
                  {error && <p className="text-danger">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Login;
