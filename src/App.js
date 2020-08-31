import React from 'react';
import './index.css'

const App = () => {
  const irsal = [
    { name: "irsal" },
    { name: "james" },
  ]
  return (
    <div>
      {irsal.map((val, idx) => (
        <p>{val.name}</p>
      ))}
      <h1>Hello World</h1>
      <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="email" placeholder="jane@example.com"></input>
    </div>
  )
}

export default App;