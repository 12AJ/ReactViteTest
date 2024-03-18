import React, { useState } from 'react'
import Step from './Step'

import "./Stepper.scss"

const Stepper = ({children}) => {
    const [step,setStep]=useState(0)

    const handleTabChange=(e,i)=>{
        e.preventDefault()
        setStep(i)
    }
    const handleNext=(e)=>{
        e.preventDefault()
        setStep((step)=>{return (step+1<children.length)?step+1 : children.length })
    }
    const handlePrevious=(e)=>{
        e.preventDefault()
        setStep((step)=>{return (step-1>0)?step-1 : 0 })
    }
    return <div className='Stepper'>


<div>
{
            children.map((child,i)=>{ 
                return <button  key={i} onClick={(e)=>handleTabChange(e,i)} className={`tab ${(step==i)?'selected':''}`}> {child.props.title} </button>
                
            })

            
        }


      
</div>

<div >
  Current Step: <strong> {step}</strong>
</div>

        {
            children.map((child,i)=>{ 
                
                    return <div key={i} className={`${(i==step)?'show':'hide'}`}>{child}</div>
               
                
            })
        }
       

       <div>
        <button onClick={handlePrevious} disabled={(step>0)?false:true}>Previous</button> 
        <button onClick={handleNext} disabled={(step<children.length-1)?false:true}>Next</button>
        </div>

    </div>
}

export default Stepper