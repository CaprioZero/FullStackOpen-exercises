import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Helmet } from 'react-helmet'
import Typography from '@mui/material/Typography'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const BlogsList = () => {
  const currentUser = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const blogFormRef = useRef()

  return (
    <>
      <Helmet>
        <title>Blogs List</title>
      </Helmet>
      <h2>Blogs</h2>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm token={currentUser.token} />
      </Togglable>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog => (
              <StyledTableRow key={blog.id}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`/blogs/${blog.id}`}><Typography variant="body1" gutterBottom>{blog.title}</Typography></Link>
                </StyledTableCell>
                <StyledTableCell><Typography variant="body1" gutterBottom>{blog.author}</Typography></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BlogsList