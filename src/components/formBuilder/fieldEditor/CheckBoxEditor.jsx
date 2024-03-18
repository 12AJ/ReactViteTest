import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateField } from '../../../store/formBuilder/FormBuilderSlice'


import './Editor.scss'
import { fields } from './Fields'


const CheckBoxEditor = ({data}) => {
const formBuilder = useSelector(state => state.formBuilder)
const dispatch=useDispatch()

const divRef=useRef()

    
const handleSubmit=(e)=>{
    e.preventDefault()
    const children= divRef.current.querySelectorAll('input , textarea')
    const state={type:fields.CheckBox}
    for (let i = 0; i < children.length; i++) {
       const child = children[i]
       if(child.type=="checkbox"){
        state[child.name]=child.checked
       }else if(child.type=="submit"){
       
       }else{
        state[child.name]=child.value
       } 
    }
    dispatch(updateField(state))
    console.log(state);
}




  return (
    
    <div ref={divRef} className='editorForm'>
       
            <label>
                <span>Id</span>
                <input type="text" name="id" defaultValue={data.id} />
            </label>

            <label>
                <span>Label</span>
                <input type="text" name="label" defaultValue={data.label}/>
            </label>

            <label>
                <span>Name</span>
                <input type="text" name="name" defaultValue={data.name} />
            </label>

            <label>
                <span>Value</span>
                <textarea name="value" defaultValue={data.value}></textarea>
              
            </label>

        

            <label>
                <span>Required?</span>
                <input type="checkbox" name="isRequired" defaultChecked={data.isRequired} />
            </label>

        

           
            <button onClick={handleSubmit}>Submit</button>
        
    </div>
    
  )
}

export default CheckBoxEditor