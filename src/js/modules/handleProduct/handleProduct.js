import normalProduct from "./normalProduct.js";
import fetchProduct from "./fetchProduct.js";

let fetchedCounter = 0;
const handleProduct = async (productID, btnIndex, resolve, globalData) => {
  const data = await fetchProduct(productID);
  if (data == null) return;
  normalProduct(data, btnIndex);
  fetchedCounter++;
  if (fetchedCounter === productsID.length) resolve();
  globalData.push(data);
  return;
};

const handleAllProducts = (globalData) => {
  return new Promise((resolve) => {
    let btnIndex = 0;
    for (let id of productsID) {
      handleProduct(id, btnIndex, resolve, globalData);
      btnIndex++;
    }
  });
};

export default handleAllProducts;
