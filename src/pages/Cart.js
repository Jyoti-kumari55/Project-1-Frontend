import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  fetchCart,
  itemQunatityDecrementInCart,
  itemQunatityIncrementInCart,
  moveToWishlistFrmCart,
  removeFromCart,
} from "../features/cartSlice";
import AddressView from "./AddressView";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems.items);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  const [alertState, setAlertState] = useState("");
  const [selectedSizes, setSelectedSizes] = useState({});

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
    setAlertState("Product removed from your Cart Successfully...");
    setTimeout(() => {
      setAlertState("");
    }, 1000);
  };

  const incrementHandler = (productId) => {
    dispatch(itemQunatityIncrementInCart(productId));
    setAlertState("Product quantity Increased by 1.");
    setTimeout(() => {
      setAlertState("");
    }, 1000);
  };

  const decrementHandler = (productId) => {
    dispatch(itemQunatityDecrementInCart(productId));
    setAlertState("Product quantity Decreased by 1.");
    setTimeout(() => {
      setAlertState("");
    }, 1000);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const moveToWishlistClickHandler = async (productId) => {
    await dispatch(moveToWishlistFrmCart(productId));
    setAlertState("Product moved to the Wishlist...");

    setTimeout(() => {
      setAlertState("");
    }, 1000);
    navigate("/whislist");
  };

  const totalQuantity = cartItems.reduce(
    (accumulator, currQuantity) => currQuantity.quantity + accumulator,
    0
  );

  const totalPrice = cartItems.reduce(
    (accumulator, currPrice) =>
      currPrice.productId.price * currPrice.quantity + accumulator,
    0
  );

  return (
    <>
      <Header />
      <div className="m-5">
        <p className="fs-2">
          Cart{" "}
          <span className="fs-4 ">
            {" "}
            ({cartItems && cartItems.length} products){" "}
          </span>
          <Link
            className="btn btn-outline-success float-end fs-5"
            to="/checkout"
            state={{ address: selectedAddress }}
          >
            {" "}
            Proceed to Buy ({totalQuantity} items)
          </Link>
        </p>
        <div className="row">
          <div className="col-md-3">
            <AddressView onSelectAddress={setSelectedAddress} />
          </div>

          <div className="col-md-9 pl-4">
            {alertState && (
              <div className="alert alert-success" role="alert">
                {alertState}
              </div>
            )}

            {cartItems.length > 0 ? (
              <div className="row">
                {/* <div className="card" > */}
                {status === "loading" && <p>Loading cart products...</p>}
                {error && (
                  <p>
                    An error occured while fetching the cart products- {error}
                  </p>
                )}

                {cartItems?.map((item) => (
                  <div className="mb-3" key={item.productId._id}>
                    <div className="card">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.productId.imageUrl}
                            className="img-fluid "
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt={item.productId.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body text-center">
                            <h5 className="card-title">
                              {item.productId.name}
                            </h5>
                            <p className="card-text">${item.productId.price}</p>

                            <div className="form-group">
                              <label
                                htmlFor={`sizeSelect-${item.productId._id}`}
                                className="form-label mx-2"
                              >
                                Select Size:
                              </label>
                              <select
                                id={`sizeSelect-${item.productId._id}`}
                                value={selectedSizes[item.productId._id] || ""}
                                className="rounded"
                                onChange={(e) =>
                                  handleSizeChange(
                                    item.productId._id,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" disabled>
                                  Size
                                </option>
                                {item.productId.size.map((size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                              <button
                                onClick={() =>
                                  decrementHandler(item.productId._id)
                                }
                                className="btn btn-outline-secondary mx-1"
                              >
                                -
                              </button>
                              <span className="btn btn-light">
                                Qty: {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  incrementHandler(item.productId._id)
                                }
                                className="btn btn-outline-secondary mx-1"
                              >
                                +
                              </button>
                            </div>
                            <div className="d-flex justify-content-center m-4">
                              <button
                                className="btn btn-danger mx-4"
                                onClick={() =>
                                  removeFromCartHandler(item.productId._id)
                                }
                              >
                                Remove
                              </button>
                              <button
                                className="btn btn-warning"
                                onClick={() =>
                                  moveToWishlistClickHandler(item.productId._id)
                                }
                              >
                                Move to Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>

        {cartItems ? (
          <div className="row">
            <div className=" col-md mt-4 d-flex justify-content-end ">
              <div className="card w-50 bg-light">
                <div className="card-body">
                  <h5 className="card-title">
                    PRICE DETAILS{" "}
                    <span className="float-end">({totalQuantity} items) </span>
                  </h5>
                  <hr />
                  {cartItems.map((item) => (
                    <div key={item._id}>
                      <p className="card-text mb-1">
                        {item.productId.name} - {item.quantity}
                        <span className="float-end">
                          {" "}
                          {item.productId.price * item.quantity}{" "}
                        </span>
                      </p>
                    </div>
                  ))}
                  <hr />
                  <p className="">
                    Total Price:{" "}
                    <span className="float-end">{totalPrice} </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p> </p>
        )}
      </div>
    </>
  );
};

export default Cart;