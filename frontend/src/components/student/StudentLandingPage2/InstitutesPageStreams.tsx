"use client";

import React, { useState } from "react";
import { _Card, _CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function StreamsSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("After 10th");
  // const carouselRef = useRef<HTMLDivElement | null>(null);

  const streamData: Record<
    string,
    { title: string; desc: string }[]
  > = {
    "After 10th": [
      {
        title: "Start Your Journey In MPC",
        desc: "Engineering, Architecture, or Pure Sciences — your tech path begins here.",
      },
      {
        title: "Build Your Future With BiPC",
        desc: "Explore Medical, Pharmacy, or Life Sciences with strong foundations.",
      },
      {
        title: "Grow In Business With MEC",
        desc: "Step into careers in CA, Business, or Economics with confidence.",
      },
      {
        title: "Think Creatively With CEC",
        desc: "Shape your future in Arts, Law, or Journalism with clarity.",
      },
    ],
    "After 12th": [
      {
        title: "Engineering & Technology",
        desc: "Explore pathways in various engineering fields.",
      },
      {
        title: "Medical & Sciences",
        desc: "Discover careers in medicine and allied health.",
      },
      {
        title: "Business & Management",
        desc: "Learn about careers in finance, marketing, and more.",
      },
      {
        title: "Arts & Humanities",
        desc: "Explore creative and analytical fields.",
      },
    ],
    "Exam Preparation": [
      {
        title: "JEE Main/Advanced",
        desc: "Prepare for top engineering entrance exams.",
      },
      {
        title: "NEET",
        desc: "Ace the national medical entrance exam",
      },
      {
        title: "UPSC CSE",
        desc: "Prepare for civil services examination.",
      },
      {
        title: "Bank PO/Clerk",
        desc: "Get ready for banking sector jobs.",
      },
    ],
    "Up Skilling": [
      {
        title: "Data Science",
        desc: "Master data analysis and machine learning.",
      },
      {
        title: "Web Development",
        desc: "Learn to build modern web applications.",
      },
      {
        title: "Digital Marketing",
        desc: "Boost your career in online marketing.",
      },
      {
        title: "Cloud Computing",
        desc: "Understand cloud platforms and services",
      },
    ],
  };

  const currentStreams = streamData[activeTab];

  return (
    <>
      
      <div className="text-center w-full md:mt-25 mt-15  sm:mb-8 relative px-12 sm:px-6 lg:px-8">
  {/* BACK TITLE - Explore Streams */}
  <div
    className="
      absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2
      pointer-events-none select-none
      font-[Roobert TRIAL] font-extrabold
      text-gray-200
       w-full
      whitespace-nowrap
      leading-[110%]

      text-[36px]     
      sm:text-[60px]  
      md:text-[90px] 
      lg:text-[135px] 

    "
    style={{
      fontWeight: 750,
    }}
  >
    Explore Streams
  </div>

  {/* MAIN TITLE */}
  <h2 className="text-1xl text-[#000000] w-full whitespace-nowrap sm:text-3xl md:text-4xl font-bold relative z-10 transform translate-y-1/2">
    Explore Streams That Shape Your Future
  </h2>
</div>


      {/* Section Body */}
      <section className="py-6 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <p className="text-center font-[Roobert TRIAL] text-black text-lg mb-6">
            Get personalized guidance, real-world mentorship, and
            industry-aligned learning to take your next step with confidence.
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex w-fit justify-between gap-2 bg-[#E2E2E2] rounded-full border border-gray-300 px-1.5 sm:px-3 py-2">
              {Object.keys(streamData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base transition-all ${
                    activeTab === tab
                      ? "bg-blue-800 text-white shadow-md"
                      : "text-[#000000] hover:bg-[#dcdcdc]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-black mb-8 font-medium text-base sm:text-lg">
            Personalized Support To Help You Decide What To Do{" "}
            <span className="capitalize">{activeTab}</span>.
          </p>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-blue-800 transform -translate-x-1/2"></div>

            <div className="space-y-14 transition-all duration-500 ease-in-out">
              {currentStreams.map((stream, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-12 ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "text-left" : "text-left"
                    }`}
                  >
                 <_Card className="relative overflow-visible border-[#0222D7] border-[1.5px] rounded-2xl hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">

  {/* Side Accent Line */}
  <div
    className={`
      absolute top-[45px] -translate-y-1/2 
      bg-[#0222D7]
      w-[10px]
      h-[30%]
      
      rounded-full
      ${index % 2 === 0 ? "ml-[-10px] left-0" : "mr-[-10px] right-0"}
    `}
  ></div>

  {/* SIDE IMAGE (new absolute positioning) */}
  <div
    className={`
      absolute mt-[30%] -translate-y-1/2
      ${index % 2 === 0 ? "-ml-" : "-right-0.5"}
    `}
  >
    <Image
      src={
        index % 2 === 0
          ? "/Images/missionViolet.svg"
          : "/Images/missionVioletRight.svg"
      }
      alt={stream.title}
      width={120}
      height={120}
      className="w-auto h-auto object-contain"

    />
  </div>

  {/* Card Content */}
  <_CardContent
    className="p-12 flex items-start gap-8 flex-row"
  >
    <div className="flex flex-col ">
      <h3 className="text-2xl font-bold mb-2 text-gray-900">
        {stream.title}
      </h3>

      <p className="text-[#000000] flex-nowrap mb-3 text-[15px]">{stream.desc}</p>

      <button
        onClick={() => router.push("/student/signup")}
        className="text-blue-800 font-semibold flex items-center hover:text-blue-700"
      >
        Explore Now <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  </_CardContent>
</_Card>

                  </div>

                  {/* Center Dots */}
                  <div className="flex items-center justify-center w-9 h-9 bg-blue-200 rounded-full relative z-10">
                    <div className="w-4 h-4 bg-blue-800 rounded-full"></div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="md:hidden relative px-4 mt-10">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-800"></div>
            <div className="space-y-6 relative">
              {currentStreams.map((stream, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative z-10 flex flex-col justify-center">
                    <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-blue-800 rounded-full"></div>
                    </div>
                  </div>

                  <_Card className="flex-1 border border-blue-800 rounded-2xl shadow-sm hover:shadow-md transition-all">

  {/* SIDE IMAGE (new absolute positioning) */}
  <div
    className="absolute mt-[20%] -translate-y-1/2 -right-1">
    <Image
      src="/Images/missionVioletRight.svg"
      alt={stream.title}
      width={20}
      height={20}
      className="w-[75%] h-[75%] object-contain"/>
  </div>
                    <_CardContent className="p-4">

                      <h3 className="text-base font-bold mb-1 text-gray-900">
                        {stream.title}
                      </h3>
                      <p className="text-sm text-[#000000] mb-2">
                        {stream.desc}
                      </p>
                      <button 
                      onClick={()=>router.push("/student/signup")}
                      className="text-blue-800 font-semibold text-sm flex items-center hover:text-blue-800">
                        Explore Now{" "}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </_CardContent>
                  </_Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
