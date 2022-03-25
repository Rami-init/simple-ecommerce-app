import React from 'react'
import {Container, CssBaseline, Box, CircularProgress} from '@mui/material'

const Loading = () => {
  return (
    <Container maxWidth='xs' component='main' bgcolor='warning.main'>
       <CssBaseline></CssBaseline>
       <Box sx={{
           marginTop: '20%',
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
       }}>
            
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 3
                }} >
                    
                        <CircularProgress color='success'></CircularProgress>
                </Box>
        </Box>

    
   </Container>
  )
}

export default Loading