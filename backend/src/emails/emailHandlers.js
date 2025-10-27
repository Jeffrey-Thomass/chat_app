import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js"



export const sendWelcomeEmail = async (email , name , clientUrl) => {
    const {data , error} = await resendClient.emails.send({
        from : `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chat App",
        html: createWelcomeEmailTemplate(name , clientUrl)
    })
    if(error){
        console.log("Error sending welcome mail " , error.message || error);
        throw new Error("Failed to send welcome mail");
    }
    console.log("Welcome email send successfully" , data);
}