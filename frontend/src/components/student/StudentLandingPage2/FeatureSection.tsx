"use client";
import Image from "next/image";

const EducationalJourney = () => {
  const stages = [
    { label: "Kindergarten", img: "/kinderGarten.jpg", angle: -90 },
    { label: "Study Abroad", img: "/studyAbroad.jpg", angle: -45 },
    { label: "Exam Preparation", img: "/ExamPrep.jpg", angle: 0 },
    { label: "Upskilling", img: "/Upskilling.jpg", angle: 45 },
    { label: "Graduate", img: "/Graduate.jpg", angle: 90 },
    { label: "Intermediate", img: "/Intermediate.jpg", angle: 135 },
    { label: "Tuition Centers", img: "/TuitionCentres.jpg", angle: 180 },
    { label: "School", img: "/school.jpg", angle: 225 },
  ];
  return (
    <>
      <div className="text-center mt-8 md:mt-18 sm:px-6 lg:px-8">
        <div className="text-4xl sm:text-6xl w-full
      whitespace-nowrap md:text-8xl font-bold text-gray-200 absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          Build to Guide you
        </div>
        <h2 className="text-1xl whitespace-nowrap sm:text-3xl md:text-4xl font-bold relative z-10 transform translate-y-1/4">
          Build to Guide you, Not confuse you
        </h2>
      </div>
      <div className="min-h-screen bg-background py-8 px-4">
        <div className=" mx-auto">
          {/* Top Features */}
          {/* Feature Cards */}
          <div className="w-full mt-10 mb-24 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-24">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#0222D7] bg-white flex items-center justify-center shadow-md">
                  {/* SVG Icon */}
                  
                  <Image
  src="/Images/careerGuidance.svg"
  alt="careerGuidance-image"
  width={0}
  height={0}
  sizes="100vw"
  style={{ width: "auto", height: "auto" }}
/>
                </div>
              </div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                Career Guidance
              </h3>
              <p className="text-xs sm:text-sm md:text-sm text-[#000000] leading-relaxed">
                Get Recommendations Personalized To Your Interests, Skills, And
                Aspirations
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center md:mt-20">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#0222D7] bg-white flex items-center justify-center shadow-md">
                  {/* SVG Icon */}
                  <Image
  src="/Images/GraduateCap.svg"
  alt="GraduateCap-image"
  width={0}
  height={0}
  sizes="100vw"
  style={{ width: "auto", height: "auto" }}
/>
                </div>
              </div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                Scholarship Access
              </h3>
              <p className="text-xs sm:text-sm md:text-sm text-[#000000] leading-relaxed">
                Affordable Education Made Possible Through Verified
                Scholarships.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#0222D7] bg-white flex items-center justify-center shadow-md">
                  {/* SVG Icon */}
                  

                  <Image
  src="/Images/Support.svg"
  alt="Support-image"
  width={0}
  height={0}
  sizes="100vw"
  style={{ width: "auto", height: "auto" }}
/>
                </div>
              </div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                Unbiased Support
              </h3>
              <p className="text-xs sm:text-sm md:text-sm text-[#000000] leading-relaxed">
                No External Pressure Just What&apos;s Best For Your Growth.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center text-center md:mt-20">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#0222D7] bg-white flex items-center justify-center shadow-md">
                  {/* SVG Icon */}
                  

                  <Image
  src="/Images/Admission.svg"
  alt="Admission-image"
  width={0}
  height={0}
  sizes="100vw"
  style={{ width: "auto", height: "auto" }}
/>
                </div>
              </div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                Instant Admission Updates
              </h3>
              <p className="text-xs sm:text-sm md:text-sm text-[#000000] leading-relaxed">
                Get Timely Alerts For Key Deadlines And Openings.
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-4xl mx-auto aspect-square">

      {/* ===========================
          OUTER DASHED CIRCLE SVG
      ============================ */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <circle
          cx="50%"
          cy="50%"
          r="31%"
          fill="none"
          stroke="#0222D7"
          strokeWidth="2"
          strokeDasharray="12,12"
          opacity=""
        />
      </svg>

      {/* ===========================
          CENTER IMAGE CIRCLE
      ============================ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="overflow-hidden md:w-70 md:h-70 w-25 h-25 rounded-full border-4 border-[#0222D7] bg-white flex items-center justify-center shadow-lg">
          <Image
            src="/collegeIllustration.jpg"
            alt="Center Image"
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded-4xl"
          />
        </div>
      </div>

      {/* ===========================
          CIRCULAR STAGES (AUTO-POSITIONED)
      ============================ */}
      {stages.map((stage, i) => {
        const radius = 36; // circle radius from center (%)
        const x = 50 + radius * Math.cos((stage.angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((stage.angle * Math.PI) / 180);

        return (
          <div key={i}>
            {/* Stage Circle */}
            <div
              className="absolute z-20"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="overflow-hidden md:w-35 md:h-35 w-15 h-15 rounded-full border-3 border-[#0222D7] bg-white flex items-center justify-center shadow-md">
                <Image
                  src={stage.img}
                  alt={stage.label}
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                  className="rounded-4xl"
                />
              </div>
            </div>

            
            {/* Label */}
<div
  className="absolute z-30"
  style={{
    left: i>3  ? `${x - 8}%` : `${x + 8}%`, // LEFT cards → shift left, RIGHT → shift right
    top: `${y - 8}%`, // Move label ABOVE the circle
    transform: "translate(-50%, -50%)",
  }}
>
  <div
    className={`
      border-2 border-dashed border-[#000000] bg-white 
      md:px-3 md:py-1 px-1 py-1 rounded whitespace-nowrap text-left`}
  >
    <span className="font-Inter md:text-[18px] text-[10px]">
      {stage.label}
    </span>
  </div>
</div>

          </div>
        );
      })}
    </div>
   
        </div>
      </div>
    </>
  );
};

export default EducationalJourney;
