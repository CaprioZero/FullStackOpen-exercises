import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UsersList from './components/UsersList'
import UserDetail from './components/UserDetail'
import BlogsList from './components/BlogsList'
import BlogDetail from './components/BlogDetail'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/currentUserReducer'
import { initializeAllUsers } from './reducers/usersReducer'

const App = () => {
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Container>
      {currentUser === null ?
        <>
          <h2>Log in to application</h2>
          <br />
          <Notification />
          <LoginForm />
        </> :
        <>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  BLOG APP
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
                    <MenuItem key={nanoid()} onClick={handleCloseNavMenu}>
                      <Button color="inherit" component={Link} to="/">
                        Blogs
                      </Button>
                    </MenuItem>
                    <MenuItem key={nanoid()} onClick={handleCloseNavMenu}>
                      <Button color="inherit" component={Link} to="/users">
                        Users
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  BLOG APP
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    color="inherit"
                    component={Link} to="/"
                    key={nanoid()}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Blogs
                  </Button>
                  <Button
                    color="inherit"
                    component={Link} to="/users"
                    key={nanoid()}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Users
                  </Button>

                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title={currentUser.name + ' logged in'}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
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
                    <MenuItem key={nanoid()} onClick={handleCloseUserMenu}>
                      <Button color="inherit" id='logout-button' onClick={handleLogout} type='submit'>Logout</Button>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <br />
          <Notification />

          <Routes>
            <Route path='/' element={<BlogsList />} />

            <Route path='blogs' element={<BlogsList />} />
            <Route path='blogs/:id' element={<BlogDetail />} />

            <Route path='users' element={<UsersList />} />
            <Route path='users/:id' element={<UserDetail />} />
          </Routes>
        </>
      }
    </Container>
  )
}

export default App