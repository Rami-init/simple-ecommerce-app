import { CardActions, Typography, Button, Card, CardMedia, CardContent, Grid, Rating} from '@mui/material'
import { TimerOutlined } from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { useGlobalContext } from '../Context.js'
const formatePrice = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
})
const Product = ({product}) => {
    let tempProduct = product
  const {title, image, price, rating, _id, description, createdAt} = product
  const {getCart} = useGlobalContext()
  return (
    <Grid item xs={12} sm={6} md={3} >
        <Card sx={{maxWidth: 343, maxHeight: 280}}>
            <CardMedia component='img' alt={title} height='140' image={image.secure_url} id={image.public_id} />
            <CardContent>
                <Typography component='h3' variant='h6' gutterBottom >{title}</Typography>
                <Typography component='h5' variant='body2'>{description.slice(0, 75)}...</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <Rating
                        name={title}
                        value={rating}
                        readOnly
                        precision={0.5}
                        size='small'
                    />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='caption' component='h5' gutterBottom><TimerOutlined size='small' /> : {new Date(createdAt).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body1' component='h5'>{formatePrice.format(price)}</Typography>
                    </Grid>
                </Grid>
                <CardActions>
                    <Button variant='contained' size='small' sx={{bgcolor:'primary.main'}} onClick={()=>getCart(tempProduct)}>Buy Now</Button>
                    <Button variant='contained' size='small' sx={{bgcolor: 'text.secondary'}}><Link to={`/product/${_id}`}>Show More</Link></Button>
                </CardActions>
            </CardContent>
        </Card>
    </Grid>
  )
}

export default Product