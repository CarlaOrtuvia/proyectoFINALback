import Header from './Header/Header'
import Footer from './Footer/Footer'

const UsersForm = () => {
 return (
    <>
    <Header/>
 <div className='container'>
   
  <div className="input-group mb-3">
    <input
      type="text"
      name="email"
      className="form-control"
      placeholder="Email Usuario 1"
      aria-label="Recipient's username"
      aria-describedby="button-addon2"
    />
    <button
      className="btn btn-outline-secondary"
      type="button"
      id="button-addon2"
    >
      Eliminar
    </button>
  </div>
  <div className="input-group mb-3">
    <input
      type="text"
      name="email"
      className="form-control"
      placeholder="Email Usuario 2"
      aria-label="Recipient's username"
      aria-describedby="button-addon2"
    />
    <button
      className="btn btn-outline-secondary"
      type="button"
      id="button-addon2"
    >
    Eliminar
    </button>
  </div>

 </div>


    
    <Footer/>
    
    
    </>
 )}