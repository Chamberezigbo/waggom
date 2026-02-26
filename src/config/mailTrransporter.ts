import nodemailer from "nodemailer";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const mailer = nodemailer.createTransport({
  host: requiredEnv("MAIL_HOST"),
  port: Number(requiredEnv("MAIL_PORT")),
  secure: requiredEnv("MAIL_SECURE") === "true",
  auth: {
    user: requiredEnv("MAIL_USER"),
    pass: requiredEnv("MAIL_PASS"),
  },
});