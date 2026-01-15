export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page has its own layout that bypasses the admin layout
  // This prevents the AdminNav from showing on the login page
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
