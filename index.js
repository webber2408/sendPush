const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')

const app = express()   

app.use(cors())
app.use(bodyParser.json())

const port = 4000

app.get('/',(req,res)=>{
    res.send('Hello world!')
})


app.listen(port,()=> {
    console.log(`Listening to port ${port}`)
})

const dummyDb = {subscription:null}

const saveToDatabase =  subscription => {
    dummyDb.subscription = subscription
}

app.post('/save-subscription',(req,res)=>{
    const subscription = req.body
    saveToDatabase(subscription)
    res.json({message:'Subscription saved'})
})

const vapidKeys = {
    publicKey:'BOtb1CkJo8dPzn7yLyObZeyU5rMibx6Pyj_WlJ2TPNbDx_Hw6XCM2ttwU89uvFaWp2sbanOmJhOCBe0uLoTeoj8',
    privateKey:'LznVbkgCGBACTqg_-o2x4IGtDKjXd8ha4aaRsHrYTDU'
}

webpush.setVapidDetails(
    'mailto:robbysharma24@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

//function to sent notification to the subscribed device
const sendNotification = (subscription,dataToSend='') => {
    webpush.sendNotification(subscription,dataToSend)
}

app.get('/send-notification',(req,res)=>{
    const subscription = dummyDb.subscription
    const message = "Do you want $10 Million in your bank account ?"
    sendNotification(subscription,message)
    res.json({message:'Message sent!'})
})