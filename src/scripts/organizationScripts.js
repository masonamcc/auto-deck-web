import netConfig from "../networkConfig.json"

const endPoint = netConfig.endPoint
console.log('Endpoint is: ', endPoint)

export const fetchDbOrgs = async() => {
    try {
        const orgs = await fetch (`${endPoint}/organizations`)
        const response = await orgs.json()
        if (response) {
            return response
        }
    } catch (err) {
        console.log("Couldn't fetch Db Orgs: ", err)
    }

}