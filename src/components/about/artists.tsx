import React, { useEffect, useState } from "react";
import { useQuery} from "react-query";
import axios from "axios";
import { Artist } from "types/wp";
import { site_api } from "config";
import CardArtist from "components/cards/card_artist";
import { Box, Typography } from "@mui/material";

const Artists = () => {
  const { isLoading, error, data: artists, isFetching } = useQuery<Artist[], Error>("ArtistsData", () =>
    axios.get(
      site_api +"artists"
    ).then((res) => res.data)
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
    <React.Fragment>
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '90%', justifyContent: 'center'}}>
        {!artists &&   <Typography variant="body2">{message}</Typography>}
        {artists?.map((artist, i: number) => 
          <CardArtist key={i} name={artist.title.rendered} bio={artist.content.rendered} imgId={artist.featured_media}/>
        )}
      </Box>
    </React.Fragment>
  )

}

export default Artists