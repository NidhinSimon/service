import express from 'express'




import { registerProvider,getProviders,verifyProvider, rejectProvider, loginProvider,allProviders,providerBlock, unblock,checkprovider} from '../controller/providerController.js'




const serviceRoute=express.Router()




serviceRoute.post('/emp',registerProvider)
serviceRoute.get('/providers',getProviders)
serviceRoute.put('/provider/verify/:id',verifyProvider)
serviceRoute.delete('/provider/reject/:id',rejectProvider)
serviceRoute.post('/providerlogin',loginProvider)   
serviceRoute.get('/allproviders',allProviders)
serviceRoute.put('/block/:id',providerBlock)
serviceRoute.put('/unblock/:id',unblock)
serviceRoute.post('/checkprovider',checkprovider)

export default  serviceRoute