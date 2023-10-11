import React from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { customAxios } from "../config/api";
import { useState } from "react";
import { logout } from "../redux/userSlice";
import Widget from "../components/Widget";
// import Chart from "../components/Chart";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
import Chart from "react-apexcharts";
import { currencyFormat } from "../ultils/constant";
import StatusBill from "../components/StatusBill";
import { addListproduct } from "../redux/productSlice";

export default function HomePage() {
  // const [first, setfirst] = useState(second);
  const [moneyState, setmoneyState] = useState(null);
  const [productState, setproductState] = useState(null);
  const [borrowStateLength, setborrowStateLength] = useState(null);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderState, setorderState] = useState(null);

  useEffect(() => {
    getorderApi();
  }, []);
  const getorderApi = async () => {
    try {
      const response = await customAxios.get("/NoiThat/GetBill/getAllBill.php");
      setorderState(response?.data?.result);
      console.log("orderState", orderState);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getproductApi();
  }, []);
  const getproductApi = async () => {
    try {
      const res = await customAxios.get("/NoiThat/GetProductList/read.php");
      dispatch(addListproduct(res?.data));
      setproductState(res?.data?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  // const getproductApi = async () => {
  //   try {
  //     const res = await customAxios.get("/lbm/v1/users/get-all");
  //     dispatch(addListproduct(res.data));
  //     setproductStateLength(res?.data);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };

  const latestOrders = orderState?.slice(-5);
  const latestProduct = productState?.slice(-5);
  console.log("lastest...", latestOrders);
  return (
    <div className="row">
      <div className="col-sm-2" style={{ padding: 0 }}>
        <SideBar menu={sidebar_menu} />
      </div>

      <div className="col-sm-10" style={{ padding: 0 }}>
        <div className="content">
          <div className="content-header">
            <h5 className="content-account">
              <Button
                className="btn-login"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Đăng xuất
              </Button>
            </h5>
          </div>

          <div style={{ textAlign: "center" }}>
            {/* <img
              // src={require("../assets/images/e2.png")}
              src={require("../Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN-1.png")}
              style={{ width: "200px" }}
            /> */}
          </div>
          {/* <h1 className="" style={{ textAlign: "center" }}>
            Thống kê
          </h1> */}

          <h2 style={{ textAlign: "center" }}>Danh sách sản phẩm mới nhất</h2>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <table className="table recently-violated table-new-order">
                <thead>
                  <tr>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Mã sản phẩm</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Phân loại</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá</th>
                  </tr>
                </thead>
                {/* ----------------------------------------- */}
                <tbody id="myTable">
                  {latestProduct?.map((item, index) => (
                    <tr>
                      <td>
                        <img
                          src={item?.IMAGE}
                          style={{ height: "50px", width: "50px" }}
                        />
                      </td>
                      <td>{item?.MASP}</td>
                      <td>{item?.TENSP}</td>
                      <td>{item?.TENLOAI}</td>
                      {/* <td>
                            <TypeProduct item={item?.LOAISP} />
                          </td> */}
                      <td>{item?.SOLUONG}</td>
                      <td>{currencyFormat(item?.GIABAN)}</td>
                    </tr>
                  ))}
                  <div></div>
                </tbody>
              </table>
            </div>
          </div>
          <h2 style={{ textAlign: "center" }}>Danh sách các đơn mới nhất</h2>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <table className="table recently-violated table-new-order">
                <thead>
                  <tr>
                    <th scope="col">Mã hóa đơn</th>
                    <th scope="col">Mã khách hàng</th>
                    <th scope="col">Tên khách hàng</th>
                    {/* <th scope="col">Số phòng</th> */}
                    <th scope="col">Ngày đặt</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Tổng giá</th>
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                {/* ----------------------------------------- */}
                <tbody id="myTable">
                  {latestOrders?.map((item, index) => (
                    <tr>
                      <td
                      // onClick={() => handleDetail(item?.MAKH)}
                      >
                        HĐ{item?.MAHD}
                      </td>
                      <td>{item?.MAKH}</td>
                      <td>{item?.TENKH}</td>
                      <td>{item?.NGAYLAP_HD}</td>
                      <td>{item?.PHONE}</td>
                      <td>{currencyFormat(item?.TONGTIEN)}</td>
                      <td>
                        <StatusBill item={item?.STATUS} />
                      </td>
                    </tr>
                  ))}
                  <div></div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// chrome.exe --disable-web-security --user-data-dir="C:/ChromeDevSession"
