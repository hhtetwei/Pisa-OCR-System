"use client"

import {
  Card,
  CardSection,
  Progress,
  Title,
  Badge
} from "@mantine/core"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  User,
  Target,
  BookOpen
} from "lucide-react"

interface OCRResultsDisplayProps {
  ocrResult: {
    id: number
    jobId: string
    studentId: string
    score: number
    questions: Array<{
      id: number
      questionId: string
      type: string
      detectedAnswer: string
      detectedText: string
      score: number
      boundingBox: string[]
    }>
  }
  jobInfo?: {
    templateName?: string
    documentUrl?: string
    createdAt?: Date
  }
}

export function OCRResultsDisplay({ ocrResult, jobInfo }: OCRResultsDisplayProps) {
  const totalQuestions = ocrResult.questions.length
  const correctAnswers = ocrResult.questions.filter((q) => q.score > 0).length
  const partialAnswers = ocrResult.questions.filter((q) => q.score > 0 && q.score < 100).length
  const incorrectAnswers = totalQuestions - correctAnswers

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return <BookOpen className="w-4 h-4" />
      case "short_answer":
        return <FileText className="w-4 h-4" />
      case "math":
        return <Target className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return "bg-blue-100 text-blue-800"
      case "short_answer":
        return "bg-green-100 text-green-800"
      case "math":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardSection className="p-4">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Student ID</p>
                <p className="font-bold text-lg">{ocrResult.studentId}</p>
              </div>
            </div>
          </CardSection>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardSection className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Overall Score</p>
                <p className={`font-bold text-2xl ${getScoreColor(ocrResult.score)}`}>{ocrResult.score}%</p>
              </div>
            </div>
          </CardSection>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardSection className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="font-bold text-lg">
                  {correctAnswers}/{totalQuestions}
                </p>
              </div>
            </div>
          </CardSection>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardSection className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Job ID</p>
                <p className="font-bold text-lg">#{ocrResult.jobId}</p>
              </div>
            </div>
          </CardSection>
        </Card>
      </div>

      <Card>
        <CardSection>
          <Title className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Score Analysis
          </Title>
        </CardSection>
        <CardSection>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Overall Performance</span>
              <span className={`font-bold text-xl ${getScoreColor(ocrResult.score)}`}>{ocrResult.score}%</span>
            </div>

            <Progress value={ocrResult.score} className="w-full h-3" />

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-green-600 font-semibold text-lg">{correctAnswers}</div>
                <div className="text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-600 font-semibold text-lg">{partialAnswers}</div>
                <div className="text-gray-600">Partial</div>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-semibold text-lg">{incorrectAnswers}</div>
                <div className="text-gray-600">Incorrect</div>
              </div>
            </div>
          </div>
        </CardSection>
      </Card>

      <Card>
        <CardSection>
          <Title className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Question Analysis ({totalQuestions} questions)
          </Title>
        </CardSection>
        <CardSection>
          <div className="space-y-4">
            {ocrResult.questions.map((question) => (
              <div
                key={question.id}
                className={`p-4 rounded-lg border-l-4 transition-all ${
                  question.score > 0
                    ? "border-l-green-500 bg-green-50 hover:bg-green-100"
                    : "border-l-red-500 bg-red-50 hover:bg-red-100"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {getQuestionTypeIcon(question.type)}
                    <div>
                      <span className="font-semibold text-lg">Question {question.questionId}</span>
                      <Badge className={`ml-2 ${getQuestionTypeColor(question.type)}`}>
                        {question.type.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {question.score > 0 ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span className={`font-bold text-lg ${getScoreColor(question.score)}`}>{question.score}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.detectedAnswer && (
                    <div className="space-y-2">
                      <span className="font-medium text-gray-700 text-sm">Detected Answer:</span>
                      <div className="bg-white p-3 rounded border">
                        <Badge variant="outline" className="text-base px-3 py-1">
                          {question.detectedAnswer}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {question.detectedText && (
                    <div className="space-y-2">
                      <span className="font-medium text-gray-700 text-sm">Detected Text:</span>
                      <div className="bg-white p-3 rounded border font-mono text-sm">"{question.detectedText}"</div>
                    </div>
                  )}
                </div>

                {!question.detectedAnswer && !question.detectedText && (
                  <div className="bg-white p-3 rounded border text-center text-gray-500 italic">
                    No answer detected for this question
                  </div>
                )}

                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>Region: [{question.boundingBox.join(", ")}]</span>
                    <span>Question ID: {question.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardSection>
      </Card>

      {jobInfo && (
        <Card>
          <CardSection>
            <Title className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Processing Information
            </Title>
          </CardSection>
          <CardSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {jobInfo.templateName && (
                <div>
                  <span className="font-medium text-gray-700">Template:</span>
                  <div className="text-gray-600 mt-1">{jobInfo.templateName}</div>
                </div>
              )}
              {jobInfo.documentUrl && (
                <div>
                  <span className="font-medium text-gray-700">Document:</span>
                  <div className="text-gray-600 mt-1 truncate">{jobInfo.documentUrl.split("/").pop()}</div>
                </div>
              )}
              {jobInfo.createdAt && (
                <div>
                  <span className="font-medium text-gray-700">Processed:</span>
                  <div className="text-gray-600 mt-1">{jobInfo.createdAt.toLocaleString()}</div>
                </div>
              )}
            </div>
          </CardSection>
        </Card>
      )}
    </div>
  )
}
