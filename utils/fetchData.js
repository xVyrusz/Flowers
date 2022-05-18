const baseUrl = process.env.BASE_URL;

export const getData = async (url, Authorization) => {
  try {
    console.log("Sending get request to: " + url);
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: 'GET',
      headers: {
        ...Authorization && ({ Authorization }),
      }
    });

    const data = await res.json()
    return data
  } catch (err) {
    console.log("Error: " + err);
    console.error("Error Message: " + err.message);
  }
}

export const postData = async (url, post, token) => {
  try {
    console.log("Sending post request to: " + url);
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error: " + err);
    console.error("Error Message: " + err.message);
  }
}

export const putData = async (url, post, token) => {
  try {
    console.log("Sending put request to: " + url);
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
  } catch (err) {

  }
}

export const patchData = async (url, post, token) => {
  try {
    console.log("Sending patch request to: " + url);
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(post)
    })

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error: " + err);
    console.error("Error Message: " + err.message);
  }
}

export const deleteData = async (url, token) => {
  try {
    console.log("Sending delete request to: " + url);
    const res = await fetch(`${baseUrl}/api/${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error: " + err);
    console.error("Error Message: " + err.message);
  }
}