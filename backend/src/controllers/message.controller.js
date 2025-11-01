import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js"
import User from "../models/User.js"

export const getAllContacts = async (req , res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch(err){
        console.log("Error in getAllContacts controller: ", err);
        res.status(500).json({message:"internal server error"})
    }
}

export const getMessagesByUserId = async (req , res) => {
    try {
        const myId = req.user._id;
        const {id : userToChatId} = req.params;

        const message = await Message.find({
            $or : [
                {
                    senderId : myId,
                    receiverId : userToChatId
                },
                {
                    senderId : userToChatId,
                    receiverId : myId
                }
            ]
        })
        res.status(200).json(message);
    }
    catch(err){
        console.log("Error in getMessagesByUserId controller: ", err);
        res.status(500).json({message:"internal server error"})
    }
}
export const sendMessage = async (req, res) => {
    try {
        const { text , image } = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if ( image ){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl
        })
        await newMessage.save();
        res.status(201).json(newMessage);

        // todo : send message in real-time if user is online  socket.io

    }
    catch(err){
        console.log("Error in sendMessage controller: ", err);
        res.status(500).json({message:"internal server error"})
    }
}

export const getChatPartners = async (req , res ) => {
    try {
        const loggedInUserId = req.user._id;
        const message = await Message.find({
            $or : [
                {
                    senderId : loggedInUserId,
                },
                {
                    receiver : loggedInUserId
                }
            ]
        })

        const chatPartnerIds = [...new Set(
            message.map((msg) => 
                msg.senderId.toString() === loggedInUserId 
                    ? msg.receiverId.toString() : 
                    msg.senderId.toString()
                )
            )
        ]
        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");
        res.status(200).json(chatPartners);
    }
    catch (err) {
        console.log("Error in getChatPartners controller: ", err);
        res.status(500).json({message:"internal server error"})
    }
}


