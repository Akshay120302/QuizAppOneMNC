import React from 'react'
import "../style/AlertModal.css";
// import 'font-awesome/css/font-awesome.min.css';

function AlertModal({closeAlert , Alert , handleSubmit , helpAlertModalIdentify}) {
  return (
    <>
    <div className="AlertBox">

                <div className="closeALert">

                <i className="fa-solid fa-xmark" onClick={closeAlert}></i>

                </div>

                {/* {console.log("Inside AlertBox")} */}

                <div className='center' >Sure want to SUBMIT !!!</div>    

                <div className="btnAlertBox">

                    <button className="btnAlert" onClick={closeAlert}>Cancel</button>
                    {helpAlertModalIdentify ? 
                      <button type="button" className="btnAlertP" onClick={handleSubmit}>Submit</button>
                      :

                    <button type="button" className="btnAlertP" onClick={Alert}>Submit</button>
                    }

                </div>

            </div>
    
    </>
  )
}

export default AlertModal