import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Liliana E. Correa",
  description: "Get in touch with Liliana E. Correa. Whether you have questions about her work, want to collaborate, or simply want to connect, feel free to reach out.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
