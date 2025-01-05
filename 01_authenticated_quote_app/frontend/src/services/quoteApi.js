import interceptedAxios from "./interceptedAxios";


export const getQuote = async () => {
try {
    const response = await interceptedAxios.get("/quote")
    return response
    console.log(response)
} catch (error) {
    console.error(error)
    throw error
}
}