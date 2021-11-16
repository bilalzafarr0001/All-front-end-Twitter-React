export const client = (endpoint, { values, ...customConfig } = {}) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: values ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (values) {
    config.body = JSON.stringify(values);
  }

  return fetch(`http://localhost:3000/api/v1${endpoint}`, config).then(
    async (res) => {
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  );
};
export const clientUpdate = (endpoint, { values, ...customConfig } = {}) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: values ? "PUT" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (values) {
    config.body = JSON.stringify(values);
  }

  return fetch(`http://localhost:3000/api/v1${endpoint}`, config).then(
    async (res) => {
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  );
};

export const timeSince = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }

  return Math.floor(seconds) + " seconds";
};

export const uploadImage = (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "qthzsrpl");

  return (
    fetch("https://api.Cloudinary.com/v1_1/nextbridge/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .catch((err) => console.log(err))
  );
};
