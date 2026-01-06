'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { completeInterview, generateInterviewReport, getInterviewQuestions, submitInterviewAnswer } from '@/services/interviews.service';

// --- Icons ---
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);
const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
);
const AlertTriangle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
);
const MaximizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
);

interface Question {
    id: number;
    question_text: string;
    question_type: string;
    is_mcq: boolean;
    options: string[];
    correct_answer: string;
    order_index: number;
}

// 1. Rename logic component to Content
function InterviewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const interviewIdParam = searchParams.get('id');
    const timeLimitParam = searchParams.get('time');

    const [interviewId, setInterviewId] = useState<number | null>(interviewIdParam ? parseInt(interviewIdParam) : null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Map<number, string>>(new Map());
    const [openEndedAnswers, setOpenEndedAnswers] = useState<Map<number, string>>(new Map());
    const [timeRemaining, setTimeRemaining] = useState<number>(timeLimitParam ? parseInt(timeLimitParam) : 1800);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- PROCTORING STATE ---
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [violationCount, setViolationCount] = useState(0);

    // ---------------------------------------------------------
    // PROCTORING LOGIC
    // ---------------------------------------------------------

    // 1. Enter Full Screen
    const enterFullscreen = async () => {
        try {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } catch (err) {
            console.error("Error attempting to enable full-screen mode:", err);
        }
    };

    // 2. Monitor Full Screen Changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
            } else {
                setIsFullscreen(true);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari support

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    // 3. Monitor Alt-Tab / Visibility / Right Click / Copy-Paste
    useEffect(() => {
        if (!testStarted || testCompleted) return;

        // Prevent Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Prevent Copy/Cut/Paste
        const handleCopyCutPaste = (e: ClipboardEvent) => {
            e.preventDefault();
        };

        // Detect Alt-Tab or Window Switch
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setViolationCount(prev => prev + 1);
                alert("WARNING: You left the exam window. This instance has been recorded.");
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('copy', handleCopyCutPaste);
        document.addEventListener('cut', handleCopyCutPaste);
        document.addEventListener('paste', handleCopyCutPaste);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('copy', handleCopyCutPaste);
            document.removeEventListener('cut', handleCopyCutPaste);
            document.removeEventListener('paste', handleCopyCutPaste);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [testStarted, testCompleted]);


    // ---------------------------------------------------------
    // EXISTING LOGIC (Unchanged logic, wrapped in effects)
    // ---------------------------------------------------------

    useEffect(() => {
        if (interviewId) {
            loadInterview();
        } else {
            setError('Interview ID not found');
            setLoading(false);
        }
    }, [interviewId]);

    useEffect(() => {
        // Only run timer if test started AND fullscreen is active
        if (testStarted && timeRemaining > 0 && !testCompleted && isFullscreen) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        handleAutoSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [testStarted, testCompleted, timeRemaining, isFullscreen]);

    const loadInterview = async () => {
        if (!interviewId) return;
        setLoading(true);
        try {
            const questionsResponse = await getInterviewQuestions(interviewId);
            const questionsData = questionsResponse.questions || [];
            if (questionsData.length === 0) {
                setError('No questions found.');
                return;
            }
            setQuestions(questionsData);
            setLoading(false);
        } catch (err: any) {
            console.error('Error loading interview:', err);
            setError(err.response?.data?.error || 'Failed to load interview');
            setLoading(false);
        }
    };

    const handleStartTest = () => {
        enterFullscreen();
        setTestStarted(true);
    };

    const handleAutoSubmit = async () => {
        if (testCompleted || submitting) return;
        setTestCompleted(true);
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        await submitAllAnswers();
    };

    const handleOptionSelect = (option: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;
        setAnswers((prev) => {
            const newAnswers = new Map(prev);
            newAnswers.set(currentQuestion.id, option);
            return newAnswers;
        });
    };

    const handleOpenEndedAnswerChange = (answerText: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;
        setOpenEndedAnswers((prev) => {
            const newAnswers = new Map(prev);
            newAnswers.set(currentQuestion.id, answerText);
            return newAnswers;
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        if (window.confirm('Are you sure you want to submit?')) {
            setTestCompleted(true);
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            }
            await submitAllAnswers();
        }
    };

    const submitAllAnswers = async () => {
        if (!interviewId || submitting) return;
        setSubmitting(true);
        setError(null);
        try {
            for (const question of questions) {
                const formData = new FormData();
                formData.append('question', question.id.toString());
                if (question.is_mcq) {
                    const selectedOption = answers.get(question.id) || '';
                    formData.append('selected_option', selectedOption);
                    await submitInterviewAnswer(interviewId, formData);
                } else {
                    const answerText = openEndedAnswers.get(question.id) || '';
                    formData.append('answer_text', answerText);
                    await submitInterviewAnswer(interviewId, formData);
                }
            }
            await completeInterview(interviewId);
            try { await generateInterviewReport(interviewId); } catch (err) { console.error(err); }
            router.push(`/results?id=${interviewId}`);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to submit answers');
            setSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = currentQuestion ? answers.get(currentQuestion.id) : null;
    const currentOpenEndedAnswer = currentQuestion ? openEndedAnswers.get(currentQuestion.id) || '' : '';
    const answeredCount = answers.size + openEndedAnswers.size;
    const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;


    // ---------------------------------------------------------
    // CONDITIONAL RENDERS
    // ---------------------------------------------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 font-medium animate-pulse">Initializing Secure Environment...</p>
                </div>
            </div>
        );
    }

    if (error && !testStarted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg border border-red-100 p-8 max-w-md w-full text-center">
                    <p className="text-red-600 mb-6">{error}</p>
                    <button onClick={() => router.push('/job-description')} className="w-full py-2.5 bg-gray-900 text-white rounded-lg">Return to Dashboard</button>
                </div>
            </div>
        );
    }

    // --- CASE 1: Test Loaded, But not started (Pre-flight check) ---
    if (!testStarted) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white max-w-lg w-full rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">Proctored Assessment</h1>
                        <p className="text-slate-500 mt-2">Please review the rules before beginning.</p>
                    </div>

                    <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                        <div className="flex items-center gap-3 text-slate-700">
                            <MaximizeIcon /> <span className="text-sm font-medium">Full Screen Mode is required</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                            <div className="w-5 h-5 flex items-center justify-center border-2 border-slate-300 rounded text-[10px] font-bold text-slate-400">⌘</div>
                            <span className="text-sm font-medium">No Alt-Tab or window switching</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                            <div className="w-5 h-5 flex items-center justify-center border-2 border-slate-300 rounded text-[10px] font-bold text-slate-400">🖱️</div>
                            <span className="text-sm font-medium">Right-click and Copy/Paste disabled</span>
                        </div>
                    </div>

                    <button
                        onClick={handleStartTest}
                        className="w-full py-3.5 bg-blue-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200"
                    >
                        Enable Full Screen & Start Test
                    </button>
                    <p className="text-xs text-center text-slate-400 mt-4">By clicking start, you agree to be monitored.</p>
                </div>
            </div>
        )
    }

    // --- CASE 2: Test Started, But User Exited Fullscreen (BLOCKER) ---
    if (!isFullscreen && !testCompleted) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 z-50 fixed inset-0">
                <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Assessment Paused</h2>
                    <p className="text-slate-600 mb-6">
                        Full-screen mode is required to continue. <br />
                        <span className="text-xs text-red-500 font-semibold mt-2 block">
                            Violations Recorded: {violationCount}
                        </span>
                    </p>
                    <button
                        onClick={enterFullscreen}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium"
                    >
                        Resume Assessment
                    </button>
                </div>
            </div>
        )
    }

    // --- CASE 3: Standard Test Interface (With Proctoring Warning in UI) ---
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 select-none">
            {/* Added select-none class to prevent text highlighting/copying visually as well */}

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-50 p-2 rounded-lg">
                            <span className="text-lg font-bold text-blue-600 tracking-tight">AI Interview</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
                        <div className="flex items-center gap-2">
                            {/* Violation Badge */}
                            {violationCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-red-100 border border-red-200 text-[10px] font-bold text-red-700 animate-pulse">
                                    {violationCount} Violations
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end mr-2">
                            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-wide">Progress</span>
                        </div>

                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-colors ${timeRemaining < 300
                            ? 'bg-red-50 border-red-200 text-red-700 animate-pulse'
                            : 'bg-white border-slate-200 text-slate-700'
                            }`}>
                            <ClockIcon />
                            <span className="font-mono font-bold text-sm tabular-nums">
                                {formatTime(timeRemaining)}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* LEFT COLUMN: Question Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {currentQuestion && (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                {/* Question Header */}
                                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ring-1 ring-inset ${currentQuestion.is_mcq
                                            ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                                            : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                                            }`}>
                                            {currentQuestion.is_mcq ? <ListIcon /> : <CodeIcon />}
                                            {currentQuestion.is_mcq ? 'Multiple Choice' : 'Coding Challenge'}
                                        </span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-400">ID: {currentQuestion.id}</span>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-8">
                                        {currentQuestion.question_text}
                                    </h2>

                                    {/* MCQ INTERFACE */}
                                    {currentQuestion.is_mcq && (
                                        <div className="space-y-3">
                                            {currentQuestion.options?.map((option, index) => {
                                                const letter = String.fromCharCode(65 + index);
                                                const isSelected = currentAnswer === letter;

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleOptionSelect(letter)}
                                                        className={`group relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ease-in-out ${isSelected
                                                            ? 'border-blue-600 bg-indigo-50/50 shadow-sm z-10'
                                                            : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${isSelected
                                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                                : 'bg-white border-slate-300 text-slate-400 group-hover:border-slate-400'
                                                                }`}>
                                                                {isSelected ? <CheckIcon /> : <span className="text-xs font-bold">{letter}</span>}
                                                            </div>
                                                            <span className={`text-base leading-relaxed transition-colors ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'
                                                                }`}>
                                                                {option}
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* CODING INTERFACE */}
                                    {!currentQuestion.is_mcq && (
                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800 rounded-t-xl flex items-center px-4 gap-1.5">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                                    <span className="ml-2 text-[10px] text-slate-400 font-mono">solution.txt</span>
                                                </div>
                                                <textarea
                                                    value={currentOpenEndedAnswer}
                                                    onChange={(e) => handleOpenEndedAnswerChange(e.target.value)}
                                                    spellCheck="false"
                                                    onPaste={(e) => e.preventDefault()} // Explicit inline prevention
                                                    className="w-full h-80 pt-10 px-4 pb-4 rounded-xl bg-slate-900 text-slate-50 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-inner"
                                                    placeholder="// Write your solution or explanation here..."
                                                />
                                            </div>
                                            <div className="flex items-start gap-2 text-amber-700 bg-amber-50 px-4 py-3 rounded-lg text-xs">
                                                <span className="text-lg">💡</span>
                                                <p className="mt-0.5">Focus on explaining your logic clearly. Pseudo-code is acceptable if syntax isn't perfect.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Navigation Footer */}
                        <div className="hidden lg:flex items-center justify-between pt-4">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeftIcon /> Previous
                            </button>

                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                >
                                    Next Question <ChevronRightIcon />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || testCompleted}
                                    className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Submitting...' : testCompleted ? 'Submitted' : 'Finish & Submit'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar / Map */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sticky top-24">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                                Question Map
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {questions.map((q, i) => {
                                    const answered = q.is_mcq
                                        ? answers.has(q.id)
                                        : openEndedAnswers.get(q.id)?.trim();
                                    const isCurrent = i === currentQuestionIndex;

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentQuestionIndex(i)}
                                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center ${isCurrent
                                                ? 'bg-blue-600 text-white shadow-md shadow-indigo-200 scale-110'
                                                : answered
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300'
                                                    : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-[10px] text-slate-500 text-center">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-3 h-3 rounded bg-blue-600"></div>
                                    <span>Current</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200"></div>
                                    <span>Answered</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-3 h-3 rounded bg-slate-50 border border-slate-200"></div>
                                    <span>Pending</span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                            <div className="flex items-center justify-between gap-3">
                                <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="p-3 rounded-lg bg-slate-100 text-slate-600 disabled:opacity-30"><ChevronLeftIcon /></button>
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <button onClick={handleNext} className="flex-1 py-3 rounded-lg bg-slate-900 text-white font-medium active:scale-95 transition-transform">Next</button>
                                ) : (
                                    <button onClick={handleSubmit} disabled={submitting || testCompleted} className="flex-1 py-3 rounded-lg bg-emerald-600 text-white font-medium active:scale-95 transition-transform disabled:bg-slate-300">Submit</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// 2. Export Wrapper Component
export default function InterviewPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 font-medium animate-pulse">Initializing Secure Environment...</p>
                </div>
            </div>
        }>
            <InterviewContent />
        </Suspense>
    );
}