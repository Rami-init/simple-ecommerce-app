import React from 'react'
import {Container, CssBaseline, Box, Typography} from '@mui/material'
import {Link} from 'react-router-dom'
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
                    
                        <Typography variant='h2'>404</Typography>
                        <Typography variant='h4'><Link to='/'>Page Not Found Back to Home</Link></Typography>
                </Box>
        </Box>

    
   </Container>
  )
}

export default Loading