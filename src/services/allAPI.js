import { BASE_URL } from "./baseURL"
import { commonApi } from "./commonAPI"



//register api
export const registerAPI = async(user)=>{
    return await commonApi("POST",`${BASE_URL}/user/register`,user,"")
}

//login api
export const loginAPI = async(user)=>{
    return await commonApi("POST",`${BASE_URL}/user/login`,user,"")
}

//get a user detials
export const getUserAPI = async(username)=>{
    return await commonApi("GET",`${BASE_URL}/user/detials/${username}`)
}

//edit password
export const editPswdAPI = async(reqBody)=>{
    return await commonApi("PUT",`${BASE_URL}/user/update`,reqBody)
}

//add form data api
export const addFormDataAPI = async(fromdata)=>{
    return await commonApi("POST",`${BASE_URL}/user/fromdata`,fromdata,"")
}
