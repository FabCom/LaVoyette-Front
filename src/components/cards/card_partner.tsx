import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import axios from "axios";
import { site_api } from "config";
import { useQuery } from "react-query";
import Poster from "./card_poster";

const CardPartner = ({title, imgId}: {title: string, imgId:number}) => {

  const { data: imgSrc } = useQuery(
    ["image", imgId],
    ({ queryKey: [, imgId] }) => {
      return axios(`${site_api}media/${imgId}`);
    },
    {
      enabled: Boolean(imgId)
    }
  );

  return (
    <Poster width="12%" tapeType="imgtape1">
    <Card sx={{width: 200, m:2, p: 2,  display: 'flex', flexDirection: 'column' , alignItems: 'center', backgroundImage: `url('/design-space-paper-textured-background.jpg')`,boxShadow: '2px 2px 3px black'}}>
      <Box sx={{width:'100%', }}>
        <CardMedia
        component="img"
        width="100%"
        image={imgSrc ? imgSrc.data.guid.rendered : null}
        alt="green iguana"
      />
      </Box>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
      </CardContent>
    </Card>
    </Poster>
  )
}

export default CardPartner