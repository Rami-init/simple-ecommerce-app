import { Container, Typography, Grid, Box, IconButton, Button} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useGlobalContext } from '../Context'
import React from 'react'
const foramtPrice = Intl.NumberFormat('en-us',{
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
})
const Cart = () => {
    const {increseQty, cart, decreseQty, total, amount} = useGlobalContext()
    console.log(cart)
  return (
    <Container maxWidth='sm'>
        <Box sx={{ mt:3 }}>
            {cart.length === 0 ?<Box elevation={4} sx={{ mt:4 }}>
                    <Typography variant='h4'>there is no item in a cart</Typography>
                </Box>:cart.map((item)=>(
                <Grid container spacing={2} elevation={4} key={item._id} sx={{ mt:2 }}>
                    <Grid item xs={6}>
                        {/* <img src={item.image.secure_url || ''} name={item.title}></img> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6'>{foramtPrice.format(Number(item.price * item.qty))}</Typography>
                        <Typography variant='body1' sx={{ my:2 }}>{item.title} </Typography>
                        <Typography variant='body2' color='text.secondary'>{item.description}</Typography>
                        <IconButton aria-label='add to cart' color='primary' onClick={()=>increseQty(item._id)}>
                            <AddIcon />
                        </IconButton>
                        <Typography variant='body1' component='span' sx={{ mx:2 }}>{item.qty}</Typography>
                        <IconButton aria-label='add to cart' color='error' onClick={()=>decreseQty(item._id)}>
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                
                ))}
                <hr />
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
                    <Typography variant='body2'>amount: {amount}</Typography>
                    <Typography variant='body2'>total: {foramtPrice.format(total)}</Typography>
                    <Button variant='contained' size='small'>Payment</Button>
                </Box>
        </Box>
    </Container>
  )
}

export default Cart