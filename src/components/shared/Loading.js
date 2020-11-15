import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex justify-between items-center h-auto w-48">
        <span className="h-8 w-8">
          <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-pink-400 opacity-75"></span>
        </span>
        <span className="h-8 w-8">
          <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-pink-400 opacity-75"></span>
        </span>
        <span className="h-8 w-8">
          <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-pink-400 opacity-75"></span>
        </span>
      </div>
    </div>
  )
}

export default Loading;