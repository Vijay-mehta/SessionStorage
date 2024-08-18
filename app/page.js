"use client";

import { useEffect, useState } from "react";
import Modal from "./components/Modal";

export default function Home() {
  const [data, setData] = useState({
    name: "",
    email: "",
    userId: "",
  });
  const [userData, setUserData] = useState([]);

  const [isModal,setIsModal] =useState(false)
  const [currentUser,setCurrentUser] =useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = JSON.parse(sessionStorage.getItem("user")) ?? [];
    userData.push(data);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUserData(userData);
    setData({name:"",email:"",userId:""})
  };

  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("user")) ?? []);
  }, []);

  const handleRemove=(index)=>{

    let newItem =[...userData];
    newItem.splice(index,1)
    sessionStorage.setItem("user", JSON.stringify(newItem));
    setUserData(newItem);
  }

  const handleEdit=(user)=>{
    setCurrentUser(user)
    setIsModal(true)
  }

  return (
    <>
    {isModal && <Modal setIsModal={setIsModal} currentUser={currentUser} setUserData={setUserData}/>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[500px] m-auto  mt-10   bg-white"
      >
        <h1 className=" font-bold text-2xl text-center mb-5">
          Create User in Session Storage
        </h1>
        <input
          type="text"
          value={data.name}
          placeholder="Enter Your Name"
          name="name"
          onChange={handleChange}
          className="px-2 py-3 m-2 border-2"
        />
        <input
          type="email"
          value={data.email}
          placeholder="Enter Your Email"
          name="email"
          onChange={handleChange}
          className="px-2 py-3 border-2 m-2"
        />
        <input
          type="number"
          value={data.userId}
          placeholder="Enter Your UserId"
          name="userId"
          onChange={handleChange}
          className="px-2 py-3 border-2 m-2"
        />
        <button type="submit" className={`bg-black text-white px-2 py-3 m-2 ${data.name && data.email && data.userId ? "":"cursor-not-allowed "}`} disabled={!data.name && !data.email && !data.userId}>
          Save
        </button>
      </form>
      {userData &&
        userData.map((user, index) => (
          <div key={index} className="bg-white p-8 shadow-lg w-[400px] m-auto my-3">
            <div className=" flex  justify-end ">
              <span className=" mr-4 cursor-pointer" onClick={()=>handleEdit(user)}>&#9998;</span>
              <span className=" cursor-pointer" onClick={()=>handleRemove(index)}>&times;</span>
            </div>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.userId}</h2>
          </div>
        ))}
    </>
  );
}
