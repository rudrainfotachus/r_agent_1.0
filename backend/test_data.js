import bcrypt from 'bcrypt'


const data ={

    bills:[
    {
        "billID":'120',
        "customerName":"Vijay",
        "contact":"9912359120",
        "address":"vaishali",
        "itemDesc":"rani haar",
        "totalAmount":"5000",
        "receivedAmount":"1000",
        "billImage":"image/mybill.jpg",
        "comments":[{
            "name":"shivam",
            "comment":"next month",
            "dateTime":"24-07-2021"
        },
        {
            "name":"Rudra",
            "comment":"next month",
            "dateTime":"26-07-2021"
        },
        {
            "name":"Vinay",
            "comment":"next month",
            "dateTime":"26-07-2021"
        }]
    },
    {
        "billID":'121',
        "customerName":"Uttam",
        "contact":"9912359123",
        "address":"vaishali",
        "itemDesc":"rani haar, diamond angoothi",
        "totalAmount":"6500",
        "receivedAmount":"10560",
        "billImage":"image/mybill.jpg",
        "comments":[{
            "name":"shivam",
            "comment":"next month",
            "dateTime":"24-07-2021"
        },
        {
            "name":"Rudra",
            "comment":"next month",
            "dateTime":"26-07-2021"
        },
        {
            "name":"Vinay",
            "comment":"next month",
            "dateTime":"26-07-2021"
        }]
    },
    {
        "billID":'122',
        "customerName":"Radha",
        "contact":"9912359122",
        "address":"vaishali",
        "itemDesc":"pendant set",
        "totalAmount":"15000",
        "receivedAmount":"33000",
        "billImage":"image/mybill.jpg",
        "comments":[{
            "name":"shivam",
            "comment":"next month",
            "dateTime":"24-07-2021"
        },
        {
            "name":"Rudra",
            "comment":"next month",
            "dateTime":"26-07-2021"
        },
        {
            "name":"Vinay",
            "comment":"next month",
            "dateTime":"26-07-2021"
        }]
    },
    {
        "billID":'123',
        "customerName":"Pratap",
        "contact":"9912359121",
        "address":"vaishali",
        "itemDesc":"Kada",
        "totalAmount":"5000",
        "receivedAmount":"2000",
        "billImage":"image/mybill.jpg",
        "comments":[{
            "name":"shivam",
            "comment":"next month",
            "dateTime":"24-07-2021"
        },
        {
            "name":"Rudra",
            "comment":"next month",
            "dateTime":"26-07-2021"
        },
        {
            "name":"Vinay",
            "comment":"next month",
            "dateTime":"26-07-2021"
        }]
    }
],
    users:[
        {
            name:'shivam',
            email:'admin@rudra.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin: true
        }
    ]
  

}
export default data