import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './services/ProtectedRoutes'
import AddBlog from './pages/AddBlog'
import SingleBlog from './pages/Blogdetails'
import AddCAtegory from './pages/Categories'
import MyBlogs from './pages/MyBlogs'
import EditBlog from './pages/EditBlogs'
import ProfilePage from './pages/ProfilePage'
import AllProfiles from './pages/AllProfiles'
import OthersProfile from './pages/OthersProfile'


function App() {
  const [count, setCount] = useState(0)

  return (
     <>
     <Navbar/>
     <Routes >
      <Route path='/login'  element={<Login/>}/>
      <Route path='/register'  element={<Register/>}/>
      <Route path='/' element={<PrivateRoute/>}>
        <Route path='/'  element={<Home/>}/>
        <Route path='/addCategory' element={<AddCAtegory/>}/>
        <Route path='/addBlog' element={<AddBlog/>}/>
        <Route path='/allProfiles' element={<AllProfiles/>}/>
        <Route path='/blog/:id' element={<SingleBlog/>}  />
        <Route path='/myBlogs' element={<MyBlogs/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/profile/:id' element={<OthersProfile/>}/>
        <Route path='/edit/:id' element={<EditBlog/>}  />
     </Route>
     </Routes>
     </>
  )
}

export default App
