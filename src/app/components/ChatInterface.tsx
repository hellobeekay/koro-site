import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

type Step =
  | "name"
  | "subject"
  | "services"
  | "timing"
  | "jobOpenings"
  | "jobType"
  | "location"
  | "vibe"
  | "reason"
  | "email"
  | "complete";

/** Shared layout: stack on narrow viewports, row on sm+; prevents flex min-width overflow */
const CHAT_PROMPT_ROW =
  "flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-3";
const CHAT_LABEL =
  "text-3xl sm:text-4xl md:text-6xl lg:text-7xl min-w-0 max-w-full break-words";
const CHAT_ANSWER =
  "text-3xl sm:text-4xl md:text-6xl lg:text-7xl min-w-0 max-w-full break-words underline decoration-2 underline-offset-8";
const CHAT_TEXT_INPUT =
  "bg-transparent border-b-2 border-white outline-none text-3xl sm:text-4xl md:text-6xl lg:text-7xl w-full min-w-0 max-w-full sm:max-w-2xl text-white placeholder-white/50";
const CHAT_EMAIL_INPUT =
  "bg-transparent border-b-2 border-white outline-none text-3xl sm:text-4xl md:text-6xl lg:text-7xl w-full min-w-0 max-w-full text-white placeholder-white/50";
const CHAT_CHOICE_WRAP = "relative w-full min-w-0 sm:inline-block sm:w-auto";
const CHAT_CHOICE_BTN =
  "bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/90 transition-colors w-full min-w-0 sm:w-auto justify-center";

interface FormData {
  name: string;
  subject: string;
  services: string[];
  timing: string;
  jobOpenings: string[];
  otherJobOpening: string;
  jobType: string;
  location: string;
  customLocation: string;
  vibe: string;
  reason: string;
  email: string;
}

export function ChatInterface() {
  const [step, setStep] = useState<Step>("name");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    subject: "",
    services: [],
    timing: "",
    jobOpenings: [],
    otherJobOpening: "",
    jobType: "",
    location: "",
    customLocation: "",
    vibe: "",
    reason: "",
    email: "",
  });
  const [currentInput, setCurrentInput] = useState("");
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showTimingDropdown, setShowTimingDropdown] = useState(false);
  const [showJobOpeningsDropdown, setShowJobOpeningsDropdown] = useState(false);
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showVibeDropdown, setShowVibeDropdown] = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const subjects = ["Start a new project", "Join your team", "Meet in person"];
  const services = [
    "Strategy",
    "Website",
    "Media",
    "Branding",
    "Production",
    "Advertising",
    "Campaign",
  ];
  const timingOptions = [
    'Rush, Sorry (I Have A Few Weeks)',
    'Fair (3 Months)',
    'Ideas (6 Months)',
    'Sometime This Year'
  ];
  const jobOpeningsOptions = [
    "Designer",
    "Video Editor",
    "Illustrator",
    "Copy Writer",
    "Other"
  ];
  const jobTypeOptions = [
    "Full Time Role",
    "Freelance Opportunity",
    "Part Time Role",
    "Internship"
  ];
  const locationOptions = [
    "In HSR, Bangalore",
    "In Indiranagar, Bangalore",
    "Somewhere Else"
  ];
  const vibeOptions = [
    "A Coffee",
    "Natural Wine",
    "A Cold Beer"
  ];
  const reasonOptions = [
    "My Needs For An Agency Of Records",
    "A Business Opportunity",
    "A Strategic Partnership"
  ];

  useEffect(() => {
    if ((step === "name" || step === "email") && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setFormData({ ...formData, name: currentInput.trim() });
      setCurrentInput("");
      setStep("subject");
    }
  };

  const handleSubjectSelect = (subject: string) => {
    setFormData({ ...formData, subject });
    setShowSubjectDropdown(false);
    if (subject === "Start a new project") {
      setStep("services");
    } else if (subject === "Join your team") {
      setStep("jobOpenings");
    } else if (subject === "Meet in person") {
      setStep("location");
    } else {
      setStep("email");
    }
  };

  const handleServiceToggle = (service: string) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];
    setFormData({ ...formData, services: newServices });
  };

  const handleServicesContinue = () => {
    if (formData.services.length > 0) {
      setShowServicesDropdown(false);
      setStep("timing");
    }
  };

  const handleTimingSelect = (timing: string) => {
    setFormData({ ...formData, timing });
    setShowTimingDropdown(false);
    setStep("email");
  };

  const handleJobOpeningToggle = (jobOpening: string) => {
    const newJobOpenings = formData.jobOpenings.includes(jobOpening)
      ? formData.jobOpenings.filter((j) => j !== jobOpening)
      : [...formData.jobOpenings, jobOpening];
    setFormData({ ...formData, jobOpenings: newJobOpenings });
  };

  const handleJobOpeningsContinue = () => {
    if (formData.jobOpenings.length > 0) {
      setShowJobOpeningsDropdown(false);
      setStep("jobType");
    }
  };

  const handleJobTypeSelect = (jobType: string) => {
    setFormData({ ...formData, jobType });
    setShowJobTypeDropdown(false);
    setStep("email");
  };

  const handleLocationSelect = (location: string) => {
    if (location === "Somewhere Else") {
      setFormData({ ...formData, location });
      // Keep dropdown open for custom location input
    } else {
      setFormData({ ...formData, location, customLocation: "" });
      setShowLocationDropdown(false);
      setStep("vibe");
    }
  };

  const handleLocationContinue = () => {
    if (formData.customLocation.trim()) {
      setShowLocationDropdown(false);
      setStep("vibe");
    }
  };

  const handleVibeSelect = (vibe: string) => {
    setFormData({ ...formData, vibe });
    setShowVibeDropdown(false);
    setStep("reason");
  };

  const handleReasonSelect = (reason: string) => {
    setFormData({ ...formData, reason });
    setShowReasonDropdown(false);
    setStep("email");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && currentInput.includes("@")) {
      setFormData({ ...formData, email: currentInput.trim() });
      setCurrentInput("");
      sendEmail({ ...formData, email: currentInput.trim() });
      setStep("complete");
    }
  };

  const sendEmail = (data: FormData) => {
    // Build email body
    let emailBody = `New Contact Form Submission\\\\n\\\\n`;
    emailBody += `Name: ${data.name}\\\\n`;
    emailBody += `Subject: ${data.subject}\\\\n`;
    
    if (data.subject === "Start a new project") {
      emailBody += `Services: ${data.services.join(", ")}\\\\n`;
      emailBody += `Timing: ${data.timing}\\\\n`;
    }
    
    if (data.subject === "Join your team") {
      const jobOpeningsList = data.jobOpenings.filter(j => j !== "Other");
      if (data.jobOpenings.includes("Other") && data.otherJobOpening) {
        jobOpeningsList.push(data.otherJobOpening);
      }
      emailBody += `Job Openings: ${jobOpeningsList.join(", ")}\\\\n`;
      emailBody += `Job Type: ${data.jobType}\\\\n`;
    }
    
    if (data.subject === "Meet in person") {
      const displayLocation = data.location === "Somewhere Else" ? data.customLocation : data.location;
      emailBody += `Location: ${displayLocation}\\\\n`;
      emailBody += `Vibe: ${data.vibe}\\\\n`;
      emailBody += `Reason: ${data.reason}\\\\n`;
    }
    
    emailBody += `Email: ${data.email}\\\\n`;

    // Create mailto link
    const mailtoLink = `mailto:vidya.circusharbor@gmail.com?subject=New Contact from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto min-h-screen flex items-start w-full min-w-0">
      <div className="w-full min-w-0 py-12">
        {/* Chat Messages */}
        <div className="space-y-6 mb-8">
          {/* Initial greeting */}
          <div className={CHAT_PROMPT_ROW}>
            <span className={CHAT_LABEL}>Hello Koro, my name is</span>
            
            {step === "name" ? (
              <form onSubmit={handleNameSubmit} className="w-full min-w-0 sm:max-w-2xl">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className={CHAT_TEXT_INPUT}
                  placeholder="your name"
                  autoFocus
                />
              </form>
            ) : (
              <span className={CHAT_ANSWER}>
                {formData.name}
              </span>
            )}
          </div>

          {/* Subject line */}
          {step !== "name" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>I would like to</span>
              
              {step === "subject" ? (
                <div className={CHAT_CHOICE_WRAP}>
                  <button
                    onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                    className={CHAT_CHOICE_BTN}
                  >
                    <span>Choose a subject</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showSubjectDropdown && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl min-w-[250px] z-10">
                      {subjects.map((subject, index) => (
                        <button
                          key={index}
                          onClick={() => handleSubjectSelect(subject)}
                          className="w-full px-6 py-4 text-left hover:bg-black hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className={CHAT_ANSWER}>
                  {formData.subject.toLowerCase()}
                </span>
              )}
            </div>
          )}

          {/* Services selection */}
          {(step === "services" || step === "timing" || step === "email" || step === "complete") && 
           formData.subject === "Start a new project" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>I am looking for</span>
              
              {step === "services" ? (
                <div className={CHAT_CHOICE_WRAP}>
                  <button
                    onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                    className={CHAT_CHOICE_BTN}
                  >
                    <span>
                      {formData.services.length > 0
                        ? `${formData.services.length} selected`
                        : "Choose services"}
                    </span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showServicesDropdown && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl min-w-[250px] z-10">
                      {services.map((service, index) => (
                        <button
                          key={index}
                          onClick={() => handleServiceToggle(service)}
                          className={`w-full px-6 py-4 text-left hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0 flex items-center justify-between ${
                            formData.services.includes(service) ? "bg-gray-100" : ""
                          }`}
                        >
                          <span>{service}</span>
                          {formData.services.includes(service) && (
                            <span className="text-xl">✓</span>
                          )}
                        </button>
                      ))}
                      <button
                        onClick={handleServicesContinue}
                        disabled={formData.services.length === 0}
                        className="w-full px-6 py-4 bg-black text-white hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <span className={CHAT_ANSWER}>
                  {formData.services.join(", ")}
                </span>
              )}
            </div>
          )}

          {/* Timing selection */}
          {(step === "timing" || step === "email" || step === "complete") && 
           formData.subject === "Start a new project" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>The timing for this is</span>
              
              {step === "timing" ? (
                <div className={CHAT_CHOICE_WRAP}>
                  <button
                    onClick={() => setShowTimingDropdown(!showTimingDropdown)}
                    className={CHAT_CHOICE_BTN}
                  >
                    <span>Choose timing</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showTimingDropdown && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl min-w-[300px] z-10">
                      {timingOptions.map((timing, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimingSelect(timing)}
                          className="w-full px-6 py-4 text-left hover:bg-black hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                        >
                          {timing}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className={CHAT_ANSWER}>
                  {formData.timing}
                </span>
              )}
            </div>
          )}

          {/* Job openings selection */}
          {(step === "jobOpenings" || step === "jobType" || step === "email" || step === "complete") && 
           formData.subject === "Join your team" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>as a</span>
              
              {step === "jobOpenings" ? (
                <div className={CHAT_CHOICE_WRAP}>
                  <button
                    onClick={() => setShowJobOpeningsDropdown(!showJobOpeningsDropdown)}
                    className={CHAT_CHOICE_BTN}
                  >
                    <span>
                      {formData.jobOpenings.length > 0
                        ? `${formData.jobOpenings.length} selected`
                        : "Choose job openings"}
                    </span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showJobOpeningsDropdown && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl min-w-[250px] z-10">
                      {jobOpeningsOptions.map((jobOpening, index) => (
                        <button
                          key={index}
                          onClick={() => handleJobOpeningToggle(jobOpening)}
                          className={`w-full px-6 py-4 text-left hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0 flex items-center justify-between ${
                            formData.jobOpenings.includes(jobOpening) ? "bg-gray-100" : ""
                          }`}
                        >
                          <span>{jobOpening}</span>
                          {formData.jobOpenings.includes(jobOpening) && (
                            <span className="text-xl">✓</span>
                          )}
                        </button>
                      ))}
                      {formData.jobOpenings.includes("Other") && (
                        <div className="px-6 py-4 border-b border-gray-200">
                          <input
                            type="text"
                            value={formData.otherJobOpening}
                            onChange={(e) => setFormData({ ...formData, otherJobOpening: e.target.value })}
                            className="w-full bg-white text-black border-b border-black outline-none px-2 py-1"
                            placeholder="Please specify..."
                            autoFocus
                          />
                        </div>
                      )}
                      <button
                        onClick={handleJobOpeningsContinue}
                        disabled={formData.jobOpenings.length === 0 || (formData.jobOpenings.includes("Other") && !formData.otherJobOpening.trim())}
                        className="w-full px-6 py-4 bg-black text-white hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <span className={CHAT_ANSWER}>
                  {formData.jobOpenings.filter(j => j !== "Other").join(", ")}
                  {formData.jobOpenings.includes("Other") && formData.otherJobOpening && 
                    (formData.jobOpenings.length > 1 ? ", " + formData.otherJobOpening : formData.otherJobOpening)}
                </span>
              )}
            </div>
          )}

          {/* Job type selection */}
          {(step === "jobType" || step === "email" || step === "complete") && 
           formData.subject === "Join your team" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>I'm looking for</span>
              
              {step === "jobType" ? (
                <div className={CHAT_CHOICE_WRAP}>
                  <button
                    onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
                    className={CHAT_CHOICE_BTN}
                  >
                    <span>Choose job type</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showJobTypeDropdown && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl min-w-[300px] z-10">
                      {jobTypeOptions.map((jobType, index) => (
                        <button
                          key={index}
                          onClick={() => handleJobTypeSelect(jobType)}
                          className="w-full px-6 py-4 text-left hover:bg-black hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                        >
                          {jobType}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className={CHAT_ANSWER}>
                  {formData.jobType}
                </span>
              )}
            </div>
          )}

          {/* Location selection */}
          {(step === "location" || step === "vibe" || step === "reason" || step === "email" || step === "complete") && 
           formData.subject === "Meet in person" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>Can we meet</span>
              
              {step === "location" ? (
                <div className={CHAT_CHOICE_WRAP}>
                  <button
                    onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                    className={CHAT_CHOICE_BTN}
                  >
                    <span>Choose location</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showLocationDropdown && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl min-w-[300px] z-10">
                      {locationOptions.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full px-6 py-4 text-left hover:bg-black hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                        >
                          {location}
                        </button>
                      ))}
                      {formData.location === "Somewhere Else" && (
                        <div className="px-6 py-4 border-b border-gray-200">
                          <input
                            type="text"
                            value={formData.customLocation}
                            onChange={(e) => setFormData({ ...formData, customLocation: e.target.value })}
                            className="w-full bg-white text-black border-b border-black outline-none px-2 py-1"
                            placeholder="Please specify..."
                            autoFocus
                          />
                        </div>
                      )}
                      {formData.location === "Somewhere Else" && (
                        <button
                          onClick={handleLocationContinue}
                          disabled={!formData.customLocation.trim()}
                          className="w-full px-6 py-4 bg-black text-white hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <span className={CHAT_ANSWER}>
                  {formData.location === "Somewhere Else" ? formData.customLocation : formData.location}
                </span>
              )}
            </div>
          )}

          {/* Vibe selection */}
          {(step === "vibe" || step === "reason" || step === "email" || step === "complete") && 
           formData.subject === "Meet in person" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>Over</span>
              
              {step === "vibe" ? (
                <div className={CHAT_CHOICE_WRAP}>
                  <button
                    onClick={() => setShowVibeDropdown(!showVibeDropdown)}
                    className={CHAT_CHOICE_BTN}
                  >
                    <span>Choose vibe</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showVibeDropdown && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl min-w-[300px] z-10">
                      {vibeOptions.map((vibe, index) => (
                        <button
                          key={index}
                          onClick={() => handleVibeSelect(vibe)}
                          className="w-full px-6 py-4 text-left hover:bg-black hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                        >
                          {vibe}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className={CHAT_ANSWER}>
                  {formData.vibe}
                </span>
              )}
            </div>
          )}

          {/* Reason selection */}
          {(step === "reason" || step === "email" || step === "complete") && 
           formData.subject === "Meet in person" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>to discuss</span>
              
              {step === "reason" ? (
                <div className={CHAT_CHOICE_WRAP}>
                  <button
                    onClick={() => setShowReasonDropdown(!showReasonDropdown)}
                    className={CHAT_CHOICE_BTN}
                  >
                    <span>Choose reason</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  
                  {showReasonDropdown && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl min-w-[300px] z-10">
                      {reasonOptions.map((reason, index) => (
                        <button
                          key={index}
                          onClick={() => handleReasonSelect(reason)}
                          className="w-full px-6 py-4 text-left hover:bg-black hover:text-white transition-colors border-b border-gray-200 last:border-b-0"
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className={CHAT_ANSWER}>
                  {formData.reason}
                </span>
              )}
            </div>
          )}

          {/* Email input */}
          {step === "email" && (
            <div className={CHAT_PROMPT_ROW}>
              <span className={CHAT_LABEL}>You can reach me by email at</span>
              
              <form onSubmit={handleEmailSubmit} className="w-full min-w-0">
                <input
                  ref={inputRef}
                  type="email"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className={CHAT_EMAIL_INPUT}
                  placeholder="your@email.com"
                  autoFocus
                />
              </form>
            </div>
          )}

          {/* Complete message */}
          {step === "complete" && (
            <div className="space-y-6 mt-12 min-w-0 max-w-full">
              <div className={CHAT_LABEL}>
                You can reach me by email at{" "}
                <span className="underline decoration-2 underline-offset-8 break-all sm:break-words">
                  {formData.email}
                </span>
              </div>
              <div className="text-2xl md:text-4xl text-white/70 mt-12 min-w-0 max-w-full break-words">
                Thank you! Your message has been sent. We'll get back to you soon.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}