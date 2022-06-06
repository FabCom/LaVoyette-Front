import { Box } from "@mui/system"
import axios from "axios"
import CardPlay from "components/cards/card_play"
import DefaultLayout from "components/layouts/default"
import Title from "components/title"
import { site_api } from "config"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Play } from "types/wp"

const ThisPlay = () => {
  const { query, isReady } = useRouter();
  const [id, setId] = useState<number>()

  function fetchPlayById(id: number | undefined) {
    if (id){
      const data = axios.get(
        site_api +"plays/" + id
      ).then((res) => res.data)
      return data
    }
  }

  useEffect(() => {
    if (isReady && query ) {
      setId(Number(query.id))
    };
  }, [isReady])
  
  const { isLoading, error, data: play, isFetching } = useQuery<Play, Error>(["PlayData",id], async () => {

    const res = await fetchPlayById(id)
    return res
 
  })
  
  const [message, setMessage] = useState('')

  useEffect(() => { 
    if (isLoading) {
      setMessage("Loading...")
    } 
  
    if (error) {
      setMessage("An error has occurred: " + error.message)
    }  
  }, [error, isLoading]);
  
    // console.log(play)
  
  return (
    <DefaultLayout title="Compagnie de théâtre">
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <Title title='SPECTACLE' />
        {!play &&   <p>{message}</p>}
        {play?.title && 
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <CardPlay title={play.title.rendered} content={play.acf.abstract} imgId={play.featured_media} duration={play.acf.duration} publicIds={play.publics} tagIds={play.tags_plays} gallery={play.acf.gallery} link={null}/>
        </Box>
        }
      </Box>
    </DefaultLayout>
  )
}

export default ThisPlay