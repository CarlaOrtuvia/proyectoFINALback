import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCookiesByName } from "../utils/formsUtils.js"
import Header from './Header/Header'
import Footer from './Footer/Footer'

const NewProductsForm = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')
        console.log(token)
        const response = await fetch('http://localhost:4000/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status == 200) {
            const datos = await response.json()
            console.log(datos)
        } else {
            const datos = await response.json()
            console.log(datos)
        }
    }

    return (
        <>
        <form className="row g-3">
  <div className="col-md-4">
    <label htmlFor="product" className="form-label" name="product" >
      Nuevo producto
    </label>
    <input
      type="text"
      name="product"
      className="form-control is-valid"
      id="validationServer01"
      defaultValue=" nuevo producto"
      required=""
    />
    <div className="valid-feedback">Looks good!</div>
  </div>
  <div className="col-md-4">
    <label htmlFor="description" className="form-label" name="description">
      Descripción
    </label>
    <input
      type="text"
      name="description"
      className="form-control is-valid"
      id="validationServer02"
      defaultValue="Description"
      required=""
    />
    <div className="valid-feedback">Looks good!</div>
  </div>
  <div className="col-md-4">
  <label htmlFor="description" className="form-label" name="category">
      Categoria
    </label>
    <input
      type="text"
      name="category"
      className="form-control is-valid"
      id="validationServer02"
      defaultValue="category"
      required=""
    />
  </div>
  < div className="col-md-3">
    <label htmlFor="price" className="form-label" name="price">
      Precio
    </label>
    <input
      type="text"
      name="price"
      className="form-control is-invalid"
      id="validationServer03"
      required=""
    />
  </div>
  <div className="col-md-3">
    <label htmlFor="stock" className="form-label" name="stock">
      Stock
    </label>
    <input
      type="text"
      name="stock"
      className="form-control is-invalid"
      id="validationServer05"
      required=""
    />   
  </div>
  
  <div className="col-md-3">
    <label htmlFor="imagen" className="form-label" name="image">
      Imagen
    </label>
    <input
      type="text"
      name="image"
      className="form-control is-invalid"
      id="validationServer05"
      required=""
    />
  </div>
  
  <div className="col-12">
    <button className="btn btn-primary" type="submit">
      Agregar Producto
    </button>
  </div>
</form>

<Footer/>        
        </>
    )
}
export default NewProductsForm;