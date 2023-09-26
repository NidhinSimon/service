import {adminapiSlice} from './adminapiSlice'


const ADMIN_URL='/admin'


export const adminAuth=adminapiSlice.injectEndpoints({
    endpoints:(builder)=>({
        editService:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/editservice`,
                method:'PUT',
                body:data
            })
        }),
        login:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/adminlogin`,
                method:'POST',
                body:data
            })
        })
        

    })
})

export const {useEditServiceMutation,useLoginMutation}=adminAuth