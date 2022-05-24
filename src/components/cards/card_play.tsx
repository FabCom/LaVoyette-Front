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

const fetchPublicById = (id:number) => {
  const res = axios.get(`${site_api}publics/${id}`).then(({ data }) => data);
  return res 
};

const fetchTagsById = (id:number) => {
  const res = axios.get(`${site_api}tags_plays/${id}`).then(({ data }) => data);
  return res 
};


const CardPlay = ({title, content, imgId, duration=null, publicIds, tagIds}: {title: string, content: string, imgId: number, duration: number | null, publicIds: number[], tagIds: number[]}) => {
  
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

  const publics = useQueries(
    publicIds.map(publicId => {
      return {
        queryKey: ['public', publicId],
        queryFn: () => fetchPublicById(publicId)
      }
    })
  );

  const tags = useQueries(
    tagIds.map(tagIds => {
      return {
        queryKey: ['public', tagIds],
        queryFn: () => fetchTagsById(tagIds)
      }
    })
  );
  console.log(publics)
  
  return (
    <Card sx={{ maxWidth: '80%', display: "flex", flexDirection: 'column', mt: 5, alignItems: "center" }}>
      <CardContent>
        <Typography gutterBottom variant="h2" component="div">
          {title}
        </Typography>
      </CardContent>
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
            <Card sx={{ maxWidth: '100%', display: "flex", flexDirection: 'column', mt: 3 }}>
            {duration && 
              <CardContent >
                <Typography gutterBottom variant="body1" component="div">
                  Durée : <Chip label={duration + " mn"} />
                </Typography>
              </CardContent>
              }
              <CardContent >
                <Typography gutterBottom variant="body1" component="div">
                  Public : {
                  publics?.map((item,i) => 
                    (<Chip key={i} label={item.data?.name} />)
                  )
                  }
                </Typography>
              </CardContent>
              <CardContent >
                <Typography gutterBottom variant="body1" component="div">
                  Catégories : {
                  tags?.map((item,i) => 
                    (<Chip key={i} label={item.data?.name} />)
                  )
                  }
                </Typography>
              </CardContent>
            </Card>
          </animated.div>
        </Box>
        <Box sx={{width: '70%', ml: 2}}>
          <animated.div style={props_abstract}>
            {parse(content)}
          </animated.div>
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