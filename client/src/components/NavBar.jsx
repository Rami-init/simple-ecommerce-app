import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom'
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp'
import { Badge } from '@mui/material';
import {useGlobalContext} from '../Context'
import axios from 'axios'
import Error from '../utils/Error.jsx'




const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {getUserLogin, cart} = useGlobalContext()
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] =useState(localStorage.getItem('authToken')|| '')
  const [user, setUser]= useState({})
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] = useState('')
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignOut = (e)=> {
    e.preventDefault()
    setToken(localStorage.removeItem('authToken'))
    setUser([])
    setIsLogin(false)
    setIsAdmin(false)
    getUserLogin(false,false,[])
  }
  useEffect(()=>{
    const UserApi = async()=>{
      try {
            const config = await {
                headers :{
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const  {data} = await axios.get('/api/user/infor', config) 
            data.data.roll === 1 ? setIsAdmin(true): setIsAdmin(false);
            setIsLogin(true)
            setUser(data.data)
            getUserLogin(isLogin, isAdmin, user)
        }catch(error) {
             setError(error.response.data.error)
        }
    }
     if(localStorage.getItem('authToken')){
       UserApi()
     }
  }, [localStorage.getItem('authToken')])
    
  return (
    <>
    {error?<Error error={error}/>:<AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {isAdmin? <Link to='admin/dashboard'>Admin</Link>: <Link to='/'>RamiShop</Link>}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem>
                  <Typography textAlign="center">{isAdmin? <Link to='admin/createproduct'>Create Product</Link>: <Link to='/'>Home</Link>}</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">{isAdmin? <Link to='admin/categories'>Categories</Link>: <Link to='/'>products</Link>}</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
           {isAdmin? <Link to='admin/dashboard'>Admin</Link>: <Link to='/'>RamiShop</Link>}

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  {isAdmin? <Link to='admin/createproduct'>Create Product</Link>: <Link to='/'>Home</Link>}
              </Button>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  {isAdmin? <Link to='admin/categories'>Categories</Link>: <Link to='/'>products</Link>}
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Link to='/cart'>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    <Badge color='secondary' badgeContent={cart.length} showZero>
                        <ShoppingCartSharpIcon></ShoppingCartSharpIcon>
                    </Badge>
                </Button>
              </Link>
              
          </Box>
          {isLogin ? (<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="./images/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

                <MenuItem  onClick={''}>
                  <Typography textAlign="center"><Link to='user/profile'>Profile</Link></Typography>
                </MenuItem>
                <MenuItem  onClick={''}>
                  <Typography textAlign="center"><Link to='user/dashboard'>Dashboard</Link></Typography>
                </MenuItem>
                <MenuItem  onClick={''}>
                  <Typography textAlign="center"><Button onClick={handleSignOut}>Log Out</Button></Typography>
                </MenuItem>

            </Menu>
          </Box>) : ( 
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 1, color: 'white', display: 'block' }}
              >
                  <Link to='/login'>Login</Link>
              </Button>
              <Button
                sx={{ my: 1, color: 'white', display: 'block' }}
              >
                  <Link to='/register'>register</Link>
              </Button>
              
          </Box>)
          }
          
        </Toolbar>
      </Container>
    </AppBar>}
    </>
  );
};
export default NavBar;
