
import {FormData ,Blob}from "formdata-node";
import axios from "axios";
import fs from "fs";
import multer from "multer"

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage});

export const uploadPhoto = async (req, res) => {
    try {
        const gender = req.body;
        const formData = new FormData();
        const fileBuffer = req.file.buffer;
        const newBlob = new Blob([fileBuffer],{type:req.file.mimetype});
        formData.append('file',newBlob,req.file.originalname);
        formData.append('gender',req.body.gender);
        // console.log(newBlob);
        // console.log(formData);
        const response = await axios.post('https://twolface-foodmodel.hf.space/predictBody', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        })
    
        // Handle API response as needed
       
        res.json({ok : true , massage :'File uploaded successfully to cloud API', data : response.data });
    } catch (error) {
        console.error('Error uploading file to cloud API:', error);
        res.status(500).send('Failed to upload file to cloud API');
    }
};
