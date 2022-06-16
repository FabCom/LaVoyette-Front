import { useQueries, useQuery} from "react-query";
import axios from "axios";
import parse from 'html-react-parser';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { site_api } from "config";

import { useSpring, animated } from 'react-spring'
import { Box, Chip } from "@mui/material";
import styles from '../../styles/card.module.css'
import Link from "next/link";
import Poster from "./card_poster";

const CardPlay = ({title, content, imgId, duration=null, publicIds, tagIds, gallery, link}: {title: string, content: string, imgId: number, duration: number | null, publicIds: number[], tagIds: number[], gallery: number[], link: string | null}) => {
  
  const { data: imgSrc } = useQuery(
    ["image", imgId],
    ({ queryKey: [, imgId] }) => {
      return axios(`${site_api}media/${imgId}`);
    },
    {
      enabled: Boolean(imgId)
    }
  );

  let cardWidth = '25%'
  if (!link) {
    cardWidth='80%'
    link='/plays'
  }

  
  return (
    <Poster width='25%' tapeType='1'>
      <Link href={link}>
        <CardMedia
          component="img"
          image={imgSrc ? imgSrc.data.guid.rendered : null}
          alt="Photo mise en avant"
        />
      </Link>
    </Poster>
  )
}

export default CardPlay