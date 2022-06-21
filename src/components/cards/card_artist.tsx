import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
  Collapse,
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

function CardArtist({
  name,
  bio,
  imgId,
}: {
  name: string;
  bio: string;
  imgId: number;
}) {
  const { data: imgSrc } = useQuery(
    ["image_artists", imgId],
    ({ queryKey: [, imgId] }) => {
      return axios(`${site_api}media/${imgId}`);
    },
    {
      enabled: Boolean(imgId),
    }
  );
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.standard,
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

  return (
    <Poster width="20%" tapeType="imgtape1">
      <Card
        sx={{
          maxWidth: 360,
          m: 2,
          boxShadow: "2px 2px 3px black",
          backgroundImage: `url('/design-space-paper-textured-background.jpg')`,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{name}</Typography>
          {imgSrc ? (
            <img width="100" height="100%" src={imgSrc.data.guid.rendered} />
          ) : null}
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
  );
}

export default CardArtist;
