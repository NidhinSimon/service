import express from 'express'

const router = express.Router()
import {
    loginUser,
    registerUser,
    checkNumber,
    getServices,
    getCategory,
    saveaddress,
    logoutUser,
    profileget,
    profileEdit,
    addtocart,
    getcart,
    deletecart,
    getBookings,
    userBookings,
    canceluser,
    reportProvider,
    getAddress,
    addwishlist,
    getWishlist,
    WalletHistory,
    verifyGoogle

} from '../controller/userController.js'
import { cancelBooking } from '../controller/providerController.js'


router.post('/register', registerUser)
router.post('/check', checkNumber)
router.post('/login', loginUser)


router.get('/services/:id', getServices)
router.get('/categoryname/:id', getCategory)
router.post('/saveaddress', saveaddress)
router.post('/logout', logoutUser)
router.get('/profile/:id', profileget)
router.post('/profileedit/:id', profileEdit)
router.post('/cart', addtocart)
router.get('/cart/:id', getcart)
router.delete('/cart/:id/:serviceId', deletecart)
router.post('/getbookings/:id', getBookings)
router.get('/bookings/:id', userBookings)
router.post('/canceluser/:id', canceluser)
router.post('/reportProvider/:id', reportProvider)

router.get('/addresses/:id', getAddress)
router.post('/wishlist/add/:userId',addwishlist)
router.get('/wishlist/:userId',getWishlist)


router.get('/wallet-history/:userId',WalletHistory)

router.post("/verifyGooglelogin",verifyGoogle)


export default router