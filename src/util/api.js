export function saveClient(clientData) {
  const data = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(clientData);
      }
    }, 1000);
  });

  return data;
}
