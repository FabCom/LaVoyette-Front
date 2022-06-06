import React, { useEffect, useState } from "react";
import { useQuery} from "react-query";
import axios from "axios";
import { TayloredPlay } from "types/wp";
import { site_api } from "config";
import CardPlay from "components/cards/card_play";
import DefaultLayout from "components/layouts/default";

const TayloredPlays: React.FC = () => {
  const { isLoading, error, data: taylored_plays, isFetching } = useQuery<TayloredPlay[], Error>("TayloredPlaysData", () =>
    axios.get(
      site_api +"taylored_plays"
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
    <DefaultLayout title='Nos interventions sur-mesure'>
      {!taylored_plays &&   <p>{message}</p>}
      {taylored_plays?.map((play, i: number) => 
        <CardPlay key={i} title={play.title.rendered} content={play.acf.abstract} imgId={play.featured_media} duration={null} publicIds={play.publics} tagIds={play.taylored_plays_tags} gallery={play.acf.gallery} link={'taylored_plays/'+play.id}/>
      )}
    </DefaultLayout>
  );
}

export default TayloredPlays