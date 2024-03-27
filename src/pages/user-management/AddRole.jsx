import React, { useEffect, useState } from 'react'
import axios from "axios";
import '../campaign/LinksPopupModal.scss'

const AddRole = ({setAddRolePopup }) => {

    const [formValue, setFormValue] = useState({});


    const handleChange = (event) => {
        setFormValue({
          ...formValue,
          [event.target.id]: event.target.value
        });
      }



async function submitForm(e){
e.preventDefault();
try {
    // make axios post request
    const response = await axios.post("http://localhost:8888/user/roleCreate",formValue);

    alert(response.data.message)
    location.reload();
  } catch(error) {
    console.log(error)
    alert(error)
    
  }


}

    return (


        <div className="popupOuter">
            <div className="popup">

                <form  onSubmit={submitForm}>
                    <div >
                        <label htmlFor="roleName">Name</label>
                        <input type="text" id="roleName" placeholder="" required onChange={handleChange}  />
                    </div>


                    <button  type='submit'>Save </button>

                </form>

                <button onClick={() => setAddRolePopup(false)} >Close</button>

            </div>
        </div>
    )
}

export default AddRole;