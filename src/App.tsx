import React from 'react'
import Layout from './components/Layout';
import Home from './components/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Category from './components/Category';
import ExploreProducts from './components/ExploreProducts';
import Register from './components/Register';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Details from './components/details';
import Cart from './components/Card';
const App = () => {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<Home/>,

        },
  { path: "/category/:id",
    element: <Category />,
  },

    {
  path:"/exploreproduct",
    element:<ExploreProducts/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/contact",
      element:<Contact/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/details/:id",
      element:<Details/>
    },
    {
      path:"/cart",
      element:<Cart/>
    },
    {
      path:"/category",
      element:<Category/>
    }
      ]
    }
  ])
  return <RouterProvider router={route}/>
}

export default App