import { useEffect, useState } from "react"

const useToken = email => {
    const [token, setToken] = useState('')

    useEffect(() => {
        if (email) {
            fetch(`https://shop-backend-sigma.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.bookToken) {
                        localStorage.setItem("bookToken", data.bookToken)
                        setToken(data.bookToken)
                    }
                })
        }
    }, [email])
    return [token];
}

export default useToken;