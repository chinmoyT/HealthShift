import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import AppRouter from './Router.jsx'
import {Toaster} from "@/components/ui/sonner";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
      <Toaster position="bottom-right" richColors/>
    </Provider>
  </StrictMode>,
)
