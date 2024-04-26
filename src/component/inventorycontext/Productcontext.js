import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const productContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [productData, setProductData] = useState({ product: "", quantity: "" });
  const [approvalData, setApprovalData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false); // Use boolean for rejected state
  const[approvedData,setApprovedData]=useState([]);

  const getProductData = async () => {
    try {
      const apiResponse = await axios.get("http://localhost:4000/product");
      setApiData(apiResponse.data);
      // console.log(apiData)

      const approvalResponse = await axios.get(
        "http://localhost:4000/postproduct"
      );
      setApprovalData(approvalResponse.data);

      const rejectedResponse = await axios.get(
        "http://localhost:4000/RejectedData"
      );
      setRejectedData(rejectedResponse.data);

      // supplier purchase order statuspage

const approvedserverData=await axios.get('http://localhost:4000/ApprovalData');
setApprovedData(approvedserverData.data);

// console.log(approvedData)


    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch data",
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productData.product && productData.quantity) {
      try {
        const duplicatedItem = approvalData.some(
          (item) => item.product === productData.product
        );
        if (duplicatedItem) {
          throw new Error("Product already added in approval list");
        }

        await axios.post("http://localhost:4000/postproduct", productData);
        Swal.fire({
          title: "Success",
          text: "Data posted to approval department",
          icon: "success",
        });

        setProductData({ product: "", quantity: "" });
        getProductData(); // Refresh data
      } catch (error) {
        console.error("Error posting data:", error);
        Swal.fire({
          title: "Error",
          text: "Product already added in approval list",
          icon: "error",
        });
      }
    } else {
      alert("Please select the product and quantity");
    }
  };
  const handleApprovalbtn = async (approvedItem, id) => {
    try {
      setApproved(true); // Optimistic UI update (approval)
  
      // Send approval request to server
      await axios.post("http://localhost:4000/ApprovalData", approvedItem);
  
      Swal.fire({
        title: "Success",
        text: `Product "${approvedItem.product}" is approved. Your order is placed`,
        icon: "success",
      });
  
      // Update local state after successful approval (assuming server responds with success)
      const updatedApprovalData = approvalData.filter(
        (item) => item.id !== approvedItem.id
      );
      setApprovalData(updatedApprovalData);
      getProductData();
      // Delete item from postproduct (optional, depending on my backend logic)
      await axios.delete(`http://localhost:4000/postproduct/${id}`);
    } catch (error) {
      console.error("Error occurred during approval process:", error);
      setApproved(false); // Revert optimistic UI update
  
      Swal.fire({
        title: "Error",
        text: "Failed to update approval status",
        icon: "error",
      });
    }
  };
  const handleRejectbtn = async (rejectedItem, id) => {
    try {
      setRejected(true); // Optimistic UI update (rejection)
  
      // Send rejection request to server
      await axios.post("http://localhost:4000/RejectedData", rejectedItem);
  
      Swal.fire({
        title: "Rejected",
        text: `Product "${rejectedItem.product}" is rejected`,
        icon: "error",
      });
  
      // Update local state after successful rejection (assuming server responds with success)
      const updatedApprovalData = approvalData.filter(
        (item) => item.id !== rejectedItem.id
      );
      setApprovalData(updatedApprovalData);
  
      // Delete item from postproduct (optional, depending on your backend logic)
      await axios.delete(`http://localhost:4000/postproduct/${id}`);
    } catch (error) {
      console.error("Error occurred during rejection process:", error);
      setRejected(false); // Revert optimistic UI update
  
      Swal.fire({
        title: "Error",
        text: "Failed to update reject status",
        icon: "error",
      });
    }
  };
 
  
  useEffect(() => {
    getProductData(); // Fetch initial data on component mount
  }, []);

  return (
    <productContext.Provider
      value={{
        productData,
        setProductData,
        apiData,
        handleSubmit,
        approvalData,
        handleApprovalbtn,
        approved,
        handleRejectbtn,
        rejected,
        approvedData
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export const UseProduct = () => {
  return useContext(productContext);
};
