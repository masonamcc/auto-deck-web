const ep = 'http://192.168.1.119:8080'

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