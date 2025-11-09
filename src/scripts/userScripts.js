const ep = '10.0.0.38:8080'

export const addDbUser = async(email, firstName, lastName) => {
    const user = await fetch (`${ep}/users/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            firstName: firstName,
            lastName: lastName
        })
    })
    const response = await user.json()
    if (response) {
        console.log('Response: ', response)
        return response
    }
}

export const fetchDbUsers = async() => {
    try {
        const users = await fetch (`http://10.0.0.38:8080/users`)
        const response = await users.json()
        if (response) {
            return response
        }
    } catch (err) {
        console.log("Couldn't fetch Db Users: ", err)
    }

}