export const SELECT = (data) => {
  return {
    type: "SELECT_PRODUCT",
    payload: data,
  };
};

export const EMPTY = () => {
  return {
    type: "EMPTY",
  };
};
