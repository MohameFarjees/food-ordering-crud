import React from 'react';
import { MdClose } from 'react-icons/md';
import '../App.css';

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}><MdClose /></div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name} required/>

        <label htmlFor="mobile">Mobile:</label>
        <input type="tel" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile} required/>

        <label htmlFor="itemName">Item Name:</label>
        <input type="text" id="itemName" name="itemName" onChange={handleOnChange} value={rest.itemName} required/>

        <label htmlFor="itemId">Item ID:</label>
        <input type="text" id="itemId" name="itemId" onChange={handleOnChange} value={rest.itemId} required/>

        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" onChange={handleOnChange} value={rest.quantity} required/>

        <label htmlFor="orderType">Order Type:</label>
        <select id="orderType" name="orderType" onChange={handleOnChange} value={rest.orderType} required>
          <option value="preorder">Pre-order</option>
          <option value="takeaway">Takeaway</option>
          <option value="cash">Cash</option>
        </select>

        
  
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;