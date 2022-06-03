import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown  } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import logo from './img/logotele.png' 


const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
<div >  

</div>


      <Navbar bg='white' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <img  src={logo} width="220" height="65"  />

          </LinkContainer>

        
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
      
            <Nav className='ml-auto'>
      
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> S'identifier
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (

            <LinkContainer to='/admin/userlist'>
             <Nav.Link>
             Tableau de bord
              </Nav.Link>
                  </LinkContainer>


      
                  
                 
          
                
                  
               
              )}
                 <LinkContainer to='/contact'>
                  <Nav.Link>
                  Contact 
                  </Nav.Link>
                </LinkContainer>
            </Nav>
            
          </Navbar.Collapse>

       
              
        </Container>
      </Navbar>
      <div class="hr1"/>
    </header>
    
  )
}

export default Header
