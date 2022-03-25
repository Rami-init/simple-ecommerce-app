import React from 'react'
import {Container, CssBaseline, Box, Alert, AlertTitle} from '@mui/material'

const Error = ({error}) => {
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
                    
                        <Alert severity='error' sx={{ mt: 1, fontSize: '3rem'}}>
                            <AlertTitle>Error</AlertTitle>
                            An alert - <strong>{error}</strong>
                        </Alert>
                </Box>
        </Box>

    
   </Container>
  )
}

export default Error