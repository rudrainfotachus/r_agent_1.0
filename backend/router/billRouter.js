import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Bill from '../models/billModel.js';
import data from './../test_data.js'
import {isAuth} from './../utils.js'
import path  from 'path';
import  multer from 'multer'
import * as csv from 'fast-csv';
import * as fs from 'fs';
// const multer = require('multer')
// const csv = require('fast-csv')
// const fs = require('fs')
 
// global.__basedir = __dirname
// console.log(__dirname)
const __dirname = path.resolve()
console.log(__dirname)
const billRouter = express.Router();

billRouter.get('/', expressAsyncHandler(async (req, res) =>{
    const customerName = req.query.customerName || ''
    const dueDate = req.query.dueDate || ''
    console.log(customerName)
    const cusNameFilter = customerName ? { customerName: { $regex: customerName, $options: 'i' }} :{}
    const dueDateFilter = dueDate ? { dueDate: { $regex: dueDate, $options: 'i' }} :{}

    
    const bills = await Bill.find({...cusNameFilter, ...dueDateFilter})
    res.send(bills);       
}));

billRouter.get('/date', expressAsyncHandler(async (req, res) =>{
    
    const date = new Date()
    const filterDate = Date(date.getDate()+'-'+ (date.getMonth()+1) +'-' + date.getFullYear())
    // { Expiration: { $lte: new Date() } }
    // const dueDateFilter = dueDate ? { dueDate: { $lte: filterDate, $options: 'i' }} :{}

    
    const bills = await Bill.find({dueDate: { "$lte": filterDate}})
    res.send(bills);       
}));



// seed ,many records 
billRouter.get('/seed', expressAsyncHandler(async(req,res)=>{
    
    const createBills= await Bill.insertMany(data.bills)
    res.send({createBills});
}))

// billRouter.get('/all', isAuth, expressAsyncHandler(async (req, res)=>{
//     const bills = await Bill.find({})
//     res.send(bills);
// }))

billRouter.get('/all', expressAsyncHandler(async (req, res)=>{
    
    const bills = await Bill.find({})
    res.send(bills);
}))

billRouter.get('/bill/:id', expressAsyncHandler( async(req,res)=>{
    const bill = await Bill.findById(req.params.id)
    console.l
    if(bill){
        res.send(bill);
    }
    else{
        res.status(404).send({message: 'Bill not Found'})
    }
}))

// FILE UPLOAD SECTION
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname + '/uploads/')    
    },
    filename: (req, file, cb)=> {
        cb(null, file.fieldname + "-" + Date.now() + file.originalname)
    }
});

//filter CSV FILE

const csvFilter = (req, file, cb)=> {
    if(file.mimetype.includes("csv")){
        cb(null, true)
    } else{
        cb("Please Upload CSV Format", false)
    }
}

const upload = multer({storage: storage, fileFilter: csvFilter})

billRouter.post('/upload', upload.single("file"), expressAsyncHandler( async(req, res)=>{
    try{
        // const upload = multer({storage: storage, fileFilter: csvFilter})
        if(req.file == undefined){
            return res.status(400).send({message:"Please upload CSV file"});
        }
        let csvData = [];
        let filePath = __dirname + '/uploads/' + req.file.filename;
        fs.createReadStream(filePath).pipe(csv.parse({headers:true})).on("error", (error)=>{
            throw error.message;
        }).on("data",(row)=>{
            csvData.push(row)
        }).on("end", ()=>{
            console.log(csvData)
            const createBills= Bill.insertMany(csvData)
            res.send({message:'Success Added'});
        })

    }
    catch (error){
        console.log(error)
    }
}))

billRouter.post('/create',expressAsyncHandler(async(req,res)=>{
    const date = new Date()
    const bill = new Bill({
        customerName: 'New - ' + Date.now(),
        contact: '0000000000',
        date: date.getDate()+'-'+ (date.getMonth()+1) +'-' + date.getFullYear(),
        type: 'OpBl',
        billID: Date.now() + Math.floor(Math.random() * 1000),
        totalAmount: '00',
        pendingAmount: '00',
        address: 'Add Address',
        itemDesc: 'Add Items',
        description: 'Add Description',
        due: '-',
        dueDate: Date(date.getDate()+'-'+ (date.getMonth()+1) +'-' + date.getFullYear()),
        days: '',
        comment:[]
    });
    const createBill = await bill.save();
    res.send({message:'Bill Added', bill: createBill})
}))

billRouter.put('/:id',expressAsyncHandler(async(req,res)=>{
    const billId = req.params.id;
    console.log(req.body.dueDate)
    
    const dueDate = Date(req.params.dueDate)
    console.log(dueDate)
    
    const bill = await Bill.findById(billId)
    if(bill){
        bill.customerName = req.body.customerName;
        bill.contact = req.body.contact;
        bill.date = req.body.date;
        bill.type = req.body.type;
        bill.billID = req.body.billID;
        bill.totalAmount = req.body.totalAmount;
        bill.pendingAmount = req.body.pendingAmount;
        bill.due = req.body.due;
        bill.dueDate = dueDate;
        bill.address = req.body.address;
        bill.itemDesc = req.body.itemDesc;
        bill.description = req.body.description;
        const updatedBill = await bill.save()
        res.send({message:'Bill Updated', bill: updatedBill})
    }
    else{
        res.status(404).send({message: "Bill Not Found"})
    }
}))

export default billRouter;;