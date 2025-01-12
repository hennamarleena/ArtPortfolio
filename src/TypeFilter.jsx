import { Select, InputLabel, MenuItem, Box, FormControl, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function TypeFilter( {onSelect} ) {

// Themed media queries for responsive layout
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
    <Box className="type-filter-box" sx={{ justifyContent: isSmallScreen ? 'center' : 'flex-end'}}>
      <FormControl size="small" className="type-filter-formcontrol">
      <InputLabel id="select-label">Category</InputLabel>
          <Select 
              labelId="select-label" 
              label="Category"
              onChange={(e) => onSelect(e.target.value)}
              defaultValue="all"
              >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"paper"}>Paper</MenuItem>
              <MenuItem value={"digital"}>Digital</MenuItem>
          </Select>
      </FormControl>
    </Box>
    )
}    