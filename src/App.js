import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import Formtable from './components/Formtable';

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    itemName: "",
    itemId: "",
    quantity: "",
    orderType: "preorder", // Default order type
    deliveryId: "",
    customerId: "",
    deliveryDate: "",
    deliveryAddress: "",
    deliveryStatus: ""
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      resetFormData();
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleEdit = (el) => {
    setFormData(el);
    setEditSection(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formData);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      mobile: "",
      itemName: "",
      itemId: "",
      quantity: "",
      orderType: "preorder",
      deliveryId: "",
      customerId: "",
      deliveryDate: "",
      deliveryAddress: "",
      deliveryStatus: ""
    });
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

      {addSection && (
        <Formtable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}

      {editSection && (
        <Formtable
          handleSubmit={handleUpdate}
          handleOnChange={handleOnChange}
          handleclose={() => setEditSection(false)}
          rest={formData}
        />
      )}

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Item Name</th>
              <th>Item ID</th>
              <th>Quantity</th>
              <th>Order Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => {
                return (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.mobile}</td>
                    <td>{el.itemName}</td>
                    <td>{el.itemId}</td>
                    <td>{el.quantity}</td>
                    <td>{el.orderType}</td>
                    <td>
                      <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                      <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
