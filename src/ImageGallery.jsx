import React, { useState, useEffect } from "react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import TypeFilter from "./TypeFilter";
import useStore from "./useStore";
import axios from "axios";

export default function ImageGallery() {
  const filterItems = useStore((state) => state.filterItems);
  const setItemsList = useStore((state) => state.setItemsList);
  const filteredItemsToShow = useStore((state) => state.filteredItemsToShow);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Themed media queries for responsive layout
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const rowHeight = isSmallScreen ? 160 : isMediumScreen ? 300 : 400;

  // Fetch images from server or sessionStorage
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const storedImages = sessionStorage.getItem("images");
        if (storedImages) {
          setItemsList(JSON.parse(storedImages));
        } else {
          const response = await axios.get("https://hennamarleena.onrender.com/api/images");
          setItemsList(response.data);
          sessionStorage.setItem("images", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Kuvien lataaminen epäonnistui:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [setItemsList]); // remove `setLoading` from dependencies

  const handleCategorySelect = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      filterItems(category);
    }
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const getImageSize = (index) => {
    if (selectedCategory !== "all") {
      return { cols: 1, rows: 1 };
    }
    // Define image sizes based on index
    const sizePattern = [
      { cols: 2, rows: 2 }, // 1st image: 2x2
      { cols: 1, rows: 1 }, // 2nd image: 1x1
      { cols: 1, rows: 1 }, // 3rd image: 1x1
      { cols: 2, rows: 1 }, // 4th image: 2x1
      { cols: 1, rows: 1 }, // 5th image: 1x1
      { cols: 1, rows: 1 }, // 6th image: 1x1
      { cols: 2, rows: 2 }, // 7th image: 2x2
      { cols: 1, rows: 1 }, // 8th image: 1x1
      { cols: 2, rows: 2 }, // 9th image: 2x2
      { cols: 1, rows: 1 }, // 10th image: 1x1
      { cols: 1, rows: 1 }, // 11th image: 1x1
    ];

    return sizePattern[index] || { cols: 1, rows: 1 }; // Default to 1x1
  };

  return (
    <>
      <TypeFilter onSelect={handleCategorySelect} />

      {loading ? (
        <p>Loading images...</p>
      ) : (
        <ImageList variant="quilted" cols={3} rowHeight={rowHeight}>
          {filteredItemsToShow.map((item, index) => {
            const { cols, rows } = getImageSize(index);

            return (
              <ImageListItem
                key={item.img}
                cols={cols}
                rows={rows}
                onClick={() => handleImageClick(index)}
                className="image-wrapper"
              >
                <img
                  src={`https://hennamarleena.onrender.com/images/${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  className="image"
                />
                <div className="hover-title">
                  {item.title}
                  <br />
                  <span style={{ fontSize: "15px" }}>{item.category} collage</span>
                </div>
              </ImageListItem>
            );
          })}
        </ImageList>
      )}

      <Lightbox
        plugins={[Captions, Zoom]}
        zoom={{ scrollToZoom: true, maxZoomPixelRatio: 1.2 }}
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={filteredItemsToShow.map((item) => ({
          src: `https://hennamarleena.onrender.com/images/${item.img}`,
          alt: item.title + " " + item.category,
          title: item.title + ", " + item.category + " collage",
        }))}
      />
    </>
  );
}
