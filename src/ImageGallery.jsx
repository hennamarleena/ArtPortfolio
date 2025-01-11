import * as React from "react";
import { useState } from "react";
import { ImageList, ImageListItem, useMediaQuery, } from "@mui/material";
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
  const filterItems = useStore((state) => state.filterItems);
  const filteredItemsToShow = useStore((state) => state.filteredItemsToShow);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Themed media queries for responsive layout
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const rowHeight = isSmallScreen ? 160 : isMediumScreen ? 300 : 400;

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterItems(category);
  };

  return (
    <>
      <TypeFilter onSelect={handleCategorySelect}/>

      <ImageList
        variant="quilted"
        cols={3}
        rowHeight={rowHeight}
      >
        {filteredItemsToShow.map((item, index) => (
          <ImageListItem
            key={item.img}
            cols={selectedCategory === "all" ? item.cols : 1}
            rows={selectedCategory === "all" ? item.rows : 1}
            onClick={() => handleImageClick(index)}
            className="image-wrapper"
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="image"
            />
            <div className="hover-title">{item.title}<br/><span style={{fontSize: "15px"}}>{item.category} collage</span></div>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox for displaying enlarged images */}
      <Lightbox
        plugins={[Captions, Zoom]}
        zoom={{ scrollToZoom: true, maxZoomPixelRatio: 1.2 }}
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={filteredItemsToShow.map((item) => ({
          src: item.img,
          alt: item.title + " " + item.category,
          title: item.title + ", " + item.category + " collage",
        }))}
        
      />
    </>
  );
}