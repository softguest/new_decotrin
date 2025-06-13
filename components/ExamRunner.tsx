"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface ExamRunnerProps {
  exam: {
    id: number;
    questions: {
      id: number;
      prompt: string;
      choices?: string[];
    }[];
  };
}

interface ResultType {
  score: number;
  points: number;
  badges: { id: number; icon: string; name: string }[];
  correctAnswers: Record<number, string>; // 🆕 correct answers from backend
}

export function ExamRunner({ exam }: ExamRunnerProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<null | ResultType>(null);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = exam.questions.length;
  const allAnswered = answeredCount === totalQuestions;

  function handleChange(qid: number, val: string) {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  }

  async function submit() {
    const payload = Object.entries(answers).map(([questionId, answerText]) => ({
      questionId: +questionId,
      answerText,
    }));
    const res = await fetch(`/api/exams/${exam.id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: payload }),
    }).then((r) => r.json());
    setResult(res);
  }

  if (result) {
    return (
      <div className="space-y-8">
        {/* Score and badges */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Score: {result.score}</h2>
          <p className="text-lg">Points: {result.points}</p>
          <div className="flex flex-wrap gap-4">
            {result.badges.map((b) => (
              <motion.div
                key={b.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                layout
                className="p-2 rounded shadow-lg border"
              >
                <img src={b.icon} alt={b.name} className="w-12 h-12" />
                <p className="text-center text-sm">{b.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Show questions with correct/wrong marks */}
        <div className="space-y-6">
          {exam.questions.map((q) => {
            const userAnswer = answers[q.id];
            const correctAnswer = result.correctAnswers[q.id];
            const isCorrect = userAnswer === correctAnswer;

            return (
              <div key={q.id} className="p-4 border rounded space-y-2">
                <p className="font-medium">{q.prompt}</p>
                {q.choices ? (
                  q.choices.map((c) => (
                    <label key={c} className="block">
                      <input
                        type="radio"
                        name={`review-${q.id}`}
                        value={c}
                        disabled
                        checked={userAnswer === c}
                        className="mr-2"
                      />
                      {c}
                    </label>
                  ))
                ) : (
                  <textarea
                    className="w-full border p-2 rounded"
                    value={userAnswer}
                    disabled
                  />
                )}
                <p
                  className={`text-sm ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCorrect ? "✅ Correct" : `❌ Correct answer: ${correctAnswer}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-300 rounded-full h-4">
        <motion.div
          className="bg-blue-600 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">
        {answeredCount}/{totalQuestions} questions answered
      </p>

      {/* Questions */}
      {exam.questions.map((q) => (
        <div key={q.id} className="p-4 border rounded space-y-2">
          <p className="font-medium">{q.prompt}</p>
          {q.choices ? (
            q.choices.map((c) => (
              <label key={c} className="block">
                <input
                  type="radio"
                  name={q.id.toString()}
                  value={c}
                  onChange={() => handleChange(q.id, c)}
                  checked={answers[q.id] === c}
                  className="mr-2"
                />
                {c}
              </label>
            ))
          ) : (
            <textarea
              className="w-full border p-2 rounded"
              onChange={(e) => handleChange(q.id, e.target.value)}
              value={answers[q.id] || ""}
            />
          )}
        </div>
      ))}

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={submit}
        disabled={!allAnswered}
        className={`px-6 py-3 rounded text-white ${
          allAnswered ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </motion.button>
    </div>
  );
}
