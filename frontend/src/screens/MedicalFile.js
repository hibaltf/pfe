import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col , NavDropdown , Nav } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'


import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const MedicalFile = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile



  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
       
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
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


      <Col md={5}>
        <h2>Dossier médical</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form >
       
            
           
            <Button type='submit' variant='primary' class="btnMedical">
            Ajouter
            </Button>

            <Form.Group >

      
              <Form.Label>Fiche administrative </Form.Label>
              <Form.Control
                type='input'
                placeholder=''       
             
              ></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary' class="btnMedical">
            Ajouter
            </Button>

            <Form.Group >

      
              <Form.Label>Antécédents </Form.Label>
              <Form.Control
                type='input'
                placeholder=''        
              ></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary' class="btnMedical">
            Ajouter
            </Button>

            <Form.Group >

      
              <Form.Label>Biométrie  </Form.Label>
              <Form.Control
                type='input'
                placeholder=''        
              ></Form.Control>
            </Form.Group>




            <Button type='submit' variant='primary' class="btnMedical">
            Ajouter
            </Button>

            <Form.Group >

      
              <Form.Label>Traitement chronique   </Form.Label>
              <Form.Control
                type='input'
                placeholder=''        
              ></Form.Control>
            </Form.Group>



 
            <Button type='submit' variant='primary' class="btnMedical" >
            Ajouter
            </Button>

            <Form.Group >

      
              <Form.Label>Historique des consultation  </Form.Label>
              <Form.Control
                type='input'
                placeholder=''        
              ></Form.Control>
            </Form.Group>




          </Form>
        )}
      </Col>
    
    </Row>
  )
}

export default  MedicalFile