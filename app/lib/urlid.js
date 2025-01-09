

const urlid = (url) => {
   const urlinfo = url;
   const parts = urlinfo.split('/');
   const pokeid = parts[parts.length - 2];
   return pokeid;
}

export default urlid