import { Router } from "express";
import qs from "querystring";
import crypto from "crypto";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

const paymentRouter = Router();

function sortObject(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

export const createPaymentUrl = async (req, res) => {
  const { amount } = req.query;
  const tmnCode = process.env.VNPAY_TNM_CODE; // Lấy từ VNPay .env
  const secretKey = process.env.VNPAY_HASH_SECRET; // Lấy từ VNPay

  const returnUrl = process.env.VNPAY_RETURN_URL; // Trang kết quả
  const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

  let ipAddr = req.ip;
  let orderId = moment().format("YYYYMMDDHHmmss");
  // let bankCode = req.query.bankCode || "NCB";

  let createDate = moment().format("YYYYMMDDHHmmss");
  let orderInfo = `Deposit_table_fee_at_Tokyo_Bites`;
  let locale = req.query.language || "vn";
  let currCode = "VND";

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "billpayment",
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  // if (bankCode !== "") {
  //   vnp_Params["vnp_BankCode"] = bankCode;
  // }

  vnp_Params = sortObject(vnp_Params);

  let signData = qs.stringify(vnp_Params);
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  let paymentUrl = vnp_Url + "?" + qs.stringify(vnp_Params);
  let TxnRef= vnp_Params.vnp_TxnRef;
  res.json({ paymentUrl, TxnRef});
};

export const checkPayment = async (req, res) => {
  const query = req.query;
  const secretKey = process.env.VNPAY_HASH_SECRET;
  const vnp_SecureHash = query.vnp_SecureHash;

  delete query.vnp_SecureHash;
  const signData = qs.stringify(query);

  const hmac = crypto.createHmac("sha512", secretKey);
  const checkSum = hmac.update(signData).digest("hex");

  if (vnp_SecureHash === checkSum) {
    if (query.vnp_ResponseCode === "00") {
        const table = await fetch(`http://localhost:3000/api/table/${query.vnp_TxnRef}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({depositStatus: 'paid'})
        })
        if (!table.ok) {
            return res.status(500).json({ message: "Cập nhật trạng thái thanh toán thất bại" });
        }
        res.json({ message: "Thanh toán thành công", data: query });
    } else {
      res.json({ message: "Thanh toán thất bại", data: query });
    }
  } else {
    res.status(400).json({ message: "Dữ liệu không hợp lệ" });
  }
};
