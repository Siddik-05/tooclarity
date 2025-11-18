// "use client";

// import Footer from "@/components/ui/footer";
// import React, { useEffect } from "react";
// import Header from "@/components/ui/Header";
// import { useAuth } from "../lib/auth-context";
// import { useRouter, usePathname } from "next/navigation";
// import FeaturesPage from "./features/page";
// import HomePage from "@/components/LandingPage/HomePage";

// // Main App Component
// const App = () => {
//   const { isAuthenticated, user } = useAuth(); // <-- Added
//   const router = useRouter();
//   const pathname = usePathname();
  
//   useEffect(() => {
//     if (!isAuthenticated || !user) return;

//     // Redirect rules for INSTITUTE_ADMIN
//     if (user.role === "INSTITUTE_ADMIN") {
//       if (user.isPaymentDone === true && user.isProfileCompleted === true) {
//         router.replace("/dashboard");
//         return;
//       }
//       if (user.isPaymentDone === false && user.isProfileCompleted == false) {
//         router.replace("/signup");
//         return;
//       }
//       if (user.isPaymentDone === false && user.isProfileCompleted === true) {
//         router.replace("/payment");
//         return;
//       }
//     }

//     if (user.role === "STUDENT") {
//       if (user.isProfileCompleted === false) {
//         router.replace("/student/onboarding");
//         return;
//       }
//       router.replace("/dashboard");
//       return;
//     }

//   }, [isAuthenticated, user, router]);

//   return (
//     <div className="min-h-screen bg-[#F5F6F9]">
//       <Header />
//       <main className="pt-20">
//         {pathname === "/features" ? (
//           <FeaturesPage />
//         ) : (
//           <HomePage/>
//         )}
//       </main>
//       <Footer />

//     </div>
//   );
// };

// export default App;
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import LandingPage from "@/components/student/StudentLandingPage2/StudentLandingPage";

const StudentLandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, just return (or redirect to login, depending on flow)
    if (!isAuthenticated || !user) return;

    // Redirect logic for STUDENT
    if (user.role === "STUDENT") {
      // If student has not completed onboarding, send to onboarding
      if (user.isProfileCompleted === false) {
        router.replace("/student/onboarding");
        return;
      }

      // If student profile is complete, go to dashboard
      if (user.isProfileCompleted === true) {
        router.replace("/dashboard");
        return;
      }
    }

    // Redirect logic for any other roles (optional)
    if (user.role === "INSTITUTE_ADMIN") {
      // Prevent institute admins from accessing student landing
      router.replace("/dashboard");
      return;
    }

  }, [isAuthenticated, user, router]);

  // Show landing page only for unauthenticated users or guests
  return (
    <div className="min-h-screen bg-[#F5F6F9]">
      <LandingPage />
    </div>
  );
};

export default StudentLandingPage;

