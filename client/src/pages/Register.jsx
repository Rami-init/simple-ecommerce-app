import React, { useEffect, useState } from 'react'
import {Box, Container, CssBaseline, Avatar, Typography, Grid, TextField, Button,Alert, AlertTitle} from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import {useGlobalContext} from '../Context'

import axios from 'axios'
const Register = () => {
    const {getShowNavBar} = useGlobalContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            navigate('/')
        }
    },[navigate])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const {data} =await axios.post('/api/user/register', {name, email, password}, config)
            console.log(data.token)
            await localStorage.setItem('authToken', data.token)
            navigate('/')
        } catch (error) {
            setError(error.response.data.error)
        }
        
    }
  useEffect(()=>{
    getShowNavBar('hide')
    const timeOut = setTimeout(()=>{
        setError('')
    },5000)
    return ()=>{
        clearTimeout(timeOut)
    }
  },[error])
  return (
   <Container maxWidth='xs' component='main' bgcolor='warning.main'>
       <CssBaseline></CssBaseline>
       <Box sx={{
           marginTop: '20%',
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
       }}>
           <Avatar sx={{ m: 1, bgcolor:'secondary.main'}}>
               <LockOutlined></LockOutlined>
            </Avatar>
            <Typography variant='h5' component='h2' sx={{ mb: 2}}>
                Sign Up
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        autoComplete='Name'
                        name='name'
                        label='name'
                        id='name'
                        fullWidth
                        required
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        autoComplete='Email'
                        name='email'
                        label='Email'
                        id='email'
                        fullWidth
                        required
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        autoComplete='Password'
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        fullWidth
                        required
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button 
            type='submit'
            fullWidth
            variant='contained'
            sx={{mt: 3, mb: 2}}
            >
                Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Typography variant='body2' component='p'><Link to='/login'>I already have an account? Sign in</Link></Typography>
                </Grid>
            </Grid>
            </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 3
                }} >
                    {error && (
                        <Alert severity='error' sx={{ mt: 1}}>
                            <AlertTitle>Error</AlertTitle>
                            An alert - <strong>{error}</strong>
                        </Alert>
                    )}
                </Box>
        </Box>

    
   </Container>
  )
}

export default Register