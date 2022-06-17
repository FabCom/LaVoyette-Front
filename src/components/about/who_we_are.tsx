import axios from "axios";
import { site_api } from "config";
import { useQuery } from "react-query";
import { Page } from "types/wp";
import parse from 'html-react-parser';
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Poster from "components/cards/card_poster";


const WhoWeAre = () => {
  const { isLoading, error, data: page, isFetching } = useQuery<Page, Error>("WhoWeAreData", () =>
    axios.get(
      site_api +"pages/2"
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

    // console.log(page)

  return (
    <Poster width='80%' tapeType="imgtape1">
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', backgroundImage: `url('/design-space-paper-textured-background.jpg')`, p:10, mb:10, boxShadow: '2px 2px 3px black'}}>
        {!page &&   <Typography variant="body2">{message}</Typography>}
        {page && parse(page?.content.rendered)}
      </Box>
    </Poster>
  )
}

export default WhoWeAre