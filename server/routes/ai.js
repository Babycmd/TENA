const router = require("express").Router();

// Simple AI chat endpoint (placeholder for real AI integration)
router.post("/chat", async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false,
        msg: "Message is required" 
      });
    }

    // Simple response logic (can be replaced with real AI API)
    let response = generateAIResponse(message, language);

    res.json({
      success: true,
      reply: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Generate simple AI response
function generateAIResponse(message, language = "en") {
  const lowerMessage = message.toLowerCase();
  
  // Common health-related keywords
  const keywords = {
    fever: ["fever", "temperature", "hot", "febrile"],
    cough: ["cough", "coughing", "cold"],
    headache: ["headache", "head pain", "head"],
    stomach: ["stomach", "abdomen", "belly", "nausea"],
    chest: ["chest", "heart", "chest pain"],
    general: ["sick", "ill", "unwell", "disease", "symptom"]
  };

  let category = "general";
  
  for (const [key, words] of Object.entries(keywords)) {
    if (words.some(word => lowerMessage.includes(word))) {
      category = key;
      break;
    }
  }

  const responses = {
    en: {
      fever: "Based on your symptoms, you may have a fever. I recommend: 1) Rest and stay hydrated, 2) Take paracetamol if needed, 3) Monitor your temperature, 4) Consult a doctor if fever persists over 3 days or exceeds 39°C.",
      cough: "For cough symptoms, I suggest: 1) Stay hydrated with warm fluids, 2) Use honey (if not allergic), 3) Avoid smoking, 4) Rest adequately, 5) See a doctor if cough lasts more than 2 weeks.",
      headache: "For headache relief: 1) Rest in a quiet, dark room, 2) Stay hydrated, 3) Take pain relievers if needed, 4) Avoid screen time, 5) Consult a doctor if severe or persistent.",
      stomach: "Stomach concerns require attention: 1) Eat light, easily digestible foods, 2) Stay hydrated, 3) Avoid spicy/greasy foods, 4) Consider antacids, 5) See a doctor if symptoms persist.",
      chest: "Chest symptoms should be taken seriously. Please: 1) Rest immediately, 2) Avoid strenuous activity, 3) Monitor for shortness of breath, 4) Seek immediate medical attention if pain is severe or radiates to arm/jaw.",
      general: "Thank you for contacting TENA. For proper assessment, please provide more details about your symptoms. I recommend consulting with a healthcare professional for accurate diagnosis and treatment."
    },
    am: {
      fever: "ከስምሞችዎ ስለሚመስል የትኛውን ሐኪም እንደሚጠቁሙ አስታውቁ። በተለይ ሙቀት ካለዎት ፣ ብዙ ውሃ ይጠጡ ፣ እና በሽታው ከ3 ቀን በላይ ከቆየ ሐኪም ይመልከቱ።",
      cough: "ስለሚስማሙ ፣ በርካታ ፈሳሽ ይጠጡ ፣ ማር (ከተቃረኑ ከሌለ) ይጠቀሙ ፣ እና ለ2 ሳምንት በላይ ከቆየ ሐኪም ይመልከቱ።",
      general: "ለ TENA በማለፍዎ እናመሰግናለን። ለትክክለኛ ምርመራ እና ህክምና ሐኪም መስማማትን እመክራለን።"
    }
  };

  return responses[language]?.[category] || responses[language]?.general || responses.en.general;
}

// Get doctor suggestions based on symptoms
router.post("/suggest-doctors", async (req, res) => {
  try {
    const { symptoms } = req.body;

    // Map symptoms to specialties
    const symptomToSpecialty = {
      fever: "General Physician",
      cough: "General Physician",
      headache: "Neurologist",
      stomach: "Gastroenterologist",
      chest: "Cardiologist",
      skin: "Dermatologist",
      bones: "Orthopedic",
      children: "Pediatrician",
      mental: "Psychiatrist"
    };

    const lowerSymptoms = symptoms.toLowerCase();
    let suggestedSpecialties = ["General Physician"];

    for (const [symptom, specialty] of Object.entries(symptomToSpecialty)) {
      if (lowerSymptoms.includes(symptom)) {
        suggestedSpecialties.push(specialty);
      }
    }

    // Remove duplicates
    suggestedSpecialties = [...new Set(suggestedSpecialties)];

    res.json({
      success: true,
      suggestedSpecialties,
      message: "Based on your symptoms, we recommend consulting these specialists."
    });
  } catch (error) {
    console.error("Suggest doctors error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

module.exports = router;
