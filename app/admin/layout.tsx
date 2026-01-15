import { AdminLayoutWrapper } from "./AdminLayoutWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware handles authentication
  // Use client component to conditionally show nav based on pathname
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
