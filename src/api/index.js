import axios from 'axios'

export async function loginUser(user){
    try{
        const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/auth', user)
        return response.data
    }catch(error){
        alert(error)
    }
}


export async function registerUser(user){
    try{
        const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/register', user)
        return response.data
    }catch(error){
        alert(error)
    }
}
