import React from 'react'

export const App = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='container mx-auto'>
        <input
          className='w-full h-12 px-2 text-xl'
          type={'text'}
          placeholder='ID de steam' />
      </div>
    </div>
  )
}
