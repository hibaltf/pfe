import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'



import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import Contact from './screens/Contact'

import MedicalFile from './screens/MedicalFile'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>


  
         
     
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
      

          <Route path='/contact' component={Contact} />
          <Route path='/medicalFile' component={MedicalFile} />
      
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
       
    
   
         



        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
