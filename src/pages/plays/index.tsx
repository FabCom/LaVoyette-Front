import React, { useEffect, useState } from "react";
import { useQuery} from "react-query";
import axios from "axios";
import { Play } from "types/wp";
import { site_api } from "config";
import CardPlay from "components/cards/card_play";
import DefaultLayout from "components/layouts/default";
import { Box } from "@mui/material";

const Plays: React.FC = () => {
  const { isLoading, error, data: plays, isFetching } = useQuery<Play[], Error>("PlaysData", () =>
    axios.get(
      site_api +"plays"
    ).then((res) => res.data.reverse())
  );
  
  const [message, setMessage] = useState('')

  useEffect(() => { 
    if (isLoading) {
      setMessage("Loading...")
    } 
  
    if (error) {
      setMessage("An error has occurred: " + error.message)
    }  
  }, [error, isLoading]);
  
  
  return (
    <DefaultLayout title='Nos spectacles'>
      {!plays &&   <p>{message}</p>}
      <Box sx={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-around', flexWrap:'wrap' }}>
      {plays?.map((play, i: number) => 
        <CardPlay key={i} title={play.title.rendered} content={play.acf.abstract} imgId={play.featured_media} duration={play.acf.duration} publicIds={play.publics} tagIds={play.tags_plays} gallery={play.acf.gallery} link={'plays/'+ play.id}/>
        )}
      </Box>

    </DefaultLayout>
  );
}

export default Plays