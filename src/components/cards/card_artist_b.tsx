import { Card, CardContent, Collapse, IconButton, IconButtonProps, styled, Typography } from "@mui/material"
import axios from "axios";
import { site_api } from "config";
import parse from 'html-react-parser';
import { useState } from "react";
import { useQuery } from "react-query";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Image from "next/image";
import styles from '../../styles/card.module.css'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const CardArtist = ({name, bio, imgId}: {name: string, bio: string, imgId:number}) => {

  const { data: imgSrc } = useQuery(
    ["image_artists", imgId],
    ({ queryKey: [, imgId] }) => {
      return axios(`${site_api}media/${imgId}`);
    },
    {
      enabled: Boolean(imgId)
    }
  );

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Card sx={{maxWidth: 360, m:2}}>
      <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h4">{name}</Typography>
        {imgSrc ? <img width='100' height='100%' src={imgSrc.data.guid.rendered}/> : null}
      </CardContent>
      <CardContent>
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {parse(bio)}
          </CardContent>
        </Collapse>
        
      </CardContent>
    </Card>
  )
}

export default CardArtist