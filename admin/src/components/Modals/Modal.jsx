import React from 'react'
import { Button } from "primereact/button";
const Modal = ({title,message,userDetails,confirm,onClose}) => {
  return (
    <>
       <div className="modal-box z-50 absolute left-1/3 top-72 ">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="py-4">
               {message}
              </p>
              <div className="flex justify-center">
                <Button onClick={confirm} className="">
                  OK
                </Button>
              </div>
            </div>
    </>
  )
}

export default Modal
