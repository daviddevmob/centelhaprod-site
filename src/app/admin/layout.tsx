export const metadata = {
  title: 'Sanity Studio - CentelhaProd',
  description: 'Content Management System',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ margin: 0, height: '100vh', overflow: 'hidden' }}>
      {children}
    </div>
  );
}
