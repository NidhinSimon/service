
import Coupon from "../models/couponModel.js";



const couponadd = async (req, res) => {
    const { couponName, discount, expiresIn } = req.body
    console.log(req.body)

    const couponcreate = await Coupon.create({
        couponName,
        discount,
        expiresIn

    })
    await couponcreate.save()
    res.json({ message: "coupon added successfully" })

}

const getcoupon = async (req, res) => {
    const coupons = await Coupon.find()
    console.log(coupons)
    res.json(coupons)
}

const editcoupon = async (req, res) => {
    const { id } = req.params
    console.log(req.body, ">>>>>>>>>>>>>>>>>>>.")
    console.log(id, ">>>")
    const coupon = await Coupon.findById(id)
    res.json(coupon)
}

const editableCoupon = async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    console.log(id, "9999")
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await coupon.save()
console.log("hello")
}

export {
    couponadd,
    editcoupon,
    getcoupon,
    editableCoupon

}