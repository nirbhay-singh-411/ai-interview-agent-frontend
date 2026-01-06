'use client';

import { PageHeader } from '@/components/pages/ats-matches/PageHeader';
import { ResumeUpload } from '@/components/pages/ats-matches/ResumeUpload';
import { MatchAllButton } from '@/components/pages/ats-matches/MatchAllButton';
import { MatchedResumeCard } from '@/components/pages/ats-matches/MatchedResumeCard';
import { UnmatchedResumeCard } from '@/components/pages/ats-matches/UnmatchedResumeCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { listResumes, uploadResume } from '@/services/resumes.service';
import { getMatches, matchAllResumes, matchResume } from '@/services/interviews.service';
import { getJobDescription } from '@/services/jobDescription.service';

interface ATSMatch {
    id: number;
    job_description: number;
    resume: number;
    resume_details: {
        id: number;
        original_filename: string;
        file_size_mb: number;
    };
    overall_score: number;
    skills_score: number;
    experience_score: number;
    education_score: number;
    match_analysis: string;
    strengths: string;
    gaps: string;
    recommendations: string;
    status: string;
    created_at: string;
}

interface Resume {
    id: number;
    original_filename: string;
    file_size_mb: number;
    status: string;
    created_at: string;
}

export default function ATSMatchesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobDescriptionId = searchParams.get('jd') ? parseInt(searchParams.get('jd')!) : null;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [jobDescription, setJobDescription] = useState<any>(null);
    const [matches, setMatches] = useState<ATSMatch[]>([]);
    const [allResumes, setAllResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [matching, setMatching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (jobDescriptionId) {
            loadData();
        } else {
            router.push('/job-description');
        }
    }, [jobDescriptionId]);

    const loadData = async () => {
        if (!jobDescriptionId) return;

        setLoading(true);
        setError(null);

        try {
            // Load job description
            const jdResponse = await getJobDescription(jobDescriptionId);
            setJobDescription(jdResponse);

            // Load matches
            const matchesResponse = await getMatches(jobDescriptionId);
            const jdMatches = matchesResponse.matches || [];
            setMatches(jdMatches);

            const matchedResumeIds = new Set(jdMatches.map((m: ATSMatch) => m.resume));

            // Load all resumes
            const resumesResponse = await listResumes();
            const allResumes = resumesResponse || [];

            // Filter: Only show resumes that are NOT matched to this JD yet
            // This allows the same resume to be matched to multiple JDs
            const unmatchedResumesForJD = allResumes.filter(
                (r: Resume) => !matchedResumeIds.has(r.id) && r.status === 'extracted'
            );
            setAllResumes(unmatchedResumesForJD);
        } catch (err: any) {
            console.error('Error loading data:', err);
            setError(err.response?.data?.error || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadResume(formData);

            // Reload data
            await loadData();

            // Auto-match the new resume
            if (jobDescriptionId && response.id) {
                await handleMatchResume(response.id);
            }
        } catch (err: any) {
            console.error('Error uploading resume:', err);
            setError(err.response?.data?.error || 'Failed to upload resume');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleMatchResume = async (resumeId: number) => {
        if (!jobDescriptionId) return;

        setMatching(true);
        setError(null);

        try {
            await matchResume(jobDescriptionId, resumeId);
            await loadData(); // Reload matches
        } catch (err: any) {
            console.error('Error matching resume:', err);
            setError(err.response?.data?.error || 'Failed to match resume');
        } finally {
            setMatching(false);
        }
    };

    const handleMatchAllResumes = async () => {
        if (!jobDescriptionId) return;

        setMatching(true);
        setError(null);

        try {
            const response = await matchAllResumes(jobDescriptionId);
            setMatches(response.matches || []);
            alert(`Successfully matched ${response.matches_created} resume(s)!`);
        } catch (err: any) {
            console.error('Error matching resumes:', err);
            setError(err.response?.data?.error || 'Failed to match resumes');
        } finally {
            setMatching(false);
        }
    };

    const handleConductInterview = (resumeId: number, matchId: number) => {
        // Navigate to interview configuration page
        router.push(`/interview-config?jd=${jobDescriptionId}&resume=${resumeId}&match=${matchId}`);
    };

    const getScoreColor = (score: number | string) => {
        const numScore = typeof score === 'string' ? parseFloat(score) : score;
        if (numScore >= 70) return 'text-green-600 bg-green-50 border-green-200';
        if (numScore >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    const getScoreLabel = (score: number | string) => {
        const numScore = typeof score === 'string' ? parseFloat(score) : score;
        if (numScore >= 70) return 'Strong Match';
        if (numScore >= 50) return 'Moderate Match';
        return 'Weak Match';
    };

    // allResumes already contains only unmatched resumes for this JD
    const unmatchedResumes = allResumes;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                <PageHeader jobDescription={jobDescription} />

                <ResumeUpload uploading={uploading} onUpload={handleFileUpload} fileInputRef={fileInputRef} />

                {unmatchedResumes.length > 0 && (
                    <MatchAllButton count={unmatchedResumes.length} matching={matching} onMatch={handleMatchAllResumes} />
                )}

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 mx-auto rounded-full" />
                        <p className="mt-4 text-gray-600">Loading...</p>
                    </div>
                )}

                {!loading && matches.length === 0 && unmatchedResumes.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <p className="text-gray-600 mb-2 font-medium">No resumes uploaded yet</p>
                        <p className="text-sm text-gray-500">Upload a resume to begin</p>
                    </div>
                )}

                {/* Matched */}
                <div className="space-y-4">
                    {matches.map(match => (
                        <MatchedResumeCard
                            key={match.id}
                            match={match}
                            onInterview={() => handleConductInterview(match.resume, match.id)}
                        />
                    ))}
                </div>

                {/* Unmatched */}
                {unmatchedResumes.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-800">Unmatched Resumes</h2>
                        {unmatchedResumes.map(resume => (
                            <UnmatchedResumeCard
                                key={resume.id}
                                resume={resume}
                                matching={matching}
                                onMatch={() => handleMatchResume(resume.id)}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
