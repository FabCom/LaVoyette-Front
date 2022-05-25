import MenuCards from "components/cards/card_menu";
import Title from "components/title";
import React from "react";

const Home = () => {

  const menu_items = [
    {
      url: "https://images.pexels.com/photos/4722583/pexels-photo-4722583.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "Nos spectacles",
      width: "20%",
    },
    {
      url: "https://images.pexels.com/photos/2067526/pexels-photo-2067526.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "Sur-Mesure",
      width: "20%",
    },
    {
      url: "https://images.pexels.com/photos/1110085/pexels-photo-1110085.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "À propos",
      width: "20%",
    },
    {
      url: "https://images.pexels.com/photos/1049746/pexels-photo-1049746.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      title: "Nous contacter",
      width: "20%",
    },
    // {
    //   url: "https://images.pexels.com/photos/1110085/pexels-photo-1110085.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    //   title: "Nos artistes",
    //   width: "20%",
    // },
  ];

  return (
    <React.Fragment>
      <Title title="La Voyette - Compagnie de théâtre"/>
      <MenuCards menu_items={menu_items}/>
    </React.Fragment>
  );
}

export default Home