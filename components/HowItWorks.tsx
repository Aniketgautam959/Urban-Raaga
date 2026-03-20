import { howItWorksSteps } from "@/lib/data";

export default function HowItWorks() {
  const icons = [
    <svg key="search" className="w-8 h-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    <svg key="heart" className="w-8 h-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    <svg key="clipboard" className="w-8 h-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    <svg key="card" className="w-8 h-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  ];

  return (
    <section className="py-24 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-red text-sm font-bold uppercase tracking-widest mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Book your favourite artist in just 4 easy steps. No hassle, no confusion.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-red via-red-300 to-brand-red opacity-20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full shadow-card group-hover:shadow-card-hover border-2 border-gray-100 group-hover:border-brand-red flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110">
                    <span>{icons[idx]}</span>
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-brand-red rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold">{step.step}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 font-space-grotesk tracking-tight">
            Ready to book a live singer for your event?
          </h3>
          <button className="bg-brand-red hover:bg-[#c90022] text-white font-bold px-10 py-4 rounded-full text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:ring-4 focus:ring-brand-red/30 focus:outline-none">
            Start Booking Now
          </button>
        </div>
      </div>
    </section>
  );
}
