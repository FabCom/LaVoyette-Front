import { Typography } from "@mui/material";
import Artists from "components/about/artists";
import Partners from "components/about/partners";
import WhoWeAre from "components/about/who_we_are";
import DefaultLayout from "components/layouts/default";
import React from "react";

const About = () => {
  return (
    <DefaultLayout title="À propos">
      <Typography variant="h2">Qui sommes-nous ?</Typography>
      <WhoWeAre />
      <Typography variant="h2">Nos artistes</Typography>
      <Artists/>
      <Typography variant="h2">Nos partenaires</Typography>
      <Partners/>
    </DefaultLayout>
  )
}

export default About