
import React, { useState } from 'react';
import { UseProduct } from './usecontext/Productcontext';

const Supplierpurchaseorder = () => {
  const { approvedData } = UseProduct();
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
  console.log(approvedData)

  const handlePurchaseorders = () => {
    alert('button clicked')
    setShowPurchaseDetails(true);
  };

  return (
    <div>
      <h2>Supplier's purchase order status update page</h2>
      <button onClick={handlePurchaseorders}>View the purchase details</button>
      {showPurchaseDetails && approvedData.length > 0 && ( // Check if data exists
      
        <table className='table'>
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
            {approvedData.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <button className="btn btn-primary mx-1">confirm delivery</button>
                <button className="btn btn-primary mx-1">delivered</button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* {showPurchaseDetails && approvedData.length === 0 && ( // Display message if no data
        <p>No data available for approved purchases.</p>
      )} */}
    </div>
  );
};

export default Supplierpurchaseorder;

// import React, { useState } from 'react';
// import { UseProduct } from './usecontext/Productcontext';

// const Supplierpurchaseorder = () => {
//   const { approvedData } = UseProduct();
//   const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);

//   const handlePurchaseorders = () => {
//     setShowPurchaseDetails(true);
//   };

//   return (
//     <div>
//       <button onClick={handlePurchaseorders}>View the purchase details</button>
//       {showPurchaseDetails && (
//         <table>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>ID</th>
//               <th>Product</th>
//               <th>Quantity</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {approvedData.map((order, index) => (
//               <tr key={order.id}>
//                 <td>{index + 1}</td>
//                 <td>{order.id}</td>
//                 <td>{order.product}</td>
//                 <td>{order.quantity}</td>
//                 <button className='btn btn-primary'>confirm delivery</button> <button className='btn btn-primary'>delivered</button>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Supplierpurchaseorder;
