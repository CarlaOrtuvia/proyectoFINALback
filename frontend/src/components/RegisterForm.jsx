import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Header from './Header/Header'
import Footer from './Footer/Footer'

const RegisterForm = () => {

    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un object iterator
        const data = Object.fromEntries(datForm)
        const response = await fetch('http://localhost:4000/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status == 200) {
            const datos = await response.json()
            console.log(datos)
            navigate('/login')

        } else {
            console.log(response)
        }
    }
    return (
        <>
        <Header/>
        <form className="row g-3">
  <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label" name= "email">
      Email
    </label>
    <input type="email" className="form-control" id="inputEmail4" />
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label" name="password">
      Password
    </label>
    <input type="password" className="form-control" id="inputPassword4" />
  </div>
  <div className="col-12">
    <label htmlFor="name" className="form-label" name= "name">
      Nombre
    </label>
    <input
      type="text"
      className="form-control"
      id="inputname"
      placeholder="name"
    />
  </div>
  <div className="col-12">
    <label htmlFor="inputsurname" className="form-label" name= "surname">
      Apellido
    </label>
    <input
      type="text"
      className="form-control"
      id="inputsurname"
      placeholder="surname"
    />
  </div>
   
   <div className="col-12">
    <button type="submit" className="btn btn-primary">
      Sign in
    </button>
  </div>
</form>

        
        
        
        
        
        
        <Footer/>
        </>
    )
}