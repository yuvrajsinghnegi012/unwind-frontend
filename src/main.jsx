import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
          <Toaster position='bottom-center'/>
        </DndProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
