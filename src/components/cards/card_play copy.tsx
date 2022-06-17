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

  let cardWidth = '45%'
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
    <Card sx={{ minWidth: 500, width: cardWidth, display: "flex", flexDirection: 'column', mt: 5, alignItems: "center",  boxShadow: '2px 2px 3px black', borderRadius: '50% 20% / 10% 40%', p: 5, backgroundImage: `url('/design-space-paper-textured-background.jpg')` }}>
      <CardContent >
        <Typography gutterBottom variant="h3" component="div">
          {title}
        </Typography>
      </CardContent>
      {link && 
              <Link href={'/'+ link}><Button variant="contained" size="small">Voir</Button></Link>
            }
      <CardContent sx={{width:'100%', display: "flex", flexDirection: 'row', justifyContent:'center'}}>
        <Box sx={{width: '30%'}}>
          <animated.div style={props_poster}>
            <CardMedia
              component="img"
              className={styles.card}
              image={imgSrc ? imgSrc.data.guid.rendered : null}
              alt="Photo mise en avant"

            />
          </animated.div>
          <animated.div style={props_info}>
            <Card sx={{ maxWidth: '100%', display: "flex", flexDirection: 'column', mt: 3,backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
            {duration && 
              <CardContent sx={{textAlign:'center'}}>
                <Typography gutterBottom variant="h6" component="div">
                  Durée
                </Typography>
                   <Chip label={duration + " mn"} />
              </CardContent>
              }
              {publics &&
                <CardContent sx={{textAlign:'center'}}>
                  <Typography gutterBottom variant="h6" component="div">
                    Publics
                  </Typography>
                    {publics?.map((item,i) => 
                      (<Chip key={i} label={item.data?.name} size="small"/>)
                    )
                    }
                </CardContent>
              }
              {tags &&
                <CardContent sx={{textAlign:'center'}}>
                  <Typography gutterBottom variant="h6" component="div">
                    Catégories 
                  </Typography>
                  {
                    tags?.map((item,i) => 
                      (<Chip key={i} label={item.data?.name} size="small"/>)
                    )
                    }
                </CardContent>
              }
            </Card>
          </animated.div>
        </Box>
        <Box sx={{width: '70%', ml: 2}}>
          <animated.div style={props_abstract}>
            {parse(content)}
          </animated.div>
          {/* <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {medias.map((media, i) => 
              <Box key={i} sx={{display: 'flex', flexDirection: 'row', maxHeight: 200, maxWidth: 300, flexWrap: 'wrap', m: 1}}>
                <CardMedia
                component="img"
                className={styles.card}
                image={media.data?.guid.rendered}
                alt="Photo mise en avant"
                />
              </Box>
              )}
          </Box> */}
        </Box>
      </CardContent>

      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  )
}

export default CardPlay