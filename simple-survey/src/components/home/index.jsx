import { Box, Container } from "@mui/material";
import React from "react";
import dotImg from "../../assets/dots.svg";
const Home = () => {
  return (
    <Container maxWidth="xxl">
      <Box
        sx={{
          display: { lg: "flex", xs: "none" },
          pr: "50px",
          position: "relative",
        }}
      >
        <img
          src={dotImg}
          alt="img"
          style={{
            marginLeft: "auto",
            position: "absolute",
            right: 70,
            top: 170,
          }}
        ></img>
      </Box>
    </Container>
  );
};

export default Home;
