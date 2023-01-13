import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from './components/auth/Auth';
import Home from "./components/home/Home";
import Header from "./components/navigation/Header";
import MainLayout from "./hoc/MainLayout";

const Router = () => {
   return (
	  <BrowserRouter>
		 <Header/>
		 <MainLayout>
			<Routes>
			   <Route path='auth' element={<Auth/>}/>
			   <Route path='/' element={<Home/>}/>
			</Routes>
		 </MainLayout>
	  </BrowserRouter>
   );
};

export default Router;
