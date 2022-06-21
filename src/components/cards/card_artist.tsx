import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
  Collapse,
  ButtonBase,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { site_api } from "config";
import parse from "html-react-parser";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import styles from "../../styles/card.module.css";
import Poster from "./card_poster";
import theme from "styles/theme";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

function CardArtist({
  name,
  bio,
  imgId,
}: {
  name: string;
  bio: string;
  imgId: number;
}): JSX.Element {
  
  const { data: imgSrc } = useQuery(
    ["image_artists", imgId],
    ({ queryKey: [, imgId] }) => {
      return axios(`${site_api}media/${imgId}`);
    },
    {
      enabled: Boolean(imgId),
    }
  );
  

  const ExpandMore = styled((props: ExpandMoreProps) => {
    
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.complex,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ImageBackdrop = styled("div")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "#000",
    opacity: 0.0,
    transition: theme.transitions.create("opacity"),
  }));
  
  const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    // transition: 'all .2s ease-in-out',
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
  

  return (
    <ImageIconButton
              style={{
                width: "20%",
                
              }}
            >
    <Poster width="20%" tapeType="imgtape1">
      
      <Card
        sx={{
        
          m: 2,
          boxShadow: "2px 2px 3px black",
          backgroundImage: `url('/design-space-paper-textured-background.jpg')`,
        }}
      >
        <CardContent
          sx={{
            position: "relative",
            display: "flex",
            
            // flexDirection: "column",
            // alignItems: "center",
          }}
        >
          <Typography variant="h4">{name}</Typography>
          {imgSrc ? (
            <img width="100" height="100%" src={imgSrc.data.guid.rendered} />
          ) : null}
           <ImageBackdrop className="imageBackdrop" />
        </CardContent>
        <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon color="secondary" />
              </ExpandMore>
              <Collapse in={expanded} timeout="auto" unmountOnExit >
        <CardContent>{parse(bio)}</CardContent>
        </Collapse>
      </Card>
      
    </Poster>
    </ImageIconButton>
  );
}

export default CardArtist;
