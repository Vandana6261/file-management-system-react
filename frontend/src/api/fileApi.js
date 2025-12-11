export const getApiCalling = async () => {
    const response = await fetch("http://localhost:3000/home");
    // console.log(response.json)
    // return response.json();
    let data = response.json();
    return data;
}

export const getInsideFileApi = async (currentPath) => {
    const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ filePath: currentPath })
    });
    let data =  response.json();
    // console.log(data)
    return data;
}
    

export const getFileApi = async() => {
    const response = await fetch("http://localhost:3000")
    let data = response.json()
    // console.log(data, "backend")
    // console.log(data)
    return data;

}