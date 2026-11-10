import React from "react";
import { Box } from "@mui/material";

const DottedProgressBar = ({ total = 5, active = 2 }) => {
  return (
    <Box display="flex" gap={1}>
      {Array.from({ length: total }).map((_, idx) => (
        <Box
          key={idx}
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: idx < active ? "primary.main" : "grey.300",
            transition: "background-color 0.3s",
          }}
        />
      ))}
    </Box>
  );
};

export default DottedProgressBar;
