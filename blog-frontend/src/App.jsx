import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePageComponent from './Component/HomePageComponent/HomePageComponent'
import AddPageComponent from './Component/AddPageComponent/AddPageComponent'
import EditPageComponent from './Component/EditPageComponent/EditPageComponent'
import DeletePageComponent from './Component/DeletePageComponent/DeletePageComponent'
import './App.css'

const App = () => {
  return (
    <Router>
            <div className="container">
              <h1>BLOG APP</h1>
              
            <nav className="nav-menu">
                <Link to="/" className="gray-bg">HOME</Link>
                <Link to="/admin/add" className="gray-bg">ADD BLOG</Link>
                <Link to="/admin/edit" className="gray-bg" >EDIT BLOG</Link>
                <Link to="/admin/delete" className="gray-bg" >DELETE BLOG</Link>
            </nav>
           <Routes>
                 <Route exact path='/' element={<HomePageComponent/>}></Route>
                 <Route path='/admin/add' element={<AddPageComponent/>}></Route>
                 <Route path='/admin/edit' element={<EditPageComponent/>}></Route>
                 <Route path='/admin/delete' element={<DeletePageComponent/>}></Route>
          </Routes>
          </div>
       </Router>
  );
}

export default App