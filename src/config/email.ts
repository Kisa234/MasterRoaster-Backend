import nodemailer from 'nodemailer';
import { envs } from './envs';

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: envs.EMAIL_USER,
      pass: envs.EMAIL_APP_PASSWORD
    }
  });

  async sendPasswordResetEmail(to: string, nombre: string, resetLink: string): Promise<void> {
    await this.transporter.sendMail({
      from: `Origo <${envs.EMAIL_USER}>`,
      to,
      subject: 'Recupera tu contraseña - Origo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color:#1F1F1F;">
          <h2 style="color:#B8672E;">Recupera tu contraseña</h2>
          <p>Hola ${nombre || ''},</p>
          <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente botón para continuar:</p>
          <a href="${resetLink}" style="display:inline-block;background:#B8672E;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0;">
            Restablecer contraseña
          </a>
          <p style="font-size:13px;color:#666;">Este enlace expira en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo.</p>
        </div>
      `
    });
  }
}