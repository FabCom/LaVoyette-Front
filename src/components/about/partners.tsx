import React, { useEffect, useState } from "react";
import { useQuery} from "react-query";
import axios from "axios";
import { Partner } from "types/wp";
import { site_api } from "config";
import { Box, Typography } from "@mui/material";
import CardPartner from "components/cards/card_partner";

const Partners = () => {
  const { isLoading, error, data: partners, isFetching } = useQuery<Partner[], Error>("PartnersData", () =>
    axios.get(
      site_api +"partners"
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
      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '80%', justifyContent: 'center'}}>
        {!partners &&   <Typography variant="body2">{message}</Typography>}
        {partners?.map((partner, i: number) => 
          <CardPartner key={i} title={partner.title.rendered} imgId={partner.featured_media}/>
        )}
      </Box>
    </React.Fragment>
  )

}

export default Partners