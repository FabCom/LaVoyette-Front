import { Card, CardContent, Typography } from "@mui/material"
import parse from 'html-react-parser';

const CardArtist = ({name, bio}: {name: string, bio: string}) => {
  return (
    <Card sx={{maxWidth: 300, m:4}}>
      <CardContent>
        <Typography variant="h4">{name}</Typography>
      </CardContent>
      <CardContent>
        {parse(bio)}
      </CardContent>
    </Card>
  )
}

export default CardArtist