import { useQuery} from "react-query";
import axios from "axios";
import CardPlay from "../cards/card_play";
import { site_api } from "../../config";
import { Play } from "types/wp";
import React from "react";

const Plays: React.FC = () => {
  const { isLoading, error, data: plays, isFetching } = useQuery<Play[], Error>("PlaysData", () =>
    axios.get(
      site_api +"plays"
    ).then((res) => res.data)
  );

  if (isLoading) {
    return (
      <React.Fragment>
        "Loading..."
      </React.Fragment> 
    )
  }

  if (error) {
    return (
      <React.Fragment>
        "An error has occurred: " + error.message;
      </React.Fragment> 
    )
  }  
  
  return (
    <React.Fragment>
      {plays?.map((play, i: number) => 
        <CardPlay key={i} title={play.title.rendered} content={play.acf.abstract} imgId={play.featured_media} duration={play.acf.duration} publicIds={play.publics} tagIds={play.tags_plays}/>
      )}
    </React.Fragment>
  );
}

export default Plays