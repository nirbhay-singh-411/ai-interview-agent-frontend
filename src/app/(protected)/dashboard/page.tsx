import React from "react";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import Header from "@/components/dashboard/layout/Header";
import Link from "next/link";

const page = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* <Header /> */}
        <main className="flex-grow overflow-y-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <div className="max-w-[1280px] mx-auto pt-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Welcome back, Sarah{" "}
                  <span className="animate-pulse inline-block">👋</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl">
                  Ready to ace your next interview? You have{" "}
                  <span className="font-semibold text-primary">
                    2 practice credits
                  </span>{" "}
                  remaining this month.
                </p>
              </div>
              <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-lg">
                  add_circle
                </span>
                Get More Credits
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-card-light dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Average Score
                  </p>
                  <span className="material-symbols-outlined text-slate-400">
                    monitoring
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    85/100
                  </p>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">
                    +5%
                  </span>
                </div>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Interviews Completed
                  </p>
                  <span className="material-symbols-outlined text-slate-400">
                    check_circle
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    14
                  </p>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">
                    +2 this week
                  </span>
                </div>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Practice Time
                  </p>
                  <span className="material-symbols-outlined text-slate-400">
                    schedule
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    4h 20m
                  </p>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Total
                  </span>
                </div>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Communication
                  </p>
                  <span className="material-symbols-outlined text-slate-400">
                    record_voice_over
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    High
                  </p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                    Top Skill
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="h-full bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row group/card">
                  <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 mix-blend-overlay z-10" />
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover/card:scale-105"
                      data-alt="Abstract blue digital network representing AI technology"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAobYwiHsqiNJ2TWbPetntEEWQ0AGOcakTBtywuVny0-9hymYn0UNgFiOjCY5C3_neIaIuUyippCIG7Hr3IWBIDcCQszlo3o5g_eKltxEJof8IrsTd_LQTjC2QyV0FwXMFIeS_mOsHL9A7DBfY4jyJ_MD3bYoJHkHfZPsgOmfke5T9UCKbEg9_7WR4bwLT7U-6CXzPKYPKGEZLCk06_hJsjgSJo5M-EV-es-gE97yVLRnzT1yHCIGKulViB9nAud_oMv14-QRkntAv8")',
                      }}
                    />
                  </div>
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-gradient-to-r from-primary to-violet-600 text-white shadow-sm">
                        NEW
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Mock Interview v2.0
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover/card:text-primary transition-colors">
                      Take an AI Interview
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      Simulate a real-world technical or behavioral interview
                      with our advanced AI. Get instant, detailed feedback on
                      your answers, tone, and pacing.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href={"/Interview"} className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                        <span className="material-symbols-outlined text-[20px]">
                          play_circle
                        </span>
                        Start Interview
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-full bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col hover:border-primary/50 transition-colors">
                  <div className="size-12 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">
                      history
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Interview History
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">
                    Review feedback and re-watch recordings from your past 14
                    sessions to track improvement.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                          Frontend Dev
                        </span>
                        <span className="text-xs text-slate-500">
                          Yesterday • 88% Score
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-sm">
                        chevron_right
                      </span>
                    </div>
                  </div>
                  <a
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 hover:underline"
                    href="#"
                  >
                    View all history{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">
                      person_search
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">
                    edit
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Profile &amp; Resume
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                  Update your target roles, skills, and upload your latest CV
                  for better AI context.
                </p>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div
                    className="bg-violet-500 h-1.5 rounded-full"
                    style={{ width: "80%" }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Profile 80% complete
                </p>
              </div>
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">
                      school
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">
                    open_in_new
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Learning Path
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                  Recommended articles and practice questions based on your weak
                  areas.
                </p>
                <div className="flex -space-x-2">
                  <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-600 border border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    JS
                  </div>
                  <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-600 border border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    React
                  </div>
                  <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-600 border border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    +3
                  </div>
                </div>
              </div>
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">
                      forum
                    </span>
                  </div>
                  <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Community
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                  Discuss interview questions and share tips with 12k+ other
                  candidates.
                </p>
                <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                  Join Discussion →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;