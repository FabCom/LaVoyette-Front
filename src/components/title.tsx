import { Box, Typography } from "@mui/material"
import { useSpring, animated } from "react-spring";

const Title = ({title}:{title: string}) => {
  const props_translate = useSpring({ to: { marginTop: 0 }, from: { marginTop: -200 }, delay: 300 })

  return (
    <animated.div style={props_translate}>
      <Box sx={{position: 'relative',width: '100%', height: 200, display:'flex', zIndex: 50, justifyContent:'center', textAlign: 'center', alignItems:'center',m:0}}>
        <Typography variant='h1' sx={{textShadow: '3px 3px 4px black'}} >{title}</Typography>
      </Box>
    </animated.div>
    // {/* <Box sx={{position: 'relative',width: '100%', height: 200, display:'flex', zIndex: 50, justifyContent:'center', overflow: 'hidden', textAlign: 'center', alignItems:'center',m:0, marginBottom: 10}}>  
    //     <video autoPlay loop muted style={{position: 'absolute',maskImage: `url("mask.svg")`, maskSize: '80%', maskRepeat: 'no-repeat', maskPosition: 'center center'}}>
    //      <source src="/Sky_2995.mp4" />
    //     </video>
    //     <Box sx={{position: 'absolute', top: 0, left:0, width: '100%', height: '100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
    //       <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"  width='100%' height='100%' >
    //         <defs>
    //           <mask id="mask" x="0" y="0" width="100%" height="100%" >
    //             <rect x="0" y="0" width="100%" height="100%" fill="white"/>
    //             <text text-anchor="middle" x="50%" y="50%" fill="black" stroke='#d5121b' font-family="monospace" font-size="5em" fontWeight='900'>{title}</text>
    //             <rect x='40%' y='70%' width='20%' height='25px' rx="15" ry="15"/>
    //           </mask>
    //         </defs>
    //         <text text-anchor="middle" x="50%" y="50%" fill="none" stroke='black' font-family="monospace" font-size="5em" fontWeight='900'>{title}</text>
    //         <rect x="0" y="0" width="100%" height="100%" fill= '#d5121b'  mask="url(#mask)" />
    //         {/* <text x="50" y="40" fill="black"  font-family="Osvald" font-size="20">{title}</text> */}
    //       </svg>
    //     </Box>
    // </Box> */}
    

    // <Typography variant='h1'>{title}</Typography>
  )
}

export default Title

