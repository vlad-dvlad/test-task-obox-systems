import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { quizQuestions } from './config';
import BackToHomeButton from '../shared/back-to-home-button/back-to-home-button';
import styles from './find-your-gift.module.scss';

const FindYourGift = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const questionRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (answer: string) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    const tl = gsap.timeline();

    tl.to(questionRef.current, {
      opacity: 0,
      y: -100,
      scale: 0.8,
      rotationX: -15,
      duration: 0.6,
      ease: 'power3.in',
    })
      .to(
        optionsRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationX: 15,
          duration: 0.6,
          ease: 'power3.in',
        },
        0
      )
      .to(
        progressRef.current,
        {
          scaleX: 0,
          duration: 0.4,
          ease: 'power2.in',
        },
        0.1
      )
      .call(() => {
        if (currentStep < quizQuestions.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setShowResult(true);
        }
      })
      .set(questionRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: 15,
      })
      .set(optionsRef.current, {
        opacity: 0,
        y: -100,
        scale: 0.8,
        rotationX: -15,
      })
      .to(progressRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })
      .to(questionRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })
      .to(
        optionsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .call(() => {
        setIsAnimating(false);
      });
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
    setIsAnimating(false);
  };

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  // Initial animation on mount
  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(questionRef.current, {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotationX: 20,
    });
    gsap.set(optionsRef.current, {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotationX: 20,
    });
    gsap.set(progressRef.current, {
      scaleX: 0,
    });

    // Animate in with staggered timing
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })
      .to(questionRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      })
      .to(
        optionsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: 'back.out(1.7)',
        },
        '-=0.6'
      );
  }, [currentStep]);

  useEffect(() => {
    if (showResult && resultRef.current) {
      const tl = gsap.timeline();

      gsap.set(resultRef.current, {
        opacity: 0,
        scale: 0.5,
        rotationY: 180,
      });

      tl.to(resultRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
      });
    }
  }, [showResult]);

  if (showResult) {
    return (
      <div className={styles.container}>
        <BackToHomeButton />
        <div className={styles.content}>
          <div ref={resultRef} className={styles.resultCard}>
            <h2 className={styles.resultTitle}>Your Gift Found!</h2>
            <p className={styles.resultText}>
              Based on your answers, we've discovered your unique gifts and
              talents.
            </p>
            <button className={styles.restartButton} onClick={handleRestart}>
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentStep];

  return (
    <div className={styles.container}>
      <BackToHomeButton />
      <div className={styles.content}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              ref={progressRef}
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {currentStep + 1} of {quizQuestions.length}
          </span>
        </div>

        <div ref={questionRef} className={styles.questionCard}>
          <h2 className={styles.questionTitle}>{currentQuestion.question}</h2>
        </div>

        <div ref={optionsRef} className={styles.optionsContainer}>
          <div
            className={`${styles.optionCard} ${isAnimating ? styles.disabled : ''}`}
            onClick={() => handleAnswer(currentQuestion.option1)}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>A</div>
              <div className={styles.cardText}>{currentQuestion.option1}</div>
            </div>
          </div>

          <div
            className={`${styles.optionCard} ${isAnimating ? styles.disabled : ''}`}
            onClick={() => handleAnswer(currentQuestion.option2)}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>B</div>
              <div className={styles.cardText}>{currentQuestion.option2}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindYourGift;
