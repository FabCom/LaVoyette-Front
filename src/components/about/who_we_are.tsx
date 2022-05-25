import axios from "axios";
import { site_api } from "config";
import { useQuery } from "react-query";
import { Page } from "types/wp";
import parse from 'html-react-parser';
import { Box } from "@mui/system";
import { useEffect, useState } from "react";


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
    <Box sx={{width: '80%'}}>
      {!page &&   <p>{message}</p>}
      {page && parse(page?.content.rendered)}
    </Box>
  )
}

export default WhoWeAre