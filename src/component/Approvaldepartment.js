
import React from "react";
import { UseProduct } from "./usecontext/Productcontext";
import Swal from "sweetalert2";
import Supplierpurchaseorder from "./Supplierpurchaseorder";

const ApprovalDepartment = () => {
  const useProduct = UseProduct();
  const {
    approvalData,
    handleApprovalbtn,
    handleRejectbtn,
  } = useProduct;

  const handleApproval = (item, id) => {
    handleApprovalbtn(item, id);
    Swal.fire({
      title: "Success",
      text: `Product "${item.product}" is approved. Your order is placed`,
      icon: "success",
    });
  };

  const handleRejection = (item, id) => {
    handleRejectbtn(item, id);
    Swal.fire({
      title: "Rejected",
      text: `Product "${item.product}" is rejected`,
      icon: "error",
    });
  };

  return (
    <div className="approval_div">
      <h1>Approval Department</h1>
      {approvalData.length === 0 ? (
        <h4 className="text-center text-info">No data in approval department</h4>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvalData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>
                  {item.approved ? (
                    <button className="btn btn-primary mx-1" disabled>
                      Approved
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => handleApproval(item, item.id)}
                    >
                      Approve
                    </button>
                  )}
                  {item.rejected ? (
                    <button className="btn btn-danger mx-1" disabled>
                      Rejected
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleRejection(item, item.id)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    < Supplierpurchaseorder/>
    </div>

  );
};

export default ApprovalDepartment;

