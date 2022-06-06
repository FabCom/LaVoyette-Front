import { Box } from "@mui/material"
import Navbar from "components/navbar";
import Title from "components/title";
import { useSpring, animated } from "react-spring";

type Props = {
  children: React.ReactNode;
  title: string;
};

const DefaultLayout = ({ children, title }: Props): JSX.Element => {
  const props_translate = useSpring({ to: { marginTop: 0, zIndex: 0 }, from: { marginTop: -500 , zIndex: -20}, delay: 600 })

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', backgroundImage: `url('/wall.jpg')`, minHeight: '100vh'}}>
      <Box sx={{zIndex: 100}}>
        <Navbar />
      </Box>
      <Box sx={{width: '100%', marginLeft: 0, marginTop: 0}}>
        <Title title={title}/>
      </Box>
      <animated.div style={props_translate}>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {children}
        </Box>
      </animated.div>
    </Box>
  );
}

export default DefaultLayout