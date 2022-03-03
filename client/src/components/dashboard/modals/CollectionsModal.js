import  React,{useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import moment from 'moment';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
export default function CollectionsModal(props) {
  
  const columns = ["Schedule", "Route","Weight","Driver", "Date Added"];
  const [data,setData] = useState([]);
  const options = {
    selectableRowsHeader: false,
    selectableRows:"none",
    filter: true,
    filterType: 'dropdown'
  };
  useEffect(() => {
    var temp=[];
    // eslint-disable-next-line array-callback-return
    props.data && props.data.map((collection)=>{
      temp.push([collection.collection_date&&moment(collection.collection_date).format("LLL"), 
                  collection.collection_route && collection.collection_route,
                  collection.collection_weight_volume && collection.collection_weight_volume,
                  collection.collectionDriver&&collection.collectionDriver.fname+" "+collection.collectionDriver.lname,
                  collection.createdAt&&moment(collection.createdAt).format("LL")]);
    })
    setData(temp);
}, [props.data])
  return (
    <BootstrapDialog
    onClose={props.handleCloseModal}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
    >

    <MUIDataTable
      title={"Collection List"}
      data={data}
      columns={columns}
      options={options}
    />
   
  </BootstrapDialog>
  );
}