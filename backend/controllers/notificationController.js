import Notification from "../models/Notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json({ notifications });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}