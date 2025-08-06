import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';

const UserPage = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const[openModal, setOpenModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const fetchData=async()=>{
        try {
            const response=await axios.get(`${API_URL}/api/users`);
            setData(response.data);
            console.log("Data fetched successfully:", response.data);
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const handleDelete=async(id)=>{
        try {
            await axios.delete(`${API_URL}/api/users/${id}`);
            setData(data.filter(item=>(item._id!==id)))
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again later.");
        }
    }
    const handleupdate=(id)=>{
        const updateUser=data.find((item)=>item._id === id)
        if(updateUser){
            setUsername(updateUser.username);
            setEmail(updateUser.email);
            setIsUpdate(true);
            setCurrentUserId(id);
            setOpenModal(true);
        }
        
    }
    const addUser=async(e)=>{
        e.preventDefault(); 
        if(isUpdate){
            try {
                await axios.put(`${API_URL}/api/users/${currentUserId}`, {
                    username,
                    email
                });
                setIsUpdate(false);
                setCurrentUserId(null);
            } catch (error) {
                console.error("Error updating user:", error);
                alert("Failed to update user. Please check your input and try again.");
            }
            fetchData();
            setOpenModal(false); // Close modal after update
            return;
        }else
        try {
            await axios.post(`${API_URL}/api/users`, {
                username,email
            });
         setUsername('');
         setEmail('');
            fetchData();
            setOpenModal(false) // Refresh the data after adding a new user
            console.log("User added successfully");
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user. Please check your input and try again.");
        }
    }
    useEffect(()=>{
        fetchData();    
    },[]);
  return (
    <div>
       <div className='py-3 flex justify-end pr-6'> <button className='bg-blue-500 p-2 rounded text-white font-s
       ' onClick={()=>setOpenModal(true)}> Add User</button></div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
 
    {
        data.map((item)=>(
            <div
     
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" key={item._id}
    >
      <a href="#">
        <img
          className="rounded-t-lg w-full h-auto"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           {item.username}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.email}
        </p>
        <div className='flex justify-between'>
            <button
         
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={()=>handleupdate(item._id)}
        >
         Update
          
        </button>
         <button
         
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={()=>handleDelete(item._id)}
        >
         Delete
         
        </button>
        </div>
      </div>
    </div>
        ))
    }
 
 
</div> 

   {
    openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl mb-4">{isUpdate ? "Update User" : "Add User"}</h2>
                <form onSubmit={addUser}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 mb-4 w-full"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded"> {isUpdate ? "Update User" : "Add User"}</button>
                </form>
                <button onClick={() => setOpenModal(false)} className="mt-4 bg-red-500 text-white p-2 rounded">Close</button>
            </div>
        </div>
    )}
   

    </div>
  )
}

export default UserPage
