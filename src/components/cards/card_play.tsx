import { useQuery} from "react-query";
import axios from "axios";
import CardMedia from '@mui/material/CardMedia';
import { site_api } from "config";
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
    <Poster width='25%' tapeType='imgtape3'>
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