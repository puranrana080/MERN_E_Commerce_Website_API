import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;
  let userId = req.user;
  try {
    let userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });
    res.json({ message: "Address Added", userAddress, success: true });
  } catch (error) {
    res.json(error.message);
  }
};

export const getAddress = async (req, res) => {
  try {
    let address = await Address.find({ userId: req.user }).sort({
      createdAt: -1,
    });
    res.json({ message: "address", userAddress: address[0], succes: true });
  } catch (error) {
    res.json(error.message);
  }
};
