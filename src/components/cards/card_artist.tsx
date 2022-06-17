import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import axios from "axios";
import { site_api } from "config";
import parse from 'html-react-parser';
import Image from "next/image";
import { useQuery } from "react-query";
import styles from '../../styles/card.module.css'
import Poster from "./card_poster";

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


  return (
    <Poster width="20%" tapeType="imgtape1" >
    <Card sx={{maxWidth: 360, m:2, boxShadow: '2px 2px 3px black', backgroundImage: `url('/design-space-paper-textured-background.jpg')`}}>
      <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h4">{name}</Typography>
        {imgSrc ? <img width='100' height='100%' src={imgSrc.data.guid.rendered}/> : null}
      </CardContent>
      <CardContent>
        {parse(bio)}
      </CardContent>
    </Card>
    </Poster>
  )
}

export default CardArtist