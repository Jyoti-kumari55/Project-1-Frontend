import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { addToCart } from "../features/cartSlice";
import { addToWhislist } from "../features/whislistSlice";
import { useState } from "react";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const productId = useParams();

  const productInfo = products?.find(
    (product) => product._id === productId.productId
  );
  console.log("Product Info", productInfo);

  const [alertState, setAlertState] = useState("");

  const addToCartHandler = (productInfo) => {
    dispatch(addToCart(productInfo));
    setAlertState("Product added to your Cart Successfully...");
    // navigate("/cart");
    setTimeout(() => {
      setAlertState("");
    }, 1200);
    navigate("/cart");
  };

  const addToWhistlistHandler = (productInfo) => {
    dispatch(addToWhislist(productInfo));
    setAlertState("Product added to your Wishlist Successfully...");
    setTimeout(() => {
      setAlertState("");
      // navigate("/whislist");
    }, 1200);
    navigate("/whislist");
  };
  return (
    <>
      <Header />
      <main>
        <div className="container mt-4">
          {alertState && (
            <div className="alert alert-success" role="alert">
              {alertState}
            </div>
          )}
          {status === "loading" && <p>Fetching product details</p>}
          {error && <p>An error occured while fetching the product details.</p>}
          <Link to="/cloth/All" className="btn btn-primary px-3">
            Back{" "}
          </Link>
          {productInfo && (
            <div className="row mt-5">
              <div className="col-md-5">
                <img
                  src={productInfo.imageUrl}
                  className="img-fluid rounded-5 w-50  "
                />
              </div>

              <div className="col-md-4 text-center">
                <h2>{productInfo.brand}</h2>
                <p className="fs-4">{productInfo.name}</p>

                <div className="position-relative ">
                  <div
                    className="position-absolute top-0 start-50 translate-middle-x"
                    style={{
                      width: "4rem",
                      height: "2rem",
                      backgroundColor: "green",
                      color: "white",
                      padding: "4px",
                      fontWeight: "bold",
                      borderRadius: "6px",
                    }}
                  >
                    {productInfo.rating}
                    <span style={{ padding: "0 5px", marginLeft: "4px" }}>
                      <img
                        src="https://assets.ajio.com/static/img/green_star_pdp.svg"
                        className="img-fluid"
                        style={{
                          width: "12px",
                          height: "14px",
                          marginBottom: "4px",
                        }}
                      />
                    </span>
                  </div>
                </div>
                <br />

                <p className="fs-4 mt-3">₹{productInfo.price} </p>
                <p className="fs-6">
                  Available Color: {productInfo.color.join(", ")}{" "}
                </p>
                <p className="fs-6 text-center">
                  {" "}
                  <b>Available Size </b>
                </p>
                <div className="">
                  {productInfo.size.map((userSize) => (
                    <button
                      style={{
                        flexWrap: "wrap",
                        width: "5rem",
                        margin: "6px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#f1f1f1",
                        border: "1px solid black",
                      }}
                    >
                      {" "}
                      {userSize}
                    </button>
                  ))}
                </div>
                <div
                  className="d-flex justify-content-center gap-2"
                  style={{ flexWrap: "wrap", marginTop: "1rem" }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCartHandler(productInfo)}
                  >
                    ADD TO BAG{" "}
                  </button>
                  <br />

                  <button
                    className="btn btn-warning"
                    onClick={() => addToWhistlistHandler(productInfo)}
                  >
                    ADD TO Wishlist{" "}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default ProductDetail;
