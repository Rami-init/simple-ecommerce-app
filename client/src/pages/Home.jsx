import React, { useEffect, useState } from 'react'
import {useGlobalContext} from '../Context'
import {Container, Grid} from '@mui/material'
import Loading from '../utils/Loading.jsx'
import Error from '../utils/Loading.jsx'
import axios from 'axios'
import Product from '../components/Product.jsx'
const Home = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const {getShowNavBar} = useGlobalContext()
  const fetchData = async ()=>{
    setLoading(true)
    const config = {
      headers: {
        "content-type": "applicatio/json"
      }
    }
    try {
      const {data} = await axios.get('/api/product/products', config)
      await localStorage.setItem('products_api', JSON.stringify(data.data))
      setProducts(data.data)
      setLoading(false)
    } catch(error) {
      setError(error.response.data.error)
    }
  }
  useEffect(()=>{
    fetchData()
    getShowNavBar('show')
  },[])
  return (
    <Container maxWidth="xl">
      {loading? <Loading /> : error ? <Error error={error}/> :(
        <Grid container spacing={2} mt={3}>
        {products.map((product)=>{
          return <Product key={product._id} product={product}></Product>
        })}
      </Grid>
      )}
    </Container>
  )
}

export default Home