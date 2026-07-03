import { ClientData } from "../types/client";

export function saveClient(clientData: ClientData): Promise<ClientData> {
  const promise = new Promise<ClientData>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(clientData);
      }
    }, 1000);
  });

  return promise;
}
