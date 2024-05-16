import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button';

function App() {
 return (
   <>
     <Button>Secondary</Button> <br /><br />
     <Button variant="destructive" className="rounded-full">Here</Button> <br /><br />
     <Button variant="secondary">Secondary</Button> <br /><br />
     <Button variant="ghost">Secondary</Button> <br /><br />
   </>
 )
}

export default App
