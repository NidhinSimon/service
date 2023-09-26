import React from 'react'

const BlockModal = ({message,confirm,onclose}) => {
  return (
    <>

   

  <div className="modal-box fixed inset-40  flex items-center justify-center  border  ">
    <form method="dialog">

      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onclose}>✕</button>
    </form>
    <h3 className="font-bold text-lg">{message}</h3>
    <div className='flex justify-center mt-10 rounded- '>
    <button  className='w-10 text-white bg-orange-300 rounded-2xl' onClick={confirm}>Ok</button>
    </div>
  
  </div>

      
    </>
  )
}

export default BlockModal
