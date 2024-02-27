export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen max-w-md item-center justify-center m-auto">
      {children}
    </main>
  );
}
