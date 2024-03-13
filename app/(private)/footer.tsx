export default function Footer() {
  return (
    <footer className="flex flex-row bg-slate-800 w-full rounded-lg p-3 text-white my-2 items-center text-center justify-center">
      &copy; My App @ {new Date().getFullYear()}
    </footer>
  );
}
