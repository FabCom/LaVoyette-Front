import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import axios from "axios";
import { site_api } from "config";
import { useQuery } from "react-query";

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
    <Card sx={{width: 200, m:2, p: 2,  display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
      <CardMedia
        component="img"
        height="140"
        image={imgSrc ? imgSrc.data.guid.rendered : null}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardPartner