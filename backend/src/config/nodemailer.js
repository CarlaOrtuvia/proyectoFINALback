import 'dotenv/config'
import nodemailer from 'nodemailer'
import { ticketModel } from "../dao/models/ticket.models.js"
import { userModel } from "../dao/models/users.models.js"

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'carlitaortuvia@gmail.com',
        pass: process.env.PASSWORD_EMAIL,
        authMethod: 'LOGIN'
    }
})


const sendRecoveryMail = async (email, recoveryLink) => {
    try {
        const mailOptions = {
            from: 'carlitaortuvia@gmail.com',
            to: email,
            subject: 'Link para reestablecer su contraseña',
            text: `Haga click en el siguiente enlace para reestablecer su contraseña: ${recoveryLink}`
        }

        await transport.sendMail(mailOptions);
        console.log('Email de recuperación de contraseña enviado correctamente');
    } catch (error) {
        console.log('Error al enviar el correo de recuperación de contraseña:', error);
    }
}


const sendAccountDeletionMail = async (email) => {
    try {
        const mailOptions = {
            from: 'carlitaortuvia@gmail.com',
            to: email,
            subject: 'Eliminación de cuenta por inactividad',
            text: 'Tu cuenta ha sido eliminada debido a la inactividad en los últimos 2 días.',
        };

        await transport.sendMail(mailOptions);
        console.log('Email de eliminación de cuenta enviado correctamente');
    } catch (error) {
        console.log('Error al enviar el correo de eliminación de cuenta:', error);
    }
};


const sendPurchaseConfirmation = async (email, ticketId) => {
    try {
        
        const ticket = await ticketModel.findById(ticketId);
        if (!ticket) {
            console.log('Ticket no encontrado');
            return;
        }
        
        const user = await userModel.findOne({ email: email });
        if (!user) {
            console.log('Usuario no encontrado');
            return;
        }
        const mailOptions = {
            from: 'carlitaortuvia@gmail.com',
            to: email,
            subject: `Gracias por tu compra, ${user.first_name}`,
            text: `Gracias por tu compra, ${user.first_name}. Aquí está la información de tu compra:\n
                    Número de ticket: ${ticket._id}\n
                    Monto total: ${ticket.amount}\n
                    Fecha de compra: ${ticket.purchase_datetime}\n`
        }
        await transport.sendMail(mailOptions);
        console.log('Email de confirmación de compra enviado correctamente');
    } catch (error) {
        console.log('Error al obtener información del ticket o usuario:', error);
    }
}


export const mailer = {
    sendRecoveryMail,
    sendAccountDeletionMail,
    sendPurchaseConfirmation
}