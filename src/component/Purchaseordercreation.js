import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UseProduct } from '../component/inventorycontext/Productcontext';
import Approvaldepartment from "./Approvaldepartment";

const Purchaseordercreation = () => {
  const useProduct1 = UseProduct();
  const {
    productData,
    setProductData,
    apiData,
    handleSubmit,
    approvalData,
  } = useProduct1;
  console.log(apiData);
  // console.log(formProductData);
  // console.log(approvalData);
  return (
    <>
      <Form className="form">
        <div className="formbg">
          <h3 className="text-center">Purchase order creation</h3>
          <Form.Group className="mb-3 col-lg-12 col-sm-12 col-md-6">
            <Form.Label> Product</Form.Label>
            <Form.Select
              value={productData.product}
              onChange={(e) =>
                setProductData({ ...productData, product: e.target.value })
              }
            >
              <option value=""> Select product</option>
              {apiData.map((item) => {
                return (
                  <option value={item.tab} key={item.id}>
                    {item.tab}{" "}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-12 col-sm-12 col-md-6">
            <Form.Label> Quantity</Form.Label>
            <Form.Control
              value={productData.quantity}
              type="number"
              min="0"
              onChange={(e) =>
                setProductData({ ...productData, quantity: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <Button onClick={handleSubmit} className='submitbtn'>Submit</Button>
      </Form>
      <Approvaldepartment/>
     
    </>
  );
};

export default Purchaseordercreation;
