import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const baseUrl="https://localhost:44379/api/pagosclientes";
  const [data, setData]=useState([]);
  const [texto, setTexto] = useState();

  const handleInputChange = ({target})=>{
    setTexto(target.value)
  }

  const peticionGet = async() => {    
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })

  }

  const peticionGetId = async() => {
    var urlf = baseUrl + '/' + texto;
    await axios.get(urlf)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
    setTexto('');
  }

  useEffect(()=>{
    peticionGet();
  },[])
  return (
    <div className="App">
      <br/><br/>      
      <table className ="table table-sm">
        <thead>
          
        </thead>
        <tbody>          
            <tr>
              <td></td>
              <td></td>
              <td>
                <input type='text' name='cedula' placeholder='Cedula del cliente' 
                value={texto} onChange={handleInputChange}></input>
                
              </td>
              <td></td>
              <td><button className="btn btn-success" onClick={()=>peticionGetId()}>Consultar Cliente</button></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button className="btn btn-success" onClick={()=>peticionGet()}>Consultar Todos</button></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>          
        </tbody>
      </table>         
      <br/><br/>
      <div>
      <table className ="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>NombreCompleto</th>
            <th>FechaPago</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {data.map(pagosclientes=>(
            <tr>
              <td>{pagosclientes.cedula}</td>
              <td>{pagosclientes.nombrecompleto}</td>
              <td>{pagosclientes.fechapago}</td>
              <td>{pagosclientes.monto}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
