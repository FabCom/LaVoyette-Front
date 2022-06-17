import { Box } from "@mui/system";
import styles from '../../styles/poster.module.css'

type PropsPoster = {
  children: React.ReactNode;
  width: string;
  tapeType: string;
};

const Poster = ({children, width, tapeType}: PropsPoster ): JSX.Element => {

  return (
    <Box sx={{width: width, display: 'flex', flexDirection: 'column', alignItems: 'center',  }} >
        <div className={`${styles.imgtape} ${styles[tapeType]}`}>
          {children}
        </div>
    </Box>
  )
}

export default Poster

