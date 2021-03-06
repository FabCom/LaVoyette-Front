import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Link from "next/link";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 15,
  right: 15,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
  borderRadius: '50% 20% / 10% 40%',
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  transition: 'all .2s ease-in-out',
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
    transform: 'scale(1.2)'
    
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const MenuCards = ({menu_items}: {menu_items:{url: string, title: string, width: string, path: string}[]}) => {
  return (
    <Container component="section" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap", justifyContent:'center' }}>
        {menu_items.map((image) => (
          <Link key={image.title} href={image.path}>
            <ImageIconButton
              style={{
                width: image.width,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 15,
                  right: 15,
                  top: 0,
                  bottom: 0,
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                  backgroundImage: `url(${image.url})`,
                  borderRadius: '50% 20% / 10% 40%',
                  boxShadow: '2px 2px 3px black'
                }}
              />
              <ImageBackdrop className="imageBackdrop" />
              <Box
                sx={{
                  position: "absolute",
                  left: 15,
                  right: 15,
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "common.white",
                  borderRadius: '50% 20% / 10% 40%',
                }}
              >
                <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className="imageTitle"
                >
                  {image.title}
                  <div className="imageMarked" />
                </Typography>
              </Box>
            </ImageIconButton>
          </Link>
        ))}
      </Box>
    </Container>
  );
}

export default MenuCards