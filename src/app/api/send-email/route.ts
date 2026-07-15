import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, title, tagline, description, rumpun, majors, subjects, pdfBase64 } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // SMTP credentials from env
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    // Check if SMTP is configured. If not, run in Simulated Mode.
    if (!host || !user || !pass) {
      console.warn("⚠️ SMTP Credentials are not configured in .env.local. Running in SIMULATED MODE.");
      console.log(`[Simulated Email to ${email} for ${name || "Siswa"}]:`);
      console.log(`- Result Profile: ${title} (${rumpun})`);
      console.log(`- Majors Recommended: ${majors?.map((m: any) => m.title).join(", ")}`);
      
      // Artificial delay to make it feel real
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      return NextResponse.json({
        success: true,
        message: "Email simulated successfully (SMTP not configured). Check server terminal console logs.",
        simulated: true
      });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port || "587"),
      secure: port === "465", // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    // Format majors HTML
    const majorsHtml = majors?.map((m: any) => `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
        <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 16px;">${m.emoji} ${m.title}</h4>
        <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">${m.desc}</p>
      </div>
    `).join("") || "";

    // Format subjects HTML
    const subjectsHtml = subjects?.map((s: any) => `
      <div style="border-bottom: 1px solid #e2e8f0; padding: 12px 0;">
        <span style="font-size: 18px; margin-right: 8px;">${s.icon}</span>
        <strong>${s.name}</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 13px;">${s.desc}</p>
      </div>
    `).join("") || "";

    // Construct beautiful HTML email body
    const htmlContent = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #334155; border: 1px solid #e2e8f0; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
        <div style="text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 24px;">
          <h2 style="color: #0284c7; margin: 0 0 4px 0; font-size: 22px;">Youth Development Program</h2>
          <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: 500;">Laporan Hasil Asesmen Pemetaan Jurusan</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">Halo <strong>${name || "Siswa"}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Selamat! Kamu telah menyelesaikan kuis pemetaan minat dan jurusan. Berikut adalah rangkuman profil dan rekomendasi akademismu:</p>

        <!-- Profile card -->
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 6px solid #166534; border-radius: 16px; padding: 20px; margin-bottom: 28px;">
          <h3 style="margin: 0 0 4px 0; color: #14532d; font-size: 18px;">Tipe Kepribadian Utama:</h3>
          <h2 style="margin: 0 0 8px 0; color: #166534; font-size: 24px;">${title}</h2>
          <span style="display: inline-block; background-color: ${rumpun === "Saintek" ? "#0284c7" : "#be123c"}; color: white; font-weight: bold; font-size: 11px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 12px;">Rumpun Kuliah: ${rumpun}</span>
          <p style="margin: 0; color: #14532d; font-size: 14px; line-height: 1.6; font-style: italic;">"${tagline}"</p>
          <p style="margin: 12px 0 0 0; color: #1e3a1e; font-size: 14px; line-height: 1.6;">${description}</p>
        </div>

        <!-- Major recommendations -->
        <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 16px;">🎓 Rekomendasi Jurusan Kuliah Utama</h3>
        <div style="margin-bottom: 28px;">
          ${majorsHtml}
        </div>

        <!-- Subject focus -->
        <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 16px;">📚 Mata Pelajaran Pendukung (SNBP)</h3>
        <div style="margin-bottom: 28px;">
          ${subjectsHtml}
        </div>

        <div style="text-align: center; font-size: 12px; color: #94a3b8; border-top: 2px solid #f1f5f9; padding-top: 24px; margin-top: 32px;">
          <p style="margin: 0 0 4px 0;">Surat ini dikirim otomatis oleh sistem Youth TDP.</p>
          <p style="margin: 0;">© 2026 Youth Development Program. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    `;

    // Send email
    const fromEmail = process.env.SMTP_FROM_EMAIL || user;
    const fromName = process.env.SMTP_FROM_NAME || "Youth TDP";
    
    const mailOptions: any = {
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: `Hasil Asesmen Pemetaan Jurusan: ${name || "Siswa"} - ${title}`,
      html: htmlContent,
    };

    if (pdfBase64) {
      mailOptions.attachments = [
        {
          filename: `Hasil_Asesmen_${name?.replace(/\s+/g, "_") || "Siswa"}.pdf`,
          content: pdfBase64,
          encoding: "base64",
        }
      ];
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
