import React, {Fragment, useEffect  } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './myOrders.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import MetaData from '../layout/Metadata';
import LaunchIcon from '@mui/icons-material/Launch';


const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
   const { loading, error, orders } = useSelector(state => state.myOrders);
   const { user } = useSelector(state => state.user);

   const columns = [
       {
           field: "id", 
           headerName: "Order ID", 
           minWidth: 300, 
           flex: 1
        },
        {
            field: "status", 
            headerName: "Status", 
            minWidth: 150, 
            flex: .5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                ? "greenColor": "redColor";
            }
         },
         {
            field: "itemsQty", 
            headerName: "Items Qty", 
            type: "number",
            minWidth: 150, 
            flex: .3
         },
         {
            field: "amount", 
            headerName: "Amount", 
            type: "number",
            minWidth: 150, 
            flex: 0.5
         },
         {
             field: "actions",
             flex: 0.3,
             type: "number",
             headerName:"Actions",
             sortable: false,
             minWidth: 150,
             renderCell: (params) => {
                 return <Link to={`/order/${params.getValue(params.id, "id")}`}>
                            <LaunchIcon />
                        </Link>
             }
         }
   ];

   const rows =  [];

   orders && orders.forEach((item, index) => {
    rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice
    })
   });


   useEffect(() => {
     if(error) {
         alert.error(error);
         dispatch(clearErrors());
     } 
    dispatch(myOrders());    
   }, [dispatch, alert, error]);
   

  return (
    <Fragment>
        <MetaData title={`${user && user.name} - Orders`} />
        {loading ? <Loader /> : (
            <div className="myOrdersPage">
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myOrdersTable'
                    autoHeight
                />

                <Typography id="myOrdersHeading">{user && user.name}'s Orders</Typography>
            </div>
        )}
        
    </Fragment>
  )
}

export default MyOrders