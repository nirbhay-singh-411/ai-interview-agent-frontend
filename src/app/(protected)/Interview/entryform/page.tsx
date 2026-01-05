import React from "react";

const EntryForm = () => {
  return (
    <div>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[640px] flex flex-col gap-6">
          {/* Page Heading */}
          <div className="text-center space-y-2 mb-2">
            <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Let&apos;s set up your interview
            </h1>
            <p className="text-slate-500 text-base font-normal">
              Please fill in your details to customize the AI session.
            </p>
          </div>
          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-slate-900 text-sm font-semibold">
                    Step 1 of 2
                  </p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    Setup
                  </span>
                </div>
                <div className="rounded-full bg-slate-200 h-1.5 w-full overflow-hidden">
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
                  <h3 className="text-lg font-bold text-slate-900">
                    Personal Details
                  </h3>
                </div>
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-lg border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary placeholder:text-slate-400 h-12 px-4 transition-shadow"
                    placeholder="e.g. Jane Doe"
                    type="text"
                  />
                </div>
                {/* Role & Experience Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Role Applying For
                    </label>
                    <div className="relative">
                      <select className="w-full rounded-lg border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-12 px-4 appearance-none cursor-pointer">
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
                    <label className="block text-sm font-medium text-slate-700">
                      Experience Level
                    </label>
                    <div className="flex bg-slate-100 p-1 rounded-lg h-12">
                      <button className="flex-1 rounded-md text-sm font-medium transition-all text-slate-500 hover:text-slate-700 focus:outline-none">
                        Junior
                      </button>
                      <button className="flex-1 rounded-md text-sm font-medium transition-all bg-white shadow-sm text-primary ring-1 ring-black/5 focus:outline-none">
                        Mid
                      </button>
                      <button className="flex-1 rounded-md text-sm font-medium transition-all text-slate-500 hover:text-slate-700 focus:outline-none">
                        Senior
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px bg-slate-100 w-full" />
              {/* Section: Resume Upload */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      description
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">Resume</h3>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    Optional
                  </span>
                </div>
                {/* Drop Zone */}
                <div className="group relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className="bg-primary/10 text-primary p-2 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">
                        cloud_upload
                      </span>
                    </div>
                    <p className="mb-1 text-sm text-slate-700 font-medium">
                      <span className="font-semibold text-primary">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      PDF, DOCX (MAX. 5MB)
                    </p>
                  </div>
                  <input className="hidden" id="dropzone-file" type="file" />
                </div>
                {/* Uploaded File Preview (Mock State) */}
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-1.5 rounded text-green-600 shadow-sm">
                      <span className="material-symbols-outlined text-xl">
                        picture_as_pdf
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">
                        jane_doe_resume.pdf
                      </span>
                      <span className="text-xs text-green-600 flex items-center gap-1">
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
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row-reverse gap-3 sm:gap-4 items-center justify-between">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm focus:ring-4 focus:ring-primary/20">
                <span>Start Interview</span>
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-slate-600 hover:text-slate-900 font-medium rounded-lg transition-colors">
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
