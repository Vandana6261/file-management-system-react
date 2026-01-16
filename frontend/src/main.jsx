import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' 
import { FileProvider } from "./context/FileContext";
import EmptyFolder from './components/EmptyFolder.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FileProvider>
    <App />
    {/* <EmptyFolder /> */}
    </FileProvider>
  </StrictMode>,
)
