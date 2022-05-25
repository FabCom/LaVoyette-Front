import { Box } from "@mui/material"
import Title from "components/title";

type Props = {
  children: React.ReactNode;
  title: string;
};

const DefaultLayout = ({ children, title }: Props): JSX.Element => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box sx={{width: '100%', marginLeft: 1, marginTop: 2}}>
        <Title title={title}/>
      </Box>
      <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
       {children}
      </Box>
    </Box>
  );
}

export default DefaultLayout