import React from 'react';
import  {BrowserRouter , createBrowserRouter, RouterProvider} from 'react-router-dom'
import { PageNotFound, Password, Profile, Recovery, Register, Reset, UserName } from './components';



const router = createBrowserRouter([
  {
    path :'/',
    element :  <UserName/>
  },
  {
    path :'/register',
    element : <Register/>
  },
  {
    path :'/reset',
    element : <Reset/>
  },
  {
    path :'/recovery',
    element : <Recovery/>
  },
  {
    path :'/profile',
    element : <Profile/>
  },
  {
    path :'/password',
    element : <Password/>
  },
  {
    path :'*',
    element : <PageNotFound/>
  },
  {
    path :'/register',
    element : <Register/>
  }
])


function App() {
  return (
    <>
     <main>
      <RouterProvider router={router}></RouterProvider>
     </main>
    </>
  );
}

export default App;
