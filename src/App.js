import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import List from "./component/List";
import Nav from "./component/Nav";
import CreateForm from "./component/CreateForm";
import UpdateForm from "./component/UpdateForm";

function App() {
    return (
        <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path={"/"} element={<List/>}></Route>
                <Route path={"/create"} element={<CreateForm />}></Route>
                <Route path={"/update/:id"} element={<UpdateForm />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
