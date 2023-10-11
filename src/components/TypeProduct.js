import React from "react";

const Typeproduct = (props) => {
  const { item } = props;
  if (item == 1) {
    return <span>Sofa</span>;
  } else if (item == 2) {
    return <span>Bàn ăn</span>;
  } else if (item == 3) {
    return <span>Giường ngủ</span>;
  } else if (item == 4) {
    return <span>Đèn trang trí</span>;
  }
};
export default Typeproduct;
