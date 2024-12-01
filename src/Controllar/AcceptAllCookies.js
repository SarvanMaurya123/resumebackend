import User from "../Modules/User.module.js";
const acceptAllCookies = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { cookiesAccepted: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Cookies accepted', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export default acceptAllCookies;
