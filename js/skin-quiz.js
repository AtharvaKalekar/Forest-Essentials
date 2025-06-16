document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quizForm = document.getElementById('skinQuizForm');
    const questions = document.querySelectorAll('.question');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const quizResults = document.getElementById('quizResults');
    const retakeQuiz = document.getElementById('retakeQuiz');
    
    // Quiz state
    const progressBar = document.getElementById('quizProgress');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    let currentQuestion = 0;
    const totalQuestions = questions.length;
    
    // Product recommendations based on skin type and dosha
    const productRecommendations = {
      'dry_vata': [
        { 
          id: 'soundarya-night-cream', 
          name: 'Transformative Soundarya Night Cream', 
          price: '₹8,695', 
          image: '../images/product/15591_transformative_soundarya_night_cream_with_24k_gold_45g_1.avif',
          category: 'Night Cream',
          description: 'A luxurious night cream with 24K gold for deep nourishment and anti-aging benefits.'
        },
        { 
          id: 'narayana-face-oil', 
          name: 'Narayana Face Oil', 
          price: '₹3,800', 
          image: '../images/product/narayana_face_oil.avif',
          category: 'Face Oil',
          description: 'Nourishing face oil with rare herbs for deep hydration and rejuvenation.'
        },
        { 
          id: 'madhulika-honey-mist', 
          name: 'Madhulika Honey & Rosewater Face Mist', 
          price: '₹1,250', 
          image: '../images/product/honey_rose_mist.avif',
          category: 'Face Mist',
          description: 'Hydrating face mist with raw honey and rosewater for instant refreshment.'
        }
      ],
      'oily_kapha': [
        { 
          id: 'kumkumadi-cleanser', 
          name: 'Kumkumadi Brightening Face Cleanser', 
          price: '₹1,450', 
          image: '../images/product/kumkumadi_cleanser.avif',
          category: 'Cleanser',
          description: 'Gentle yet effective cleanser with saffron for bright, clear skin.'
        },
        { 
          id: 'tejal-face-pack', 
          name: 'Tejal Natural Glow Face Pack', 
          price: '₹1,250', 
          image: '../images/product/tejal_face_pack.avif',
          category: 'Face Mask',
          description: 'Purifying face pack with turmeric and sandalwood for a natural glow.'
        },
        { 
          id: 'mridul-cleanser', 
          name: 'Mridul Facial Cleanser', 
          price: '₹1,150', 
          image: '../images/product/mridul_cleanser.avif',
          category: 'Cleanser',
          description: 'Soothing cleanser with herbs for balanced, refreshed skin.'
        }
      ],
      'combination_pitta': [
        { 
          id: 'soundarya-set', 
          name: 'Advanced Soundarya Skin Care Set', 
          price: '₹8,900', 
          image: '../images/product/soundarya_set.avif',
          category: 'Skincare Set',
          description: 'Complete anti-aging regimen for youthful, radiant skin.'
        },
        { 
          id: 'sandalwood-mist', 
          name: 'Sandalwood & Orange Blossom Face Mist', 
          price: '₹1,250', 
          image: '../images/product/sandalwood_mist.avif',
          category: 'Face Mist',
          description: 'Cooling mist with sandalwood to soothe and balance combination skin.'
        },
        { 
          id: 'kumkumadi-night', 
          name: 'Kumkumadi Night Treatment Cream', 
          price: '₹3,250', 
          image: '../images/product/kumkumadi_night.avif',
          category: 'Night Cream',
          description: 'Regenerative night cream with saffron for even-toned, glowing skin.'
        }
      ],
      'sensitive_pitta': [
        { 
          id: 'honey-saffron-gel', 
          name: 'Madhulika Honey & Saffron Gel', 
          price: '₹1,250', 
          image: '../images/product/honey_saffron_gel.avif',
          category: 'Gel Moisturizer',
          description: 'Soothing gel with honey and saffron for sensitive, irritated skin.'
        },
        { 
          id: 'rose-mist', 
          name: 'Pure Rose Water Face Mist', 
          price: '₹1,050', 
          image: '../images/product/rose_mist.avif',
          category: 'Face Mist',
          description: 'Gentle, alcohol-free rose water mist to calm and hydrate sensitive skin.'
        },
        { 
          id: 'sandalwood-cream', 
          name: 'Sandalwood & Orange Blossom Face Cream', 
          price: '₹2,250', 
          image: '../images/product/sandalwood_cream.avif',
          category: 'Moisturizer',
          description: 'Lightweight cream with cooling sandalwood to soothe sensitive skin.'
        }
      ],
      'normal_balanced': [
        { 
          id: 'soundarya-radiance', 
          name: 'Soundarya Radiance Cream', 
          price: '₹3,700', 
          image: '../images/product/soundarya_radiance.avif',
          category: 'Day Cream',
          description: 'Luxurious cream with 24K gold to enhance natural radiance.'
        },
        { 
          id: 'cleansing-mask', 
          name: 'Deep Cleansing Mask', 
          price: '₹2,750', 
          image: '../images/product/cleansing_mask.avif',
          category: 'Face Mask',
          description: 'Detoxifying mask with natural clays for deep pore cleansing.'
        },
        { 
          id: 'soundarya-essentials', 
          name: 'Advanced Soundarya Essentials Set', 
          price: '₹7,900', 
          image: '../images/product/soundarya_essentials.avif',
          category: 'Skincare Set',
          description: 'Complete anti-aging regimen for maintaining youthful skin.'
        }
      ]
    };
    
    // Skin type and dosha descriptions
    const skinTypeDescriptions = {
      'dry': 'Your skin tends to feel tight and may show signs of flaking or roughness. You likely experience more visible fine lines and may feel uncomfortable in dry or cold weather. Your skin benefits from rich, nourishing ingredients that help restore the skin\'s natural moisture barrier.',
      'oily': 'Your skin produces excess sebum, leading to a shiny appearance and potential breakouts. You may notice enlarged pores and are prone to blackheads and acne. Lightweight, non-comedogenic products that balance oil production work best for your skin type.',
      'combination': 'You experience both oily and dry areas on your face, typically with an oily T-zone (forehead, nose, and chin) and drier cheeks. This skin type benefits from a balanced approach to skincare that addresses both concerns without over-drying or over-moisturizing any area.',
      'sensitive': 'Your skin is easily irritated and may react to certain ingredients with redness, itching, or burning. You likely need to be cautious with new products and should look for gentle, fragrance-free formulas designed for sensitive skin.',
      'normal': 'Your skin is well-balanced, with few imperfections and minimal sensitivity. You experience few breakouts and your skin doesn\'t feel too dry or too oily. While you\'re fortunate to have this skin type, it still benefits from proper care to maintain its health and youthful appearance.'
    };
    
    const doshaDescriptions = {
      'vata': 'Vata skin tends to be dry, thin, and cool to the touch. It may age faster and is prone to fine lines and wrinkles. Your skin benefits from warm, nourishing oils and rich moisturizers that provide deep hydration and protection from environmental stressors.',
      'pitta': 'Pitta skin is typically sensitive, prone to redness, and may have freckles or moles. It burns easily in the sun and is prone to inflammation. Cooling, soothing ingredients help balance pitta dosha and reduce sensitivity and redness.',
      'kapha': 'Kapha skin is generally oily, thick, and cool to the touch. It\'s prone to congestion, enlarged pores, and blackheads. Light, warming ingredients help balance kapha dosha by stimulating circulation and preventing clogged pores.',
      'balanced': 'Your doshas are in balance, which is ideal in Ayurveda. Your skin likely has good resilience and a healthy glow. Maintaining this balance involves a consistent routine with seasonal adjustments to accommodate environmental changes.'
    };
    
    // Initialize the quiz
    function initQuiz() {
      // Check if required elements exist
      if (!quizForm || !nextBtn || !prevBtn || !submitBtn || !quizResults) {
        console.error('Required quiz elements not found');
        return;
      }
      
      // Show first question
      showQuestion(currentQuestion);
      
      // Set up all event listeners
      setupEventListeners();
      
      // Update navigation buttons
      updateNavButtons();
    }
    
    // Show current question and hide others
    function showQuestion(index) {
      questions.forEach((question, i) => {
        question.classList.toggle('active', i === index);
      });
      
      // Update progress
      updateProgressBar();
      updateNavButtons();
    }
    
    // Update progress bar
    function updateProgressBar() {
      const progress = ((currentQuestion + 1) / totalQuestions) * 100;
      progressBar.style.width = `${progress}%`;
      currentQuestionSpan.textContent = currentQuestion + 1;
    }
    
    // Update navigation buttons
    function updateNavButtons() {
      // Previous button
      prevBtn.disabled = currentQuestion === 0;
      
      // Next/Submit button
      const currentQuestionElement = questions[currentQuestion];
      const selectedOption = currentQuestionElement.querySelector('input[type="radio"]:checked');
      nextBtn.disabled = !selectedOption;
      
      // Show submit button on last question
      const isLastQuestion = currentQuestion === totalQuestions - 1;
      nextBtn.style.display = isLastQuestion ? 'none' : 'block';
      submitBtn.style.display = isLastQuestion ? 'block' : 'none';
    }
    
    // Calculate results
    function calculateResults() {
      const answers = {
        skinType: {
          'dry': 0,
          'oily': 0,
          'combination': 0,
          'normal': 0,
          'sensitive': 0
        },
        dosha: {
          'vata': 0,
          'pitta': 0,
          'kapha': 0
        }
      };
      
      // Count answers
      document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        const value = radio.value;
        if (value in answers.skinType) {
          answers.skinType[value]++;
        } else if (value in answers.dosha) {
          answers.dosha[value]++;
        }
      });
      
      // Determine skin type
      let skinType = 'normal';
      let maxCount = 0;
      
      for (const [type, count] of Object.entries(answers.skinType)) {
        if (count > maxCount) {
          maxCount = count;
          skinType = type;
        }
      }
      
      // Determine dosha
      let dosha = 'balanced';
      maxCount = 0;
      
      for (const [type, count] of Object.entries(answers.dosha)) {
        if (count > maxCount) {
          maxCount = count;
          dosha = type;
        }
      }
      
      // If no clear dosha, use skin type to determine
      if (maxCount === 0) {
        if (['dry', 'sensitive'].includes(skinType)) {
          dosha = 'vata';
        } else if (skinType === 'oily') {
          dosha = 'kapha';
        } else {
          dosha = 'pitta';
        }
      }
      
      return { skinType, dosha };
    }
    
    // Show results
    function showResults() {
      const { skinType, dosha } = calculateResults();
      const resultKey = `${skinType}_${dosha}`;
      
      // Update result text
      document.getElementById('skinType').textContent = skinType.charAt(0).toUpperCase() + skinType.slice(1);
      document.getElementById('skinTypeDesc').textContent = skinTypeDescriptions[skinType] || '';
      
      document.getElementById('doshaType').textContent = dosha.charAt(0).toUpperCase() + dosha.slice(1);
      document.getElementById('doshaDesc').textContent = doshaDescriptions[dosha] || '';
      
      // Show recommended products
      const productsGrid = document.getElementById('recommendedProducts');
      productsGrid.innerHTML = '';
      
      // Get recommendations based on results, fallback to skin type if no exact match
      const recommendations = productRecommendations[resultKey] || 
                             productRecommendations[`${skinType}_${dosha}`] ||
                             productRecommendations[`${skinType}_balanced`] ||
                             productRecommendations['normal_balanced'];
      
      recommendations.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}</div>
            <button class="btn btn-primary" style="margin-top: 10px; width: 100%;">Add to Bag</button>
          </div>
        `;
        productsGrid.appendChild(productCard);
      });
      
      // Show results section
      quizForm.style.display = 'none';
      quizResults.style.display = 'block';
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Event Listeners
    function setupEventListeners() {
      // Next button click handler
      nextBtn.addEventListener('click', handleNextClick);
      
      // Previous button click handler
      prevBtn.addEventListener('click', handlePrevClick);
      
      // Radio button change handler
      quizForm.addEventListener('change', handleRadioChange);
      
      // Form submission handler
      quizForm.addEventListener('submit', handleFormSubmit);
      
      // Retake quiz button
      if (retakeQuiz) {
        retakeQuiz.addEventListener('click', handleRetakeQuiz);
      }
      
      // Enable/disable next button based on selection
      updateNavButtons();
    }
    
    function handleNextClick(e) {
      e.preventDefault();
      if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        // Scroll to top of question
        window.scrollTo({
          top: questions[currentQuestion].offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
    
    function handlePrevClick(e) {
      e.preventDefault();
      if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        // Scroll to top of question
        window.scrollTo({
          top: questions[currentQuestion].offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
    
    function handleRadioChange(e) {
      if (e.target.type === 'radio') {
        // Enable next button when an option is selected
        updateNavButtons();
      }
    }
    
    function handleFormSubmit(e) {
      e.preventDefault();
      showResults();
    }
    
    function handleRetakeQuiz() {
      // Reset form
      quizForm.reset();
      currentQuestion = 0;
      showQuestion(currentQuestion);
      
      // Hide results, show form
      quizResults.style.display = 'none';
      quizForm.style.display = 'block';
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Initialize the quiz
    initQuiz();
  });
  