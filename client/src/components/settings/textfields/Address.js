import React from "react";
import { TextField, Button,Stack,Box} from "@mui/material";
import * as yup from 'yup'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useFormik } from 'formik';
import { capitalizeWords } from "../../helpers/TextFormat";
import { useSnackbar } from 'notistack';
const Address = (props) => {
    const { enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const profileAddressValidationSchema = yup.object().shape({
        purok: yup
            .string()
            .required('Purok is required'),
        street: yup
            .string()
            .required('Street is required'),
        barangay: yup
            .string()
            .required('Barangay is required')
    })
    const handleFormSubmit = () =>{
        if(Cookies.get('user_id')){
            console.log(Cookies.get('user_id'));
            Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/profile/address`,{
              purok:capitalizeWords(values.purok),
              street: capitalizeWords(values.street),
              barangay: capitalizeWords(values.barangay),
              accessToken: Cookies.get('user_id')
            }).then(res=>{
              if(res.data.success){
                console.log(res.data.data.acc);
                props.setUser(res.data.data.acc);
                Cookies.set('user_id',res.data.data.accessToken, {expires: 1});
                enqueueSnackbar(res.data.message, { variant:'success' });
              }else{
                enqueueSnackbar(res.data.message, { variant:'error' });
              }
            })
          }else{
            navigate("/login");
          }
    }
    const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
        initialValues:{ 
            purok:props.user&&props.user.purok?props.user.purok:'',
            street:props.user&&props.user.street?props.user.street:'',
            barangay:props.user&&props.user.barangay?props.user.barangay:''
        },
        enableReinitialize:true,
        validationSchema:profileAddressValidationSchema,
        onSubmit: handleFormSubmit
    });
    return(
            <Box
            component="form"
            sx={{
            margin:'auto',
            width:'100vh',
            height: '100%',
            justifyContent:'center',
            alignItems:'center'
            }}
            > 
            <Stack sx={{marginTop:2}} spacing={2}>
                <TextField 
                    value= {values.purok}
                    onChange={handleChange('purok')}
                    onBlur={handleBlur('purok')}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    id="purok" 
                    label="Purok" 
                    variant="outlined"
                />
                {(errors.purok && touched.purok) &&
                <p className="text-danger small ">{errors.purok}</p>
                } 
                <TextField
                    value= {values.street}
                    onChange={handleChange('street')}
                    onBlur={handleBlur('street')} 
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    id="street" 
                    label="Street" 
                    variant="outlined" 
                />
                {(errors.street && touched.street) &&
                <p className="text-danger small ">{errors.street}</p>
                } 
                <TextField
                    value= {values.barangay}
                    onChange={handleChange('barangay')}
                    onBlur={handleBlur('barangay')} 
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    id="barangay" 
                    label="Barangay" 
                    variant="outlined" 
                />
                {(errors.barangay && touched.barangay) &&
                <p className="text-danger small ">{errors.barangay}</p>
                } 
            </Stack>
            <Button variant="text" color="success" sx={{mt:2}} disabled={!isValid} onClick={handleSubmit}>Save</Button>
        </Box>
    );
}

export default Address;