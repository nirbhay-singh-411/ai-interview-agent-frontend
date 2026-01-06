import { ScoreBadge } from './ScoreBadge';

// Simple SVG Icons to avoid external dependencies for this snippet
const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
);

const InterviewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
    </svg>
);

export function MatchedResumeCard({ match, onInterview }: any) {
    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 p-5">

            {/* --- Header Section --- */}
            <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3 flex-1 overflow-hidden">
                    {/* Icon Container */}
                    <div className="p-2.5 bg-gray-50 rounded-xl shrink-0 group-hover:bg-blue-50 transition-colors duration-300">
                        <FileTextIcon />
                    </div>

                    {/* File Details */}
                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 truncate pr-2 group-hover:text-blue-600 transition-colors">
                            {match.resume_details.original_filename}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600">
                                PDF
                            </span>
                            <span className="text-xs text-gray-400">
                                {match.resume_details.file_size_mb} MB • {new Date(match.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Score Badge */}
                <div className="shrink-0">
                    <ScoreBadge score={Number(match.overall_score)} />
                </div>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                    ['Skills', match.skills_score],
                    ['Experience', match.experience_score],
                    ['Education', match.education_score],
                ].map(([label, score]) => (
                    <div
                        key={label}
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-slate-100/80 transition-colors"
                    >
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                            {label}
                        </span>
                        <span className="text-lg font-bold text-slate-800 mt-0.5">
                            {Number(score).toFixed(0)}<span className="text-xs text-slate-400 ml-0.5">%</span>
                        </span>
                    </div>
                ))}
            </div>

            {/* --- Action Button --- */}
            <div className="mt-6 pt-4 border-t border-gray-50">
                <button
                    onClick={onInterview}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl
                               bg-gray-900 text-white shadow-sm shadow-gray-200
                               hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5
                               active:translate-y-0 active:shadow-sm
                               transition-all duration-200 cursor-pointer"
                >
                    <InterviewIcon />
                    Conduct Interview
                </button>
            </div>
        </div>
    );
}