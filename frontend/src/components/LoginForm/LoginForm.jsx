import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()

        const dataForm = new FormData(formRef.current)
        const data = Object.fromEntries(dataForm)
    
        const response = await fetch('http://localhost:4000/api/sessions/login',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        
console.log(response)
    }
  return (
    <div className="container">
   <form  onSubmit={handleSumbit} ref={formRef}>
  <div className="col-auto">
    <label htmlFor="email" className="form-label">
      Email
    </label>
    <input
      type="email"
      name="email"
      className="form-control-plaintext"
      
    />
  </div>
  <div className="col-auto">
    <label htmlFor="password" className="form-label">
      Password
    </label>
    <input
      type="password"
      name="password"
      className="form-control"
    />
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary mb-3">
      Confirm identity
    </button>
  </div>
</form>

  </div>
  
  )
}

export default LoginForm