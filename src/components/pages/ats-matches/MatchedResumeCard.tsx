import { ScoreBadge } from './ScoreBadge';

export function MatchedResumeCard({ match, onInterview }: any) {
    return (
        <div className="bg-white rounded-xl shadow p-6 border">
            <div className="flex justify-between">
                <div>
                    <p className="font-semibold text-lg">{match.resume_details.original_filename}</p>
                    <p className="text-sm text-gray-500">
                        {match.resume_details.file_size_mb} MB • {new Date(match.created_at).toLocaleDateString()}
                    </p>
                </div>

                <ScoreBadge score={Number(match.overall_score)} />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
                {[
                    ['Skills', match.skills_score],
                    ['Experience', match.experience_score],
                    ['Education', match.education_score],
                ].map(([label, score]) => (
                    <div key={label} className="bg-gray-50 rounded p-3 text-center">
                        <p className="text-xs text-gray-500">{label}</p>
                        <p className="text-lg font-semibold">{Number(score).toFixed(1)}%</p>
                    </div>
                ))}
            </div>

            <button
                onClick={onInterview}
                className="w-full mt-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                Conduct Interview
            </button>
        </div>
    );
}
