import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router'
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import JobPage, { jobLoader } from './pages/JobPage';
import NotFoundPage from './pages/NotFoundPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';


  
const App = () => {
// Add Job
  const addJob = async (newJob) =>{
    const res = await fetch('/api/jobs',{
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(newJob),
    })
  }

  // Delete Job
  const deleteJob = async (id) =>{
    const res =await fetch (`/api/jobs/${id}`,{
      method: 'DELETE'
    })
  }

  //updateJob
  const updateJob = async (Job) =>{
    const res = await fetch(`/api/jobs/${Job.id}`,{
      method: 'PUT',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(Job),
    })
  }


  

const router = createBrowserRouter(
createRoutesFromElements(
  <Route path="/" element={ <MainLayout/> } >
    <Route index element={ <HomePage/> } />
    <Route path="jobs" element={ <JobsPage/> } />
    <Route path="add-job" element={ <AddJobPage AddJobSubmit={addJob} /> } />
    <Route path="jobs/:id" element={ <JobPage deleteJob={deleteJob} /> } loader={jobLoader} />
    <Route path="edit-job/:id" element={ <EditJobPage updateJobSubmit={updateJob} /> } loader={jobLoader} />
    <Route path="*" element={ <NotFoundPage/> } />
</Route>
 
  )
);

  return <RouterProvider router={router} />

}


export default App