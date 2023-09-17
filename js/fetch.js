export default function customFetch(url, options) {
   return new Promise(async (resolve, reject) => {
     let res = await fetch(url, options);
     if (res.ok) {
       let data = await res.json();
       resolve(data);
     } else {
       reject(res.statusText);
     }
   });
 }
 