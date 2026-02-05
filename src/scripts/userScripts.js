import netConfig from "../networkConfig.json"

const endPoint = netConfig.endPoint
console.log('Endpoint is: ', endPoint)

export const addDbUser = async(email, firstName, lastName) => {
    const user = await fetch (`${endPoint}/users/create`, {
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
        const users = await fetch (`${endPoint}/users`)
        const response = await users.json()
        if (response) {
            return response
        }
    } catch (err) {
        console.log("Couldn't fetch Db Users: ", err)
    }

}

export const fetchDbUserByOrgId = async(org) => {
    try {
        const user = await fetch (`${endPoint}/users-at-org/${org.id}`)
        const response = await user.json()
        if (response) {
            return response
        }
    } catch (err) {
        console.log("Couldn't fetch Db User By Org Id: ", err)
    }
}

export const signUpUser = async(firstName, lastName, email, password) => {
    const response = await fetch(`${endPoint}/api/users/sign-up`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
    })

    const reply = await response.json()

    if (reply) {
        console.log(reply)
        return reply
    }
}

export const signInUser = async(email, password) => {
    const response = await fetch(`${endPoint}/api/users/sign-in`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    const reply = await response.json()

    if (reply) {
        console.log(reply)
        return reply
    }
}