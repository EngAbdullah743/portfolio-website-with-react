import { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedCert, setExpandedCert] = useState(null);
  const [language, setLanguage] = useState('en');

  const sectionRefs = {
    hero: useRef(null),
    projects: useRef(null),
    education: useRef(null),
    experience: useRef(null),
    certifications: useRef(null),
    about: useRef(null),
    contact: useRef(null)
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Update active section
      const sections = Object.entries(sectionRefs);
      let current = 'hero';
      
      sections.forEach(([sectionName, ref]) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          if (window.pageYOffset >= sectionTop - 200) {
            current = sectionName;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionName) => {
    if (sectionRefs[sectionName]?.current) {
      sectionRefs[sectionName].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Show notification
  const showNotification = (message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `fixed top-5 right-5 px-6 py-3 rounded-lg text-white font-semibold z-50 animate-fade-in max-w-xs`;
    
    if (type === 'success') {
      notification.className += ' bg-gradient-to-r from-green-500 to-green-600';
    } else if (type === 'error') {
      notification.className += ' bg-gradient-to-r from-red-500 to-red-600';
    } else {
      notification.className += ' bg-gradient-to-r from-purple-500 to-indigo-600';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center z-50">
        <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  const projects = [
    {
      id: 1,
      title: "Smart Queue Management System",
      tech: "HTML, CSS, JavaScript, Node.js",
      description: "This is a responsive smart queue management system for small business website.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Portfolio Website",
      tech: "HTML, CSS, JS, Node.js",
      description: "A portfolio website with basic dark design",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "E-commerce Platform",
      tech: "React, Node.js, MongoDB",
      description: "Full-featured e-commerce platform with payment integration",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop"
    }
  ];

  const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: 'bg-orange-500' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'bg-blue-500' },
    { name: 'JavaScript', icon: 'fab fa-js', color: 'bg-yellow-400 text-black' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: 'bg-green-500' },
    { name: 'React', icon: 'fab fa-react', color: 'bg-cyan-400 text-black' },
    { name: 'Git', icon: 'fab fa-git-alt', color: 'bg-red-500' }
  ];

  const education = [
    {
      id: 1,
      year: "2020 - 2024",
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      description: "Specialized in Software Engineering with focus on web development and database management. Graduated with honors (GPA: 3.8/4.0)",
      highlights: ["Data Structures", "Web Development", "Database Systems", "Software Engineering"],
      icon: "fas fa-graduation-cap"
    },
    {
      id: 2,
      year: "2018 - 2020",
      degree: "High School Diploma",
      institution: "Science and Technology High School",
      description: "Focused on Mathematics and Computer Science. Active member of programming club and robotics team.",
      highlights: ["Mathematics", "Physics", "Computer Science", "Robotics"],
      icon: "fas fa-school"
    }
  ];

  const experience = [
    {
      id: 1,
      period: '12/2024-04/2025',
      title: 'Call Center Agent',
      company: 'Blue Wave Suite Hotel',
      location: 'Remote',
      description: 'Handled bookings, customer queries, and follow-ups.',
      highlights: ['Remote Support', 'Bookings', 'Follow-ups']
    },
    {
      id: 2,
      period: '08/2024- 11/2024',
      title: 'Call Center Agent',
      company: 'Vertex Solutions Ltd',
      location: 'Istanbul, Turkiye',
      description: 'Managed customer inquiries and issue resolution.',
      highlights: ['Customer Satisfaction', 'Communication', 'Problem Solving']
    },
    {
      id: 3,
      period: '06/2024- 07/2024',
      title: 'Call Center Agent Intern',
      company: 'Vertex Solutions Ltd',
      location: 'Istanbul, Turkiye',
      description: 'Supported inbound/outbound calls and learned CRM tools.',
      highlights: ['Customer Support', 'Call Handling', 'CRM Basics']
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2025",
      description: "learined the fundamentals of responsive web design, including HTML, CSS, and JavaScript",
      skills: ["responsive design", "web accessibility", "cross-browser compatibility"],
      icon: "fab fa-html5"
    },
    {
      id: 2,
      title: "Web design course",
      issuer: "Udemy",
      date: "2023",
      description: " strong skills in creating websites with HTML, CSS and Wordpress",
      skills: ["Basic HTML", "Basic CSS", "Wordpress"],
      icon: "fab fa-css3-alt"
    },
    {
      id: 3,
      title: "Foundations of Front-End Development",
      issuer: "Coursera",
      date: "2025",
      description: "learned to solve problems, design algorithms, and write efficient, modular code",
      skills: ["Computational Thinking", "nd Web Development", "Integrated Development Environments"],
      icon: "fab fa-css3-alt"
    },
    {
      id: 4,
      title: "javaScript Basics",
      issuer: "hackerrank",
      date: "2025",
      description: "learned the basics of javaScript programming language.",
      skills: ["variables", "data types", "functions"],
      icon: "fab fa-js-square"
    },
    {
      id: 5,
      title: "Front-End Web Development",
      issuer: "Coursera",
      date: "2025",
      description: "learned the basics of front-end web development, including HTML, CSS, and JavaScript",
      skills: ["responsive design", "web accessibility", "cross-browser compatibility"],
      icon: "fab fa-js-square"
    },
    {
      id: 6,
      title: "Introduction to React JS",
      issuer: "Cursa",
      date: "2025",
      description: "introduction to the most popular javaScript library for building user interfaces: React JS.",
      skills: ["React JS Core Principles", "JSX", "React Router for Navigation"],
      icon: "fab fa-react",
      verifyUrl: "https://cursa.app/en/my-certificate/cert1289952a373fd8eaa0fed7a28777aa6f"
    },
    {
      id: 7,
      title: "Customer Service Training",
      issuer: "Alison",
      date: "2025",
      description: "learned the fundamentals of customer service, including effective communication, problem-solving, and handling difficult customers.",
      skills: ["customer satisfaction", "communication skills", "problem-solving"],
      icon: "fas fa-laptop-code"
    },
    {
      id: 8,
      title: "Guide to Call Center Management",
      issuer: "Alison",
      date: "2025",
      description: "learned stragies for managing inbound and outbound call centers operations.",
      skills: ["call handling time", "customer satisfcation", "service levels"],
      icon: "fas fa-mobile-alt"
    },
    {
      id: 9,
      title: "Introduction to Communication Skills",
      issuer: "Alison",
      date: "2025",
      description: "Built strong verbal and non-verbal communication skills for clear interactions, imporeved interpersonal skills for both workplace and customer-facing situaitons.",
      skills: ["active listening", "questionin methods", "customer understanding"],
      icon: "fas fa-mobile-alt"
    },
    {
      id: 10,
      title: "Call Center Customer Service Training (Kwestyon Course)",
      issuer: "Cursa",
      date: "2025",
      description: "Trained in proper call etiquette, tone, and professional handling of inbound/outbound calls,Learned techniques for managing difficult customers and de-escalating tense situations.",
      skills: ["multitasking", "customer scenarios", "handling difficult customers"],
      icon: "fas fa-mobile-alt",
      verifyUrl: "https://cursa.app/en/my-certificate/cert1a1c3813bf130e7ceafda931470cb203"
    },
    {
      id: 11,
      title: "Underestanding Your Customers",
      issuer: "OpenLearn",
      date: "2025",
      description: "learned to analyze customer behavior and preferences to tailor service approaches,Developed skills to anticipate customer needs and enhance overall satisfaction.",
      skills: ["service personality", "empathy", "problem-solving"],
      icon: "fas fa-mobile-alt"
    },
    {
      id: 12,
      title: "Inbound",
      issuer: "HubSpot Academy",
      date: "2025",
      description: "Gained knowledge of inbound marketing principles and strategies,Learned to attract, engage, and delight customers through content and personalized experiences.",
      skills: ["customer-first thinking", "drive customer trust", "enhance sales"],
      icon: "fas fa-mobile-alt"
    },
    {
      id: 13,
      title: "Active Listening: Enhancing Communication Skills",
      issuer: "Cursa",
      date: "2025",
      description: "Mastred active listening techniques to improve understanding and rapport,Learned to provide constructive feedback and ask clarifying questions for effective communication.",
      skills: ["two-way communication", "attentive listening", "customer needs"],
      icon: "fas fa-mobile-alt"
    },
    {
      id: 14,
      title: "Customer Service Essentials",
      issuer: "Great Learning",
      date: "2025",
      description: "Learned essential customer service skills including communication, problem-solving, and conflict resolution,Developed strategies to handle challenging customer interactions and turn them into positive experiences.",
      skills: ["customer satisfaction", "effective communication", "conflict resolution"],
      icon: "fas fa-mobile-alt"
    },
    {
      id: 15,
      title: "Effective communication in the workplace",
      issuer: "The Open University",
      date: "2025",
      description: "Recognized for completing a course covering communication types, required skills, impact on perception, overcoming workplace challenges, and self-reflection on communication skills.",
      skills: ["workplace", "verbal communication", "non-verbal communication"],
      icon: "fas fa-comments",
      verifyUrl: "https://www.open.edu/openlearn/badges/badge.php?hash=8bfdde07677853023a5fc38405af1d5dc8acd308"
    }
  ];

  return (
    <div className="font-inter bg-gray-900 text-gray-100 min-h-screen">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10px 10px, rgba(199, 146, 234, 0.3) 2px, transparent 0),
                           radial-gradient(circle at 25px 25px, rgba(199, 146, 234, 0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px'
        }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg z-40 py-4 border-b border-gray-700/30">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Abdullah
          </h1>
          
          <ul className="hidden md:flex space-x-8">
            {['hero', 'projects', 'education', 'experience', 'certifications', 'about', 'contact'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`font-medium transition-all duration-300 relative ${
                    activeSection === section 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-purple-400'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {activeSection === section && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              showNotification(`Language changed to ${e.target.value.toUpperCase()}`, 'info');
            }}
            className="bg-gray-700 text-gray-300 border border-gray-600 px-3 py-1 rounded text-sm"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
            <option value="tr">TR</option>
          </select>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={sectionRefs.hero} className="min-h-screen flex items-center pt-20 px-8 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-lg text-gray-400 mb-4">welcome to my portfolio website</h2>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  I am<br />
                </span>
                <span className="text-white">Abdullah</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {' '}a Front-End Developer & Call Center Agent
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                I craft responsive websites where technologies meet creativity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Contact Me
                </button>
                <button
                  onClick={() => showNotification('CV download initiated!', 'success')}
                  className="px-8 py-3 border border-purple-500 text-purple-400 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Download CV <i className="fas fa-download"></i>
                </button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Abdullah Ahmad"
                  className="w-80 h-80 rounded-full object-cover border-4 border-purple-500/30"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={sectionRefs.experience} className="py-20 px-8 relative z-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 relative">
            <span className="text-purple-400 mr-2">/</span>Work Experience
          </h2>
          <p className="text-center text-gray-400 mb-12">Professional roles and responsibilities</p>

          <div className="max-w-4xl mx-auto">
            {experience.map((job) => (
              <div key={job.id} className="flex flex-col lg:flex-row gap-8 mb-12 last:mb-0">
                <div className="lg:w-1/4">
                  <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {job.period}
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 relative">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-briefcase text-white"></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <h4 className="text-purple-400 font-medium mb-2">{job.company}</h4>
                        <p className="text-gray-400 mb-3">Location: {job.location}. {job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.highlights.map((tag, idx) => (
                            <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-8">
        <div className="container mx-auto max-w-2xl">
          <blockquote className="text-center border border-gray-700 p-8 rounded-lg bg-gray-800/50 backdrop-blur">
            <p className="text-xl font-mono text-gray-300 mb-4">
              "if the code work, do not touch it."
            </p>
            <cite className="text-gray-400">— Eng. Abdullah Ahmad</cite>
          </blockquote>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="py-20 px-8 relative z-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 relative">
            <span className="text-purple-400 mr-2">/</span>My Projects
          </h2>
          <p className="text-center text-gray-400 mb-12">Check out some of the projects I've worked on.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-purple-400 text-sm mb-2">{project.tech}</div>
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <button
                    onClick={() => showNotification('Project details would open here!', 'info')}
                    className="bg-transparent border border-gray-600 text-gray-300 px-4 py-2 rounded hover:bg-purple-500 hover:border-purple-500 hover:text-white transition-all duration-300"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            <span className="text-purple-400 mr-2">/</span>Skills
          </h2>
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-4 justify-center">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-full ${skill.color} flex items-center justify-center text-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 cursor-pointer shadow-lg`}
                  title={skill.name}
                >
                  <i className={skill.icon}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={sectionRefs.education} className="py-20 px-8 bg-gray-800/30 relative z-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 relative">
            <span className="text-purple-400 mr-2">/</span>Education
          </h2>
          <p className="text-center text-gray-400 mb-12">My academic journey and qualifications</p>
          
          <div className="max-w-4xl mx-auto">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col lg:flex-row gap-8 mb-12 last:mb-0">
                <div className="lg:w-1/4">
                  <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {edu.year}
                  </span>
                </div>
                <div className="lg:w-3/4">
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 relative">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`${edu.icon} text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                        <h4 className="text-purple-400 font-medium mb-3">{edu.institution}</h4>
                        <p className="text-gray-400 mb-4">{edu.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {edu.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section ref={sectionRefs.certifications} className="py-20 px-8 relative z-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 relative">
            <span className="text-purple-400 mr-2">/</span>Certifications
          </h2>
          <p className="text-center text-gray-400 mb-12">Professional certifications and achievements</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className={`bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative ${
                  expandedCert === cert.id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setExpandedCert(expandedCert === cert.id ? null : cert.id)}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <i className={`${cert.icon} text-white`}></i>
                  </div>
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-certificate text-purple-400 text-sm"></i>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-purple-400 font-medium text-sm mb-1">{cert.issuer}</p>
                <p className="text-gray-400 text-sm mb-3">{cert.date}</p>
                <p className="text-gray-300 text-sm mb-4">{cert.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {cert.verifyUrl && (
                  <div className="mt-4">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-300 hover:text-white border border-purple-500/40 px-3 py-1 rounded"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fas fa-external-link-alt"></i> Verify Certificate
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} className="py-20 px-8 bg-gray-800/30 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            <span className="text-purple-400 mr-2">/</span>About Me
          </h2>
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <p className="text-gray-300 leading-relaxed mb-6">
              I'm a passionate web developer with expertise in creating beautiful and functional websites. I specialize in modern web technologies including HTML, CSS, JavaScript, React, and Node.js. My journey in web development has been driven by a continuous desire to learn and adapt to new technologies.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              With a strong foundation in computer science and multiple professional certifications, I bring both theoretical knowledge and practical skills to every project. I believe in writing clean, maintainable code and creating user experiences that are both intuitive and engaging.
            </p>
            <p className="text-gray-300 leading-relaxed">
              In my free time, I enjoy exploring new technologies, contributing to open-source projects, and mentoring aspiring developers. I'm always excited to take on new challenges and collaborate with teams to create innovative digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} className="py-20 px-8 relative z-10">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-12 relative">
            <span className="text-purple-400 mr-2">/</span>Contact
          </h2>
          
          <div className="bg-gray-800 p-8 rounded-lg border border-purple-500 text-center">
            <p className="text-lg mb-8 font-mono">message me here:</p>
            
            <div className="flex justify-center gap-6">
              <a
                href="mailto:abdullah.ahmad.engg@gmail.com"
                className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition-transform duration-300"
                title="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
              <a
                href="https://www.instagram.com/a3zj1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition-transform duration-300"
                title="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-ahmad-0898a8317"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition-transform duration-300"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/EngAbdullah743"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition-transform duration-300"
                title="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2025 Abdullah Ahmad. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
