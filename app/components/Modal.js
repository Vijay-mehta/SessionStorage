import { useEffect, useState } from "react";

const Modal=({currentUser ,setIsModal,setUserData})=>{


    const [edit,setEdit]=useState({
        name:"",
        email:"",
        userId:""
    })

    useEffect(()=>{
        setEdit(currentUser)
    },[currentUser])

    const handleChange=(e)=>{
        const {name,value} =e.target;
        setEdit((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        let updateUser = JSON.parse(sessionStorage.getItem("user")) ?? [];
       let newUpdate =updateUser.map((item)=>
        item.userId === currentUser.userId ? edit :item
        
        )
        sessionStorage.setItem("user", JSON.stringify(newUpdate));
        setUserData(newUpdate)
        setIsModal(false)

    }


    return(
        <div className=" fixed inset-0  bg-black   bg-opacity-50  backdrop-blur-sm">
       <div className=" bg-white w-[500px] m-auto mt-10">
       <form
        onSubmit={handleSubmit}
        className="  flex  flex-col"
      >
        <span className=" text-right text-4xl mx-4 my-3 cursor-pointer" onClick={()=>setIsModal(false)}>&times;</span>
        <h1 className=" font-bold text-2xl text-center mb-5">
          Create User in Session Storage
        </h1>
        <input
          type="text"
          value={edit.name}
          placeholder="Enter Your Name"
          name="name"
          onChange={handleChange}
          className="px-2 py-3 m-2 border-2"
        />
        <input
          type="email"
          value={edit.email}
          placeholder="Enter Your Email"
          name="email"
          onChange={handleChange}
          className="px-2 py-3 border-2 m-2"
        />
        <input
          type="number"
          value={edit.userId}
          placeholder="Enter Your UserId"
          name="userId"
          onChange={handleChange}
          className="px-2 py-3 border-2 m-2"
        />
        <button type="submit" className={`bg-black text-white px-2 py-3 m-2 "cursor-not-allowed `} >
          Save
        </button>
      </form>
       </div>
        </div>
    )

}

export default Modal;