const questions = [
    {
      text: "How do you prefer to handle conflict?",
      answers: {
        red: "I take charge and find a solution quickly.",
        blue: "I try to understand everyone’s perspective and seek harmony.",
        green: "I analyze the problem logically and plan the best course of action.",
        yellow: "I stay optimistic and look for creative ways to resolve it."
      }
    },
    {
      text: "What motivates you the most?",
      answers: {
        red: "Achieving success and recognition.",
        blue: "Building meaningful relationships.",
        green: "Solving problems and gaining knowledge.",
        yellow: "Exploring new ideas and having fun."
      }
    },
    {
      text: "How do you approach teamwork?",
      answers: {
        red: "I take the lead and ensure goals are met.",
        blue: "I make sure everyone feels included and valued.",
        green: "I focus on making the team efficient and organized.",
        yellow: "I bring energy and creativity to the team."
      }
    },
    {
      text: "What is your greatest strength?",
      answers: {
        red: "I’m confident and decisive.",
        blue: "I’m empathetic and compassionate.",
        green: "I’m logical and detail-oriented.",
        yellow: "I’m imaginative and enthusiastic."
      }
    },
    {
      text: "How do you handle stressful situations?",
      answers: {
        red: "I take control and act decisively.",
        blue: "I try to stay calm and support others emotionally.",
        green: "I analyze the situation and prioritize solutions.",
        yellow: "I focus on staying positive and finding creative alternatives."
      }
    },
    {
      text: "How do you like to spend your free time?",
      answers: {
        red: "Pursuing goals or competitive activities.",
        blue: "Spending time with family and friends.",
        green: "Learning new skills or reading.",
        yellow: "Trying out fun and adventurous activities."
      }
    },
    {
      text: "What type of work environment do you prefer?",
      answers: {
        red: "Fast-paced with clear goals and rewards.",
        blue: "Collaborative and friendly.",
        green: "Structured and organized.",
        yellow: "Dynamic and full of opportunities for creativity."
      }
    },
    {
      text: "How do you make decisions?",
      answers: {
        red: "Quickly and confidently.",
        blue: "By considering how it affects others.",
        green: "By carefully analyzing all options.",
        yellow: "By going with my gut feeling and creativity."
      }
    },
    {
      text: "What do you value most in life?",
      answers: {
        red: "Success and achievement.",
        blue: "Harmony and relationships.",
        green: "Knowledge and truth.",
        yellow: "Freedom and fun."
      }
    },
    {
      text: "What describes your communication style?",
      answers: {
        red: "Direct and to the point.",
        blue: "Empathetic and considerate.",
        green: "Precise and fact-based.",
        yellow: "Lively and enthusiastic."
      }
    }
  ];
  
  const scores = {
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0,
  };

  //
  let currentQuestion = 0;
  
  function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question-text").innerText = question.text;
    
    const answerButtons = document.querySelectorAll(".answer-btn");
    Object.entries(question.answers).forEach(([color, text], index) => {
      answerButtons[index].innerText = text;
      answerButtons[index].onclick = () => selectAnswer(color);
    });
  }
  
  function updateProgress() {
    const progress = document.getElementById("progress");
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    progress.style.width = progressPercentage + "%";
  }
  
  function selectAnswer(color) {
    scores[color]++;
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      loadQuestion();
      updateProgress();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
  
    const totalScore = scores.red + scores.blue + scores.green + scores.yellow;
  
    const percentages = {
      red: Math.round((scores.red / totalScore) * 100),
      blue: Math.round((scores.blue / totalScore) * 100),
      green: Math.round((scores.green / totalScore) * 100),
      yellow: Math.round((scores.yellow / totalScore) * 100),
    };
  
    const ctx = document.getElementById("resultsChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Green", "Yellow"],
        datasets: [{
          label: "Personality Scores (%)",
          data: [percentages.red, percentages.blue, percentages.green, percentages.yellow],
          backgroundColor: ["#f44336", "#2196f3", "#4caf50", "#ffeb3b"]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  
    const highestColor = Object.keys(percentages).reduce((a, b) => percentages[a] > percentages[b] ? a : b);
    document.getElementById("result-text").innerText = `You are mostly ${highestColor.toUpperCase()} personality!`;
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    Object.keys(scores).forEach(color => scores[color] = 0);
    document.getElementById("results").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    updateProgress();
    loadQuestion();
  }
  
  // Initialize
  loadQuestion();
  