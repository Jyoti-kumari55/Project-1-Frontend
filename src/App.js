import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  // const [searchInput, setSearchInput] = useState("");

  return (
    <div className="App ">
      <>
        <Header />
        <div className="bg-light">
          <div className="container pt-5">
            <div
              id="carouselExampleControlsNoTouching"
              className="carousel slide"
              data-bs-ride="corousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-DDMMYY-UHPHER-Z10-P1-QUIERO-SOLLOBELL-MIN70.jpg"
                    className="d-block w-100"
                    alt="img1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-DDMMYY-UHPHER-Z10-P4-KGFRIENDS-GAPKIDS-20-60.jpg"
                    className="d-block w-100"
                    alt="img2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-29102024-TopBanners-Z3-P5-MIN60.jpg"
                    className="d-block w-100"
                    alt="img3"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-290824-DailyBanners-Z6-P2-Jompers-Kisah-Min70.jpg"
                    className="d-block w-100"
                    alt="img4"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-29082024-TopBanner-Z3-P2-KASUALLY-SHOWOFF-MIN50.jpg"
                    className="d-block w-100"
                    alt="img5"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-29082024-TopBanner-Z3-P-SUPERDRY-AX-UPTO40.jpg"
                    className="d-block w-100"
                    alt="img6"
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </>
    </div>
  );
}

export default App;
