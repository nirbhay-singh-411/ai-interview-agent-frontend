export default function RecruitersCandidatesSection() {
  return (
    <div className="py-24 bg-white">
      <div className="layout-content-container max-w-[1200px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-200">
                <span className="material-symbols-outlined">
                  business_center
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                For Recruiters
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 text-slate-700">
                <span className="material-symbols-outlined text-green-500">
                  check_circle
                </span>
                <span>
                  <strong>Save 90% Time:</strong> Automate initial screening
                  calls.
                </span>
              </li>
              <li className="flex gap-3 text-slate-700">
                <span className="material-symbols-outlined text-green-500">
                  check_circle
                </span>
                <span>
                  <strong>Data-Driven:</strong> Make decisions based on scores,
                  not gut feelings.
                </span>
              </li>
              <li className="flex gap-3 text-slate-700">
                <span className="material-symbols-outlined text-green-500">
                  check_circle
                </span>
                <span>
                  <strong>Faster Shortlisting:</strong> Review top candidates in
                  minutes.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-lg text-white shadow-md shadow-purple-200">
                <span className="material-symbols-outlined">person</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                For Candidates
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 text-slate-700">
                <span className="material-symbols-outlined text-green-500">
                  check_circle
                </span>
                <span>
                  <strong>Fair Interviews:</strong> Consistent questions for
                  everyone.
                </span>
              </li>
              <li className="flex gap-3 text-slate-700">
                <span className="material-symbols-outlined text-green-500">
                  check_circle
                </span>
                <span>
                  <strong>Instant Feedback:</strong> Know where you stand
                  immediately.
                </span>
              </li>
              <li className="flex gap-3 text-slate-700">
                <span className="material-symbols-outlined text-green-500">
                  check_circle
                </span>
                <span>
                  <strong>Flexible Timing:</strong> Interview anytime, anywhere.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
