import { ADDTOORDER, SHOPS, PRODUCTS, HISTORY, SNACK } from "./types";

export function addShops(shops) {
  return { type: SHOPS, payload: shops };
}
export function addProducts(products) {
  return { type: PRODUCTS, payload: products };
}

export function setOrder(product) {
  return { type: ADDTOORDER, payload: product };
}
export function addToOrder(product, order, dispach) {
  let quantity = 1;
  const indexInOrder = order.findIndex((item) => item.id === product.id);
  if (indexInOrder > -1) {
    quantity = order[indexInOrder].quantity + 1;
    const newOrder = order.map((item) => {
      if (item.id !== product.id) return item;
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        src: item.src,
        quantity,
      };
    });
    localStorage.setItem("order", JSON.stringify(newOrder));
    dispach(setOrder(newOrder));
  } else {
    const newOrder = [
      ...order,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        src: product.src,
        quantity,
      },
    ];
    localStorage.setItem("order", JSON.stringify(newOrder));
    dispach(setOrder(newOrder));
  }
  dispach(setSnackOpen(true));
}
export function deleteToOrder(product, order, dispach) {
  let quantity = 1;
  const indexInOrder = order.findIndex((item) => item.id === product.id);
  if (indexInOrder > -1) {
    quantity = order[indexInOrder].quantity - 1;
    if (quantity < 0) {
      const newOrder = order.filter((item) => item.id !== product.id);
      localStorage.setItem("order", JSON.stringify(newOrder));
      return dispach(setOrder(newOrder));
    }
    const newOrder = order.map((item) => {
      if (item.id !== product.id) return item;
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        src: item.src,
        quantity,
      };
    });
    localStorage.setItem("order", JSON.stringify(newOrder));
    dispach(setOrder(newOrder));
  }
}

export function addHistory(history) {
  return { type: HISTORY, payload: history };
}
export function setSnackOpen(open) {
  return { type: SNACK, payload: open };
}
