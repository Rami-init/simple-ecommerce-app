import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useGlobalContext} from '../Context.js'
import {Link } from 'react-router-dom'
import axios from 'axios'
import { 
    Box, Grid, Container, Typography, 
    Rating, Paper, Divider, Select, FormControl, 
    InputLabel, MenuItem, Button, Card, 
    CardContent, CardMedia, CardActions
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Loading from '../utils/Loading.jsx'
import Error from '../utils/Error.jsx'

const formater = Intl.NumberFormat('en-US',{
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
})
const Product = () => {
  const {getShowNavBar, getCart} = useGlobalContext()
  const params = useParams()
  const [inStock, setInStock] = useState(true);
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [imageProduct, setImageProduct] = useState('')
  const [selectQty, setSelectQty] = useState(0)

  
  useEffect(()=>{
    getShowNavBar('show')
    const fetchData = async()=>{
        try{
        setLoading(true)
        const {data} = await axios.get(`/api/product/${params.id}`)
        setProduct(data.data)
        setImageProduct(data.data.image.secure_url)
        setLoading(false)
      } catch(error) {
        setError(error.response.data)
      }
    }
    fetchData()
  },[imageProduct, params.id])
  const fetchProducts = async ()=>{
    setLoading(true)
    const config = {
      headers: {
        "content-type": "applicatio/json"
      }
    }
    try {
      const {data} = await axios.get('/api/product/products', config)
      let tempProducts = data.data.filter((item)=>{
          if(item.categoryId === product.categoryId){
                return item._id !== product._id
          } else {
              return item.userId === item.userId
          }
      })
      setRelatedProducts(tempProducts)
      setLoading(false)
    } catch(error) {
      setError(error.response.data.error)
    }
  }
  useEffect(()=>{
    fetchProducts()
    getShowNavBar('show')
  },[params.id])


  const handleClick = (e)=> console.log(e.target.value)
  
  if(product.inStock <= 0 ){
      setInStock(false)
  }
   
    return (<>
    {loading?<Loading />: error?<Error error={error}/>:(
    <Container>
        <Box sx={{width: "100%", marginTop: '7vh', mb: 2}}>
                <Paper elevation={4}>
                <Grid container>
                <Grid item xs={12} sm={6} sx={{height: '100%'}}>
                    <img className='image__product' src={imageProduct} alt={product.title}></img>
                </Grid>
                <Grid item xs={12} sm={6} sx={{paddingX: '3rem'}}>
                    <Typography variant='h5' sx={{marginY: '2rem'}}>{product.title}</Typography>
                    <Typography variant='body2' color={'text.secondary'} sx={{marginY: '1rem'}}>{product.description}</Typography>
                    <Rating size='small' value={product.rating} readOnly precision={.5} name={product.title}></Rating>
                    <Box variant='outlined' sx={{marginTop: '1rem',marginRight: '5rem'}}>
                    <Grid container spacing={3} >
                        <Grid item xs={3}>
                        <Typography variant='h6'>Price: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant='h6'>{formater.format(product.price)}</Typography></Grid>
                        </Grid>
                    <Divider />
                    <Grid container spacing={3} sx={{marginTop: '.5rem'}}>
                        <Grid item xs={3}>
                            <Typography variant='body1'>InStock: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body1' color={inStock? 'primary.main': 'error.main'}>{inStock? 'InStock': "outStock"}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={3} sx={{marginTop: '.5rem', display: 'flex'}}>
                        <Grid item xs={3}>
                            <Typography variant='body1'>QTY: </Typography>
                        </Grid>
                        <Grid item xs={4} >
                            <FormControl fullWidth> 
                            <InputLabel id='simple-select-label'>amount</InputLabel>
                            <Select 
                                labelId='simple-select-label'
                                id='simple-select'
                                value={selectQty}
                                label='amount'
                                onChange={(e)=> setSelectQty(e.target.value)}
                            >
                                {[...Array(product.inStock >= 10? 9 :product.inStock)].map((_, idx)=> <MenuItem key={idx} value={idx+1}>{idx+1}</MenuItem>)}
                                
                            </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider />
                        <Box sx={{textAlign: 'center'}}>
                        <Button variant="contained" 
                        sx={{display: 'inline-block', 
                        width: '100%', height: '3.4rem', my: 1}} 
                        endIcon={<ShoppingCartIcon />}
                        onClick={()=>getCart(product, selectQty)}
                        >
                            Buy 
                        </Button>
                        </Box>              
                    </Box>
    
                </Grid>
                </Grid>
            </Paper>
        </Box>
        <Box mt='2'>
            <Typography varinat='h4' my={3}>RelatedProducts</Typography>
            {loading? <Loading />: error? <Error error={error}/>:<Grid container spacing={2}>
                {relatedProducts.map((relatedProduct)=>(
                <Grid item xs={6} md={3} key={relatedProduct._id}>
                    <Card sx={{maxWidth: 255}}>
                        <CardMedia component='img' alt={relatedProduct.title} height='80' image={relatedProduct.image.secure_url} id={relatedProduct.image.public_id} />
                        <CardContent>
                            <Typography component='h5' variant='h6' gutterBottom >{relatedProduct.title}</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                <Rating
                                    name={relatedProduct.title}
                                    value={relatedProduct.rating}
                                    readOnly
                                    precision={0.5}
                                    size='small'
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <Typography variant='h6' component='h6'>{formater.format(relatedProduct.price)}</Typography>
                                </Grid>
                            </Grid>
                            <CardActions>
                                <Button variant='contained' size='small' sx={{bgcolor:'primary.main'}} onClick={()=>getCart(relatedProduct)}>Buy Now</Button>
                                <Button variant='contained' size='small' sx={{bgcolor: 'text.secondary'}}><Link to={`/product/${relatedProduct._id}`}>Show More</Link></Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>}
        </Box>    
    </Container>
    )}
    </>
  )
}

export default Product