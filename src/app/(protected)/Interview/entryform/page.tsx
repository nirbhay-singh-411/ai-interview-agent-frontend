import React from "react";

const EntryForm = () => {
  return (
    <div>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[640px] flex flex-col gap-6">
          {/* Page Heading */}
          <div className="text-center space-y-2 mb-2">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Let's set up your interview
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
              Please fill in your details to customize the AI session.
            </p>
          </div>
          {/* Form Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 px-6 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-slate-900 dark:text-white text-sm font-semibold">
                    Step 1 of 2
                  </p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    Setup
                  </span>
                </div>
                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-1.5 w-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </div>
            {/* Form Fields */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Section: Personal Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">
                    person
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Personal Details
                  </h3>
                </div>
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary placeholder:text-slate-400 h-12 px-4 transition-shadow"
                    placeholder="e.g. Jane Doe"
                    type="text"
                  />
                </div>
                {/* Role & Experience Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Role Applying For
                    </label>
                    <div className="relative">
                      <select className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 px-4 appearance-none cursor-pointer">
                        <option disabled selected>
                          Select a role
                        </option>
                        <option value="frontend">Frontend Developer</option>
                        <option value="backend">Backend Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="design">UI/UX Designer</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Experience Level */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Experience Level
                    </label>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg h-12">
                      <button className="flex-1 rounded-md text-sm font-medium transition-all text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none">
                        Junior
                      </button>
                      <button className="flex-1 rounded-md text-sm font-medium transition-all bg-white dark:bg-slate-700 shadow-sm text-primary ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
                        Mid
                      </button>
                      <button className="flex-1 rounded-md text-sm font-medium transition-all text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none">
                        Senior
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-700 w-full" />
              {/* Section: Resume Upload */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      description
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Resume
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                    Optional
                  </span>
                </div>
                {/* Drop Zone */}
                <div className="group relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className="bg-primary/10 text-primary p-2 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">
                        cloud_upload
                      </span>
                    </div>
                    <p className="mb-1 text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <span className="font-semibold text-primary">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      PDF, DOCX (MAX. 5MB)
                    </p>
                  </div>
                  <input className="hidden" id="dropzone-file" type="file" />
                </div>
                {/* Uploaded File Preview (Mock State) */}
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-slate-800 p-1.5 rounded text-green-600 dark:text-green-400 shadow-sm">
                      <span className="material-symbols-outlined text-xl">
                        picture_as_pdf
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        jane_doe_resume.pdf
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">
                          check_circle
                        </span>
                        Ready for analysis
                      </span>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-red-500 transition-colors p-1">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row-reverse gap-3 sm:gap-4 items-center justify-between">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm focus:ring-4 focus:ring-primary/20">
                <span>Start Interview</span>
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium rounded-lg transition-colors">
                Back to Dashboard
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 text-xs text-slate-400 mt-2">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EntryForm;

// <!DOCTYPE html>

// <html class="light" lang="en"><head>
// <meta charset="utf-8"/>
// <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
// <title>AI Interview Setup Form</title>
// <!-- Fonts -->
// <link href="https://fonts.googleapis.com" rel="preconnect"/>
// <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet"/>
// <!-- Material Symbols -->
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
// <!-- Tailwind CSS -->
// <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
// <script id="tailwind-config">
//       tailwind.config = {
//         darkMode: "class",
//         theme: {
//           extend: {
//             colors: {
//               "primary": "#137fec",
//               "background-light": "#f6f7f8",
//               "background-dark": "#101922",
//             },
//             fontFamily: {
//               "display": ["Inter", "sans-serif"]
//             },
//             borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
//           },
//         },
//       }
//     </script>
// </head>
// <body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased min-h-screen flex flex-col">
// <!-- Top Navigation -->
// <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 sticky top-0 z-50">
// <div class="flex items-center gap-4">
// <div class="size-8 text-primary">
// <svg class="w-full h-full" fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
// </svg>
// </div>
// <h2 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">AI Interviewer</h2>
// </div>
// <div class="flex items-center gap-4">
// <button class="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
// <span class="material-symbols-outlined text-[20px]">help</span>
// <span>Help</span>
// </button>
// <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-slate-200 dark:border-slate-700" data-alt="User profile avatar placeholder with abstract gradient" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXkLPmcGQNuCpIhU80nqWJQ4mdfJpAKqCoxKYBs2yZhs-AKES7dVvNx-vdmSM3hiycMxbJNvpQMHSu2bIERMVJbQf6DxgFIX23JDoDaXwQR7E8Cgdorvzt8sOy7dYLaziy2XOwM2l3cPlCsSSA4sOtJj85EcA3u2ove8S3qk58qua3tefiKaf_CrMFMTUHTWe3dtfrjr-Dwy-I_BGwIniiOKGAzqNVDImFgQZzt2bhhAKC3_zIlUhfF0ArEclXmgkE61mhKOJzz4oQ");'></div>
// </div>
// </header>
// <!-- Main Content -->
// <main class="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
// <div class="w-full max-w-[640px] flex flex-col gap-6">
// <!-- Page Heading -->
// <div class="text-center space-y-2 mb-2">
// <h1 class="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">Let's set up your interview</h1>
// <p class="text-slate-500 dark:text-slate-400 text-base font-normal">Please fill in your details to customize the AI session.</p>
// </div>
// <!-- Form Card -->
// <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
// <!-- Progress Bar -->
// <div class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 px-6 py-4">
// <div class="flex flex-col gap-2">
// <div class="flex justify-between items-center">
// <p class="text-slate-900 dark:text-white text-sm font-semibold">Step 1 of 2</p>
// <span class="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Setup</span>
// </div>
// <div class="rounded-full bg-slate-200 dark:bg-slate-700 h-1.5 w-full overflow-hidden">
// <div class="h-full rounded-full bg-primary transition-all duration-500 ease-out" style="width: 50%;"></div>
// </div>
// </div>
// </div>
// <!-- Form Fields -->
// <div class="p-6 md:p-8 space-y-8">
// <!-- Section: Personal Details -->
// <div class="space-y-6">
// <div class="flex items-center gap-2 mb-4">
// <span class="material-symbols-outlined text-primary">person</span>
// <h3 class="text-lg font-bold text-slate-900 dark:text-white">Personal Details</h3>
// </div>
// <!-- Full Name -->
// <div class="space-y-2">
// <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
// <input class="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary placeholder:text-slate-400 h-12 px-4 transition-shadow" placeholder="e.g. Jane Doe" type="text"/>
// </div>
// <!-- Role & Experience Grid -->
// <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
// <!-- Role Dropdown -->
// <div class="space-y-2">
// <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Role Applying For</label>
// <div class="relative">
// <select class="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 px-4 appearance-none cursor-pointer">
// <option disabled="" selected="" value="">Select a role</option>
// <option value="frontend">Frontend Developer</option>
// <option value="backend">Backend Developer</option>
// <option value="product">Product Manager</option>
// <option value="design">UI/UX Designer</option>
// </select>
// <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
// <span class="material-symbols-outlined">expand_more</span>
// </div>
// </div>
// </div>
// <!-- Experience Level -->
// <div class="space-y-2">
// <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Experience Level</label>
// <div class="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg h-12">
// <button class="flex-1 rounded-md text-sm font-medium transition-all text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none">Junior</button>
// <button class="flex-1 rounded-md text-sm font-medium transition-all bg-white dark:bg-slate-700 shadow-sm text-primary ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">Mid</button>
// <button class="flex-1 rounded-md text-sm font-medium transition-all text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none">Senior</button>
// </div>
// </div>
// </div>
// </div>
// <div class="h-px bg-slate-100 dark:bg-slate-700 w-full"></div>
// <!-- Section: Resume Upload -->
// <div class="space-y-4">
// <div class="flex items-center justify-between">
// <div class="flex items-center gap-2">
// <span class="material-symbols-outlined text-primary">description</span>
// <h3 class="text-lg font-bold text-slate-900 dark:text-white">Resume</h3>
// </div>
// <span class="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Optional</span>
// </div>
// <!-- Drop Zone -->
// <div class="group relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
// <div class="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
// <div class="bg-primary/10 text-primary p-2 rounded-full mb-3 group-hover:scale-110 transition-transform">
// <span class="material-symbols-outlined text-3xl">cloud_upload</span>
// </div>
// <p class="mb-1 text-sm text-slate-700 dark:text-slate-300 font-medium">
// <span class="font-semibold text-primary">Click to upload</span> or drag and drop
//                                 </p>
// <p class="text-xs text-slate-500 dark:text-slate-400">PDF, DOCX (MAX. 5MB)</p>
// </div>
// <input class="hidden" id="dropzone-file" type="file"/>
// </div>
// <!-- Uploaded File Preview (Mock State) -->
// <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg">
// <div class="flex items-center gap-3">
// <div class="bg-white dark:bg-slate-800 p-1.5 rounded text-green-600 dark:text-green-400 shadow-sm">
// <span class="material-symbols-outlined text-xl">picture_as_pdf</span>
// </div>
// <div class="flex flex-col">
// <span class="text-sm font-medium text-slate-900 dark:text-white">jane_doe_resume.pdf</span>
// <span class="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
// <span class="material-symbols-outlined text-[10px]">check_circle</span>
//                                         Ready for analysis
//                                     </span>
// </div>
// </div>
// <button class="text-slate-400 hover:text-red-500 transition-colors p-1">
// <span class="material-symbols-outlined">close</span>
// </button>
// </div>
// </div>
// </div>
// <!-- Footer Actions -->
// <div class="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row-reverse gap-3 sm:gap-4 items-center justify-between">
// <button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm focus:ring-4 focus:ring-primary/20">
// <span>Start Interview</span>
// <span class="material-symbols-outlined text-lg">arrow_forward</span>
// </button>
// <button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium rounded-lg transition-colors">
//                         Back to Dashboard
//                     </button>
// </div>
// </div>
// <div class="flex justify-center items-center gap-2 text-xs text-slate-400 mt-2">
// <span class="material-symbols-outlined text-sm">lock</span>
// <span>Your data is encrypted and secure</span>
// </div>
// </div>
// </main>
// </body></html>
