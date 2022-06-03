
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button,Nav, Row, Col,NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser, createUser } from '../actions/userActions'

import { USER_CREATE_RESET } from '../constants/userConstants'


import React, { useState, useEffect } from 'react'


const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete



  const userCreate = useSelector((state) => state.userCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    user: createdUser
  } = userCreate



  useEffect(() => {

     
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/user/${createdUser._id}/edit`)
    } else {
      dispatch(listUsers(''))
    }


  }, [dispatch, history, successDelete, userInfo, createdUser])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  const createUserHandler = () => {
    dispatch(createUser())
  }

  return (
    <Row>
    <>
    <Col md={3}> 
  
    {userInfo && userInfo.isAdmin && (
  

                <Nav title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Patients</NavDropdown.Item>
                  </LinkContainer>
         
                  <LinkContainer to='/MedicalFile'>
                <Nav.Link>
                 Dossier Médicale 
                </Nav.Link>
              </LinkContainer>
                </Nav>

                
              )}
        
    
    </Col>




    <Col md={8}>

      <Row>   
      <Col md={8}>  
      <h1>Gestion des patients </h1>
      </Col>
      <Col md={2}>  
      <Button type='submit' variant='primary'>
            Ajouter 
            </Button>

            </Col>

            </Row>



      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom et prénom </th>
              <th>EMAIL</th>
           
              <th></th>
            </tr>
          </thead>
         

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
        
                <td>

           
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>


                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
                
              </tr>
              
            ))}
            
          </tbody>
          
        </Table>
      
      
      )}
    </Col>  
    </>
   
    </Row>
  )
}

export default UserListScreen
