import { Typography } from "@mui/material";
import Artists from "components/about/artists";
import Partners from "components/about/partners";
import WhoWeAre from "components/about/who_we_are";
import DefaultLayout from "components/layouts/default";
import React from "react";

const About = () => {

  return (
    <DefaultLayout title="La compagnie">
        <Typography variant="h2" sx={{width: '80%',mb: 5}}>Qui sommes-nous ?</Typography>
        <WhoWeAre />
        <Typography variant="h2" sx={{width: '80%',mb: 5}}>Nos artistes</Typography>
        <Artists/>
        <Typography variant="h2" sx={{width: '80%',mb: 5}}>Nos partenaires</Typography>
        <Partners/>
    </DefaultLayout>
  )
}

export default About