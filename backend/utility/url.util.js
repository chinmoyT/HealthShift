export const createUrl = ()=> {
    try {
        let BASE_APPLICATION = ""
        return {
            ACCESS: {
                USER_INFO: BASE_APPLICATION + '/api/access/access'
            },
            AUTH: {
                POST: BASE_APPLICATION + '/login'
            }
        }
    } catch(err) {
        console.warn(err)
    }
}

export default {createUrl}