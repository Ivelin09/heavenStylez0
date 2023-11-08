import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main'
import CreateProd from './components/CreateProd'
import Product from './components/product'
import Register from './components/Register'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Products from './components/Products'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Products />}>

        </Route>
        <Route path="/CreateProd" element={<CreateProd />}>

        </Route>
        <Route path="/Register" element={<Register />}>

        </Route>
        <Route path="/NotFound" element={<NotFound />}>

        </Route>
        <Route path="/Login" element={<Login />}>

        </Route>
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;