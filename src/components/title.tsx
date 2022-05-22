import { Typography } from "@mui/material"

const Title = ({title}:{title: string}) => {
  return (
    <Typography variant='h1'>{title}</Typography>
  )
}

export default Title