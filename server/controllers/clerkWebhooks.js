import User from "../models/user.js";
import { Webhook } from "svix";
const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        };
        await whook.verify(JSON.stringify(req.body), headers);
        const { data, type } = req.body;
        const userData = {
            _id: data.id,
            username: data.first_name + " " + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.image_url
        }
        switch (type) {
            case 'user.created':
                await User.create(userData);
                break;
            case 'user.updated':
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case 'user.deleted':
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }
        res.json({ success: true, message: "webhook processed successfully" });
    }
    catch (err)
    {
        console.error("Error processing webhook:", err);
        return res.status(500).json({ success: false, message: err.message });
    }

}
export default clerkWebhooks;
