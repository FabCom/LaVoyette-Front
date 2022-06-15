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

const fetchPublicById = (id:number) => {
  const res = axios.get(`${site_api}publics/${id}`).then(({ data }) => data);
  return res 
};

const fetchTagsById = (id:number) => {
  const res = axios.get(`${site_api}tags_plays/${id}`).then(({ data }) => data);
  return res 
};

const fetchMediaById = (id:number) => {
  const res = axios.get(`${site_api}media/${id}`).then(({ data }) => data);
  return res 
};


const CardPlay = ({title, content, imgId, duration=null, publicIds, tagIds, gallery, link}: {title: string, content: string, imgId: number, duration: number | null, publicIds: number[], tagIds: number[], gallery: number[], link: string | null}) => {
  
  const props_poster = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 500 })
  const props_info = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 650 })
  const props_abstract = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 800 })
  
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
  }

  const publics = useQueries(
    publicIds.map(publicId => {
      return {
        queryKey: ['public', publicId],
        queryFn: () => fetchPublicById(publicId)
      }
    })
  );

  const tags = useQueries(
    tagIds.map(tagId => {
      return {
        queryKey: ['tag', tagId],
        queryFn: () => fetchTagsById(tagId)
      }
    })
  );

  const medias = useQueries(
    gallery.map(media => {
      return {
        queryKey: ['gallery', media],
        queryFn: () => fetchMediaById(media)
      }
    })
  );
  // console.log(medias)
  return (
    <Card sx={{width: cardWidth, display: "flex", flexDirection: 'column', mt: 5, alignItems: "center", justifyContent: 'center', borderRadius: 30, background: 'none', overflow: 'initial', p:4  }} className={styles.card}>
      {/* <CardContent sx={{width: '100%', boxShadow: '2px 2px 3px black', borderRadius: '30% 20% / 10% 40%', p: 2,  backgroundImage: `url('/design-space-paper-textured-background.jpg')` }}>
        <Typography gutterBottom variant="h3" component="div" sx={{textAlign: 'center'}}>
          {title}
        </Typography>
      </CardContent> */}
      {/* {link && 
              <Link href={'/'+ link}><Button variant="contained" size="small">Voir</Button></Link>
            } */}

      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      <CardContent sx={{width:'100%', display: "flex", flexDirection: 'row', justifyContent:'center'}}>
        <Box sx={{position: 'relative'}}>
          <animated.div style={props_poster}>
            <CardMedia
              component="img"
              
              image={imgSrc ? imgSrc.data.guid.rendered : null}
              alt="Photo mise en avant"
              sx={{ width: '100%'}}
            />
            <Typography gutterBottom variant="h3" component="div" sx={{position: 'absolute',bottom: 10, textAlign: 'center'}}>
              {title}
            </Typography>
          </animated.div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardPlay