export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">

      <div className="text-white text-xl font-semibold">
        FundScope
      </div>

      <div className="hidden md:flex gap-8 text-slate-300">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Resources</a>
      </div>

      <button className=" px-5 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition">
        Get Started
      </button>

    </nav>
  );
}