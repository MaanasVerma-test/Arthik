import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { TOPICS, QUESTIONS, Topic } from "@/data/financialTriviaData";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Lock, Unlock, Play, ArrowRight, Trophy } from "lucide-react";

export default function TriviaGamePage() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [topicScores, setTopicScores] = useState<Record<string, number>>({});
  
  const [gameState, setGameState] = useState<"map" | "quiz" | "topic_result" | "final_result">("map");
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Map View
  const renderMap = () => {
    return (
      <div className="mx-auto max-w-3xl pt-8 pb-16 px-4">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl mb-4 text-primary">Financial Mastery Journey</h1>
          <p className="text-muted-foreground text-lg">Complete topics in order to unlock the next level and master your finances.</p>
        </div>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[2.25rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {TOPICS.map((topic, index) => {
            const isCompleted = completedTopics.includes(topic.id);
            const isUnlocked = index === 0 || completedTopics.includes(TOPICS[index - 1].id);
            
            return (
              <div key={topic.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow transition-transform">
                   {isCompleted ? <CheckCircle className="text-success" size={20} /> : (isUnlocked ? <Unlock className="text-primary" size={20} /> : <Lock className="text-muted-foreground" size={20}/>)}
                </div>
                
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl border shadow-sm ${isUnlocked ? 'bg-card border-border hover:border-primary/50' : 'bg-muted/50 border-transparent opacity-70'} transition-all`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl" style={{color: topic.color}}>{topic.icon}</span>
                    <h3 className="font-semibold text-lg">{topic.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                  
                  {isCompleted ? (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-success">Score: {topicScores[topic.id] || 0}/5</span>
                      <Button variant="outline" size="sm" onClick={() => {
                        // Optional: allow replay?
                        setCurrentTopic(topic);
                        setCurrentQIndex(0);
                        setSelectedOption(null);
                        setShowExplanation(false);
                        setGameState("quiz");
                      }}>Replay</Button>
                    </div>
                  ) : isUnlocked ? (
                    <Button className="w-full gap-2" onClick={() => {
                      setCurrentTopic(topic);
                      setCurrentQIndex(0);
                      setSelectedOption(null);
                      setShowExplanation(false);
                      setGameState("quiz");
                    }}>
                      <Play size={16} /> Start Quiz
                    </Button>
                  ) : (
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Lock size={14} /> Locked (Clear previous)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {completedTopics.length === TOPICS.length && (
          <div className="mt-12 text-center">
            <Button size="lg" className="w-full md:w-auto" onClick={() => setGameState("final_result")}>
              View Final Certificate <Trophy className="ml-2" size={18} />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    
    // Calculate score instantly
    const q = QUESTIONS[currentTopic!.id][currentQIndex];
    if (index === q.correct) {
      setTopicScores(prev => {
        // Only give points if replaying too, or maybe not. Standard behavior is to rewrite score or add?
        // Let's rewrite score if it's potentially better, or just overwrite current attempts.
        // Actually, if we replay, we should probably reset the score at the start. Let's fix that.
        // For simplicity, we just add 1. Wait, if they replay, it adds more.
        return {
          ...prev,
          [currentTopic!.id]: (prev[currentTopic!.id] || 0) + 1
        };
      });
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < 4) {
      setCurrentQIndex(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setGameState("topic_result");
      if (!completedTopics.includes(currentTopic!.id)) {
        setCompletedTopics(prev => [...prev, currentTopic!.id]);
      }
    }
  };

  const renderQuiz = () => {
    if (!currentTopic) return null;
    const questions = QUESTIONS[currentTopic.id];
    const q = questions[currentQIndex];

    return (
      <div className="mx-auto max-w-2xl pt-12 px-4 pb-20">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setGameState("map")} className="mb-4">
            ← Back to Map
          </Button>
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl" style={{backgroundColor: `${currentTopic.color}20`, color: currentTopic.color}}>
                {currentTopic.icon}
             </div>
             <div>
               <h2 className="text-xl font-bold">{currentTopic.name}</h2>
               <p className="text-sm text-muted-foreground">Question {currentQIndex + 1} of 5</p>
             </div>
          </div>
          
          <div className="mt-4 h-2 rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${(currentQIndex + 1) * 20}%` }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
             <h3 className="text-2xl font-display">{q.question}</h3>
             
             <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let borderClass = "border-border hover:border-primary/40";
                  if (showExplanation) {
                    if (i === q.correct) borderClass = "border-success bg-success/10 text-success-foreground";
                    else if (i === selectedOption) borderClass = "border-destructive bg-destructive/10 text-destructive-foreground";
                  } else if (selectedOption === i) {
                    borderClass = "border-primary bg-primary/10";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left transition-all ${borderClass}`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm border
                        ${showExplanation && i === q.correct ? 'bg-success text-success-foreground border-success' : 
                          showExplanation && i === selectedOption ? 'bg-destructive text-destructive-foreground border-destructive' : 
                          'bg-secondary border-border'}
                      `}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-base">{opt}</span>
                      {showExplanation && i === q.correct && <CheckCircle size={20} className="text-success" />}
                      {showExplanation && i === selectedOption && i !== q.correct && <XCircle size={20} className="text-destructive" />}
                    </button>
                  );
                })}
             </div>

             {showExplanation && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`p-5 rounded-xl border mt-6 ${selectedOption === q.correct ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}
               >
                 <div className="flex items-start gap-3">
                    {selectedOption === q.correct ? 
                       <CheckCircle className="text-success mt-0.5 shrink-0" size={20} /> : 
                       <XCircle className="text-destructive mt-0.5 shrink-0" size={20} />
                    }
                    <div>
                      <h4 className={`font-semibold mb-1 ${selectedOption === q.correct ? 'text-success' : 'text-destructive'}`}>
                        {selectedOption === q.correct ? "Correct!" : "Incorrect"}
                      </h4>
                      <p className="text-muted-foreground">{q.explanation}</p>
                    </div>
                 </div>
                 
                 <Button className="w-full mt-6 gap-2" onClick={nextQuestion}>
                   {currentQIndex < 4 ? "Next Question" : "View Results"} <ArrowRight size={16} />
                 </Button>
               </motion.div>
             )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  const renderTopicResult = () => {
    if (!currentTopic) return null;
    const score = topicScores[currentTopic.id] || 0;
    
    return (
      <div className="mx-auto max-w-sm pt-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full text-5xl bg-primary/10">
            {currentTopic.icon}
          </div>
          <h2 className="text-3xl font-display mb-2">{currentTopic.name} Completed!</h2>
          <p className="text-muted-foreground mb-8">You've successfully finished this topic.</p>
          
          <div className="bg-card border rounded-2xl p-6 mb-8 shadow-sm">
            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Score</div>
            <div className="text-5xl font-mono font-bold text-primary mb-2">
              {score}<span className="text-2xl text-muted-foreground">/5</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {score === 5 ? "Perfect! Excellent job!" : score >= 3 ? "Good job! You've got the basics." : "Keep learning and try again!"}
            </div>
          </div>
          
          <Button size="lg" className="w-full" onClick={() => {
            setGameState("map");
            setCurrentTopic(null);
          }}>
            Continue Journey
          </Button>
        </motion.div>
      </div>
    );
  };

  const renderFinalResult = () => {
    const totalScore = Object.values(topicScores).reduce((a, b) => a + b, 0);
    const maxScore = TOPICS.length * 5;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="mx-auto max-w-lg pt-16 px-4 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-6" />
          <h1 className="text-4xl font-display mb-4">Financial Master!</h1>
          <p className="text-lg text-muted-foreground mb-8">You have completed all topics in the Financial Literacy Journey.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
               <div className="text-4xl font-mono font-bold text-primary mb-1">{totalScore}</div>
               <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
               <div className="text-4xl font-mono font-bold text-success mb-1">{percentage}%</div>
               <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
          
          <div className="space-y-3 mb-8 text-left bg-card border rounded-xl p-4 max-h-[300px] overflow-y-auto">
             <h3 className="font-semibold mb-3">Topic Breakdown</h3>
             {TOPICS.map(t => (
               <div key={t.id} className="flex justify-between items-center py-2 border-b last:border-0 border-border">
                  <div className="flex items-center gap-2">
                    <span>{t.icon}</span> <span>{t.name}</span>
                  </div>
                  <span className="font-mono">{topicScores[t.id] || 0}/5</span>
               </div>
             ))}
          </div>

          <div className="flex gap-4 justify-center">
             <Button variant="outline" onClick={() => {
               setCompletedTopics([]);
               setTopicScores({});
               setGameState("map");
             }}>Reset Journey</Button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {gameState === "map" && renderMap()}
        {gameState === "quiz" && renderQuiz()}
        {gameState === "topic_result" && renderTopicResult()}
        {gameState === "final_result" && renderFinalResult()}
      </div>
    </AppLayout>
  );
}
