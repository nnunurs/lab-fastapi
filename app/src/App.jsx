import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import Students from './components/Students'

function App() {

  return (
    <ChakraProvider>
      <Students />
    </ChakraProvider>
  )
}

export default App
