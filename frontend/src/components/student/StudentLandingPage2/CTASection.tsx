"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function CardsCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  const cards = [
    {
      number: 1,
      img: "/Icon 1.png", // ✅ Place this inside /public/images/
      colorClass: "text-blue-700",
      circleColor: "#DAF4FF",
      title: "Create Profile",
      text: "Tell us about your interests, skills, and career aspirations.",
    },
    {
      number: 2,
      img: "/Icon 2.png",
      colorClass: "text-orange-500",
      circleColor: "#FFEBDF",
      title: "Analyze Options",
      text: "We analyze your profile against thousands of career paths and opportunities.",
    },
    {
      number: 3,
      img: "/Icon 3.png",
      colorClass: "text-green-600",
      circleColor: "#D7FFE2",
      title: "Get Roadmap",
      text: "Receive a personalized action plan with scholarships and next steps.",
    },
  ];

  // Duplicate for seamless loop
  const loopItems = [...cards, ...cards];
  const speedSeconds = 12;

  return (
    <div className="lg:hidden w-full overflow-hidden">
      <style>{`
        .marquee-track {
          display: flex;
          gap: 16px;
          align-items: stretch;
          flex-wrap: nowrap;
          animation: marquee ${speedSeconds}s linear infinite;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="marquee-outer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 300)}
      >
        <div
          className={`marquee-track ${isPaused ? "paused" : ""}`}
          style={{ padding: "16px" }}
        >
          {loopItems.map((card, idx) => (
            <div
              key={`${card.number}-${idx}`}
              className="flex-shrink-0 w-[280px] border border-gray-200 rounded-2xl shadow-md px-6 py-8 relative flex flex-col items-center text-center bg-white"
              onPointerDown={() => setIsPaused(true)}
              onPointerUp={() => setTimeout(() => setIsPaused(false), 300)}
            >
              <span
                className={`absolute top-2 right-5 text-6xl text-blue-800 font-bold `}
              >
                {card.number}
              </span>

              {/* ✅ Circle with image inside */}
              <div className="mb-4 w-16 h-16 relative flex items-center justify-center">
                <svg
                  width="75"
                  height="75"
                  viewBox="0 0 75 75"
                  fill="none"
                  className="absolute"
                >
                  <circle
                    cx="37.5"
                    cy="37.5"
                    r="37.5"
                    fill={card.circleColor}
                  />
                </svg>
                <Image
                  src={card.img}
                  alt={card.title}
                  width={100}
                  height={100}
                  className="w-14 h-14 object-contain relative z-10"
                />
              </div>

              <h3
                className={`font-semibold text-base mb-2 mt-2 ${card.colorClass}`}
              >
                {card.title}
              </h3>
              <p className="text-xs text-gray-600 leading-snug px-1">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CTASection() {
  const router = useRouter();
  return (
    <>
      <div className="text-center whitespace-nowrap mb-12  relative">
        <div className="text-6xl md:text-9xl font-bold  text-gray-200 absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          Your Career
        </div>
        <h2 className="text-1xl md:text-4xl font-bold relative z-10 transform translate-y-1/2">
          Your Career Journey, Simplified
        </h2>
      </div>
    <section className="w-full px-6 sm:px-12 lg:px-24 bg-white text-gray-900">
      {/* Title Section */}

      <p className="text-center text-[#000000] mb-12 max-w-2xl mx-auto">
        Follow These Three Simple Steps To Discover Your Best-Fit Stream And
        Build Your Personalized Roadmap.
      </p>

      {/* Steps + CTA Row */}
      <div className="flex flex-nowrap justify-start  lg:gap-4 md:mb-12">
        <div className="mb-8">
          <div className="hidden ml-[-55px] lg:flex justify-start gap-2 lg:gap-8">
            {/* CARD 1 */}
            <div className="relative flex flex-col items-center text-center border border-[#E2E2E2] rounded-2xl shadow-md px-6 py-10 w-[272px] h-[275px] transition-transform duration-300">
              
              <div className="absolute top-0 mt-[-30px] lg:mr-[-35px] right-5 w-[95px] h-[95px] rounded-full bg-white flex items-center justify-center">
  <span className="text-blue-800 text-7xl font-bold">
    1
  </span>
</div>


              {/* Circle with image */}
              <div className="mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-[#DAF4FF] overflow-hidden">
                <Image
                  src="/Icon 1.png"
                  alt="Create Profile"
                  width={50}
                  height={50}
                  className="object-contain"
                ></Image>
              </div>

              <h1 className="font-bold text-lg mb-2 mt-2 text-[#000000]">
                Create Profile
              </h1>
              <p className="text-[14px] text-[#000000] leading-relaxed">
                Tell Us About Your Interests, Skills, And Career Aspiration.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="relative flex flex-col items-center text-center border border-gray-200 rounded-2xl shadow-md px-6 py-10 w-[272px] h-[275px]  transition-transform duration-300">
              <div className="absolute top-0 mt-[-30px] lg:mr-[-35px] right-5 w-[95px] h-[95px] rounded-full bg-white flex items-center justify-center">
  <span className="text-blue-800 text-7xl font-bold">
    2
  </span>
</div>

              <div className="mb-2 w-20 h-20 flex items-center justify-center rounded-full bg-[#FFEBDF] overflow-hidden">
                <Image
                  src="/Icon 2.png"
                  alt="Analyze Options"
                  width={50}
                  height={50}
                  className="object-contain"
                ></Image>
              </div>

              <h1 className="font-bold text-lg mb-1 mt-1 text-[#000000]">
                Analyze Options
              </h1>
              <p className="text-[14px] text-[#000000] leading-relaxed">
                We Analyze Your Profile Against Thousands Of Career Paths And
                Opportunities.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="relative flex flex-col items-center text-center border border-gray-200 rounded-2xl shadow-md px-6 py-10 w-[272px] h-[275px] transition-transform duration-300">
              <div className="absolute top-0 mt-[-30px] lg:mr-[-35px] right-5 w-[95px] h-[95px] rounded-full bg-white flex items-center justify-center">
  <span className="text-blue-800 text-7xl font-bold">
    3
  </span>
</div>

              <div className="mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-[#D7FFE2] overflow-hidden">
                <Image
                  src="/Icon 3.png"
                  alt="Get Roadmap"
                  width={50}
                  height={50}
                  className="object-contain"
                ></Image>
              </div>

              <h3 className="font-bold text-lg mb-2 mt-2 text-[#000000]">
                Get Road-Map
              </h3>
              <p className="text-[14px] text-[#000000] leading-relaxed">
                Receive A Personalized Action Plan With Scholarships And Next
                Steps.
              </p>
            </div>
          </div>

          {/* Mobile: Scrollable Carousel */}
          <div className="lg:hidden overflow-x-auto snap-x snap-mandatory flex gap-4 px-4 py-6">
            <CardsCarousel />
          </div>
        </div>

        <div className="relative md:ml-[45px] flex items-center justify-center w-full h-[60px] lg:w-auto lg:h-[320px]">
  {/* Line */}
  <div className="bg-gray-300 w-[60%] h-[2px] lg:w-[2px] md:mt-[-40px] lg:h-[260px]"></div>

  {/* OR Label */}
  <span className="absolute md:mt-[-30px]  bg-white px-3 text-gray-600 font-semibold text-sm lg:text-base">
    OR
  </span>
</div>


        {/* ---------------------- CARD 4 (CTA) ---------------------- */}
        <div className="relative mt-[-20px] flex flex-col items-center justify-center text-center px-6 py-10 w-[260px] sm:w-[280px] md:w-[300px] h-[320px]  text-white mb-4 ">
          <div className="relative w-[230px] h-[300px] overflow-hidden mb-5">
            <Image
  src="/bookADemo.jpg"
  alt="BookADemo-image"
  width={0}
  height={0}
  sizes="100vw"
  style={{ width: "auto", height: "auto" }}
/>
          </div>

          <button
            onClick={() => router.push("/contactUs")}
            className="bg-blue-800 cursor-pointer text-white w-full py-1 rounded-lg font-bold text-base sm:text-lg"
          >
            Book a Demo
          </button>
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* Text Section */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          What’s Next For You? Let’s Discover Together.
        </h2>
        <p className="text-[#000000] text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
          Explore Your Strengths, Choose The Right Path, And Move Forward With
          Confidence. Your Future Begins Here.
        </p>
      </div>

      {/* Start Button */}
      <div className="text-center mb-10">
        <button
          onClick={() => router.push("/student/signup")}
          className="cursor-pointer bg-[#0222D7] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#021ab8] transition"
        >
          Start Your Journey
        </button>
      </div>

      {/* ------------------------------------ */}
      {/* Bottom Three Cards */}

      <div className="grid grid-cols-2 gap-3 nowrap-flex py-6 lg:flex lg:flex-nowrap lg:justify-start lg:gap-8">
        {/* First row: Image */}
        <div className="w-full sm:w-auto col-span-1  lg:col-auto">
          {/* Desktop Image */}
          <div className="hidden lg:block mt-[-90px] ml-[-20px] bg-gray-200 rounded-lg">
            <Image
  src="/confusedGirl.jpg"
  alt="bg-image"
  width={362}
  height={241}
/>
          </div>

          {/* Mobile Image */}
          <div className="block lg:hidden  bg-gray-200 rounded-lg">
            <Image
  src="/confusedGirl.jpg"
  alt="bg-image"
  width={362}
  height={241}
/>
            
          </div>
        </div>
        <div className="relative w-full md:ml-[-120px] sm:w-[260px] h-[100px] bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col justify-center items-center text-center overflow-hidden col-span-1 lg:w-[312px] lg:h-[100px] lg:col-auto">
       
          <div className="absolute left-0 top-0 h-full w-[6px] bg-[#0222D7] rounded-l-lg"></div>
          <div className="px-2 lg:px-6">
          
            <h3 className="text-[#0222D7] font-semibold text-[12px] lg:text-[21px] mb-1">
           
              In Confusion
            </h3>
            <p className="text-gray-600 text-[8px] lg:text-[14px] leading-snug">
              
              Ensure Which Path To
              <br />Choose At Every Level?
            </p>
          </div>
        </div>
        {/* Second row: Orange Card */}
        <div className="relative w-full sm:w-[260px] h-[100px] bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col justify-center items-center text-center overflow-hidden col-span-1 lg:w-[325px] lg:h-[100px] lg:col-auto">
          
          <div className="absolute left-0 top-0 h-full w-[6px] bg-[#FF7A00] rounded-l-lg"></div>
          <div className="px-2 lg:px-6">
            
            <h3 className="text-[#FF7A00] font-semibold text-[12px] lg:text-[21px] mb-1">
              
              Free Expert Guidance
            </h3>
            <p className="text-gray-600 text-[8px] lg:text-[14px] leading-snug">
              
              Get Insights, Compare Options,
              <br/> And Find What Fits You Best
            </p>
          </div>
        </div>
        {/* //3rd card */}
        <div className="relative w-full sm:w-[260px] h-[100px] bg-white border border-gray-300 rounded-lg shadow-sm flex flex-col justify-center items-center text-center overflow-hidden col-span-1 lg:w-[312px] lg:h-[100px] lg:col-auto">          
          <div className="absolute left-0 top-0 h-full w-[6px] bg-[#008000] rounded-l-lg"></div>
          <div className="px-2 lg:px-6">            
            <h3 className="text-[#008000] font-semibold text-[12px] lg:text-[21px] mb-1"> 
              Get Clarity
            </h3>
            <p className="text-gray-600 text-[8px] lg:text-[14px] leading-snug">
              Finalize Your Path With
              <br/> Complete Confidence
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
