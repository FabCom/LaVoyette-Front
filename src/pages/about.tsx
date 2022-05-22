import Artists from "components/about/artists";
import DefaultLayout from "components/layouts/default";
import React from "react";

const About = () => {
  return (
    <DefaultLayout title="À propos">
      <h2>Nos artistes</h2>
      <Artists/>
    </DefaultLayout>
  )
}

export default About