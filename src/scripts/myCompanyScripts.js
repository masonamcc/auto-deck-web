import networkConfig from "../networkConfig.json"

export async function createMyCompanyFunc(name, uniqueName, website, email, phone, userId) {

    console.log('Creating Company...', name, uniqueName, email, phone, userId)

    const response = await fetch(`${networkConfig.endPoint}/api/companies/create`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                name: name,
                uniqueName: uniqueName,
                website: website,
                email: email,
                phone: phone,
                ownerId: userId

            })
        })
    const reply = await response.json()
    if (reply) {
        return reply
    }
}

export async function fetchMyCompaniesFunc(userId) {
    console.log('Fetching Companies...')

    const response = await fetch(`${networkConfig.endPoint}/api/companies/ownedBy/${userId}`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({id: userId})
    })

    const reply = await response.json()
    if (reply) {
        return reply
    }
}