import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router"; // react-router:n hook URL-pathin seuraamiseen
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import TypeFilter from "./TypeFilter";
import useStore from "./useStore";

export default function ImageGallery() {
  // Zustandista haetaan funktiot ja data
  const filterItems = useStore((state) => state.filterItems); // suodattaa kuvat valitun kategorian mukaan
  const filteredItemsToShow = useStore((state) => state.filteredItemsToShow); // suodatetut kuvat

  // React state
  const [selectedCategory, setSelectedCategory] = useState("all"); // valittu kategoria
  const [open, setOpen] = useState(false); // Lightboxin avoinna/kiinni tila
  const [currentIndex, setCurrentIndex] = useState(0); // Lightboxin aktiivinen kuva

  // Material UI teeman ja media queryn käyttö
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // pieni ruutu <600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md")); // keskikoko <960px
  const cols = isSmallScreen ? 3 : isMediumScreen ? 3 : 3; // sarakkeiden määrä gridissä

  const location = useLocation(); // react-router hook URL:n seuraamiseen

  // Jos käyttäjä on etusivulla "/", näytetään kaikki kuvat oletuksena
  useEffect(() => {
    if (location.pathname === "/") {
      filterItems("all");
    }
  }, [location.pathname, filterItems]);

  // Kun kuvaa klikataan, avataan Lightbox ja asetetaan aktiivinen indeksi
  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  // Kun kategoria valitaan suodattimesta, päivitetään state ja filtteroidaan kuvat
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterItems(category);
  };

  return (
    <>
      <TypeFilter onSelect={handleCategorySelect} />

      {/* CSS Grid kuville */}
      <div
        className={`grid-container ${selectedCategory === "digital" ? "digital-grid" : ""}`} // lisää luokka digital-grid vain digital-filterissä jotta pystykuva ei sotke asettelua
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`, // sarakkeiden määrä
          gap: "0px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {/* Loopataan suodatetut kuvat */}
        {filteredItemsToShow.map((item, index) => (
          <div
            key={item.img}
            onClick={() => handleImageClick(index)} // Lightboxin avaus
            className="image-wrapper"
            style={{
              // Jos valittu kategoria on all, käytetään kuvan määriteltyjä sarake- ja rivitietoja
              gridColumn: `span ${
                selectedCategory === "all" ? item.cols || 1 : 1
              }`,
              gridRow: `span ${
                selectedCategory === "all" ? item.rows || 1 : 1
              }`,
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />

            {/* tekstiboxi kuvan päällä */}
            <div className="hover-title">
              {item.title}
              <br />
              <span style={{ fontSize: "14px" }}>{item.category} collage</span>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        plugins={[Captions, Zoom]}
        zoom={{ scrollToZoom: true, maxZoomPixelRatio: 1.2 }}
        open={open}
        close={() => setOpen(false)}
        index={currentIndex} // mikä kuva aktiivisena
        slides={filteredItemsToShow.map((item) => ({
          src: item.img,
          alt: item.title + " " + item.category,
          title: item.title + ", " + item.category + " collage",
        }))}
      />
    </>
  );
}
