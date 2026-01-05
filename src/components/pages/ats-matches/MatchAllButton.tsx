export function MatchAllButton({ count, matching, onMatch }: any) {
    return (
        <div className="text-center">
            <button
                onClick={onMatch}
                disabled={matching}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300"
            >
                {matching ? 'Matching…' : `Match ${count} Resume(s)`}
            </button>
        </div>
    );
}
