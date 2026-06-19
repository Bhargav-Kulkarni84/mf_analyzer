export default function Hero() {
  return (

    <section className="flex flex-col items-center justify-center text-center min-h-[85vh] px-6">

      <div className="mb-6 px-4 py-2 rounded-full border border-slate-700 text-slate-300 text-sm">
        Modern Mutual Fund Analytics
      </div>

      <h1 className="text-white text-6xl md:text-8xl font-bold max-w-5xl leading-none">
        A New Standard
        <br />
        in Wealth Management
      </h1>

      <p className=" text-slate-400 mt-8 text-lg max-w-2xl">
        Analyze mutual funds, compare performance,
        and make data-driven investment decisions.
      </p>

      <button className="mt-10 px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
        Start Exploring
      </button>

    </section>
  );
}