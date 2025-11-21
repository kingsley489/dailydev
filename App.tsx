import React, { useState, useEffect } from 'react';
import { 
  Paperclip, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Fingerprint, 
  AlertCircle,
  X,
  FileText,
  Search,
  Camera
} from 'lucide-react';
import { Project, Skill } from './types';

// --- Constants & Data ---

const SUSPECT_NAME = "KINGSLEY EMORI";
const OCCUPATION = "FRONTEND ENGINEER";
const LOCATION = "LAGOS, NG";
const CURRENT_DATE = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();

const SKILLS: Skill[] = [
  { category: "FRONTEND", items: ["HTML", "CSS", "Javascript", "React", "TypeScript", "Tailwind"] },
  { category: "BACKEND", items: ["Node.js", "Python"] },
  { category: "TOOLS", items: ["Git", "Figma"] }
];

const PROJECTS: Project[] = [
  {
    id: "CASE-001",
    title: "THE QUANTUM DASHBOARD",
    date: "OCT 2024",
    description: "A real-time financial analytics platform visualizing complex datasets.",
    synopsis: "Client reported a need for high-frequency data visualization. Existing tools were sluggish and unresponsive under load. The objective was to architect a dashboard capable of rendering 50k+ data points in real-time without freezing the browser.",
    technologies: ["React", "D3.js", "WebSockets"],
    imageUrl: "https://picsum.photos/600/400?grayscale",
    classified: false,
    link: "#",
    findings: "Investigation revealed that standard DOM manipulation was the bottleneck. Implementing D3.js with a canvas fallback layer resulted in a 400% performance increase.",
    challenges: "Synchronizing WebSocket streams with the UI render cycle caused initial frame drops. A custom buffering hook was developed to smooth out the data flow.",
    evidence: [
      { type: 'image', content: "https://picsum.photos/600/300?grayscale", caption: "Fig 1.A: Live Data Stream" },
      { type: 'code', content: "const useDataStream = (socket) => { ... }", caption: "Exhibit B: The Buffer Hook" }
    ]
  },
  {
    id: "CASE-002",
    title: "PROJECT: NEBULA",
    date: "AUG 2024",
    description: "AI-driven content generation engine mimicking human writing styles.",
    synopsis: "Subject attempted to automate creative writing processes. The system needed to parse semantic intent and output coherent, stylistic prose. Ethical guardrails were a primary requirement from the oversight committee.",
    technologies: ["Python", "TensorFlow", "FastAPI"],
    imageUrl: "https://picsum.photos/600/401?grayscale",
    classified: true,
    link: "#",
    findings: "The model successfully replicated 14 different writing styles. Latency was reduced to sub-200ms for prompt generation.",
    challenges: "Preventing hallucination in the output required a rigorous post-processing validation layer.",
    evidence: [
      { type: 'image', content: "https://picsum.photos/600/301?grayscale", caption: "Fig 2.A: Neural Pathways" }
    ]
  },
  {
    id: "CASE-003",
    title: "THE VAULT API",
    date: "JUN 2024",
    description: "Secure banking infrastructure built for high-concurrency transactions.",
    synopsis: "A digital fortress was required for a new fintech challenger. The brief demanded zero downtime and military-grade encryption for all data in transit and at rest.",
    technologies: ["Node.js", "PostgreSQL", "Redis"],
    imageUrl: "https://picsum.photos/600/402?grayscale",
    classified: false,
    link: "#",
    findings: "Penetration testing revealed zero critical vulnerabilities after 3 rounds of attacks. Throughput capacity exceeded 10,000 TPS.",
    challenges: "Handling race conditions during simultaneous ledger updates. Optimistic locking strategies were deployed to resolve conflicts.",
    evidence: [
      { type: 'image', content: "https://picsum.photos/600/302?grayscale", caption: "Fig 3.A: Architecture Diagram" }
    ]
  },
  {
    id: "CASE-004",
    title: "OPERATION: E-COMM",
    date: "JAN 2024",
    description: "Scalable e-commerce headless architecture for high-volume retail.",
    synopsis: "Target required a platform capable of withstanding 'Black Friday' traffic surges. The legacy monolith was crumbling under pressure.",
    technologies: ["Next.js", "Stripe", "Sanity"],
    imageUrl: "https://picsum.photos/600/403?grayscale",
    classified: false,
    link: "#",
    findings: "Load testing confirmed stability at 5x peak historical traffic. Checkout conversion rates improved by 15% due to speed enhancements.",
    challenges: "Integrating legacy inventory systems with the new modern frontend. A middleware synchronization layer was constructed.",
    evidence: [
      { type: 'image', content: "https://picsum.photos/600/303?grayscale", caption: "Fig 4.A: Checkout Flow" }
    ]
  }
];

// --- Helper Components ---

const RedStamp = ({ text, angle = -12, className = "" }: { text: string, angle?: number, className?: string }) => (
  <div 
    className={`absolute border-[5px] border-red-stamp text-red-stamp font-typewriter font-bold opacity-80 pointer-events-none select-none z-20 mix-blend-multiply text-center leading-none py-2 px-4 ${className}`}
    style={{ transform: `rotate(${angle}deg)` }}
  >
    {text}
  </div>
);

const PaperClip = ({ className }: { className?: string }) => (
  <div className={`absolute z-20 drop-shadow-md ${className}`}>
    <Paperclip className="w-12 h-12 text-gray-400" />
  </div>
);

// --- Modal Component: Case File ---

const CaseFileModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      {/* Folder Container */}
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl bg-[#f0e6d2] shadow-2xl min-h-[80vh] flex flex-col transform rotate-[0.5deg] animate-in fade-in zoom-in duration-300">
        
        {/* Folder Tab */}
        <div className="absolute -top-8 left-0 bg-[#f0e6d2] px-8 py-2 rounded-t-lg border-t border-l border-r border-[#d6cbb3] shadow-sm">
          <span className="font-typewriter font-bold text-gray-600 tracking-widest">CONFIDENTIAL // CASE #{project.id}</span>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-ink hover:text-red-700 z-50"
        >
          <X size={32} />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12 border border-[#d6cbb3] m-2 h-full flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
          
          {/* Stamps */}
          {project.classified && <RedStamp text="TOP SECRET" angle={-15} className="top-10 right-20 text-4xl" />}
          {!project.classified && <RedStamp text="DECLASSIFIED" angle={15} className="top-10 right-20 text-3xl border-green-800 text-green-800" />}

          {/* Header */}
          <div className="border-b-4 border-black mb-8 pb-4">
            <h2 className="text-4xl md:text-6xl font-headline uppercase mb-2">{project.title}</h2>
            <div className="flex gap-6 font-mono text-sm text-gray-600">
              <span>DATE: {project.date}</span>
              <span>CLEARANCE: {project.classified ? 'LEVEL 5' : 'PUBLIC'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Evidence/Photos */}
            <div className="lg:col-span-5 space-y-8">
              <div className="relative bg-white p-3 shadow-md transform -rotate-2 border border-gray-300">
                <PaperClip className="-top-4 right-1/2 translate-x-1/2" />
                <div className="aspect-video bg-gray-200 overflow-hidden grayscale">
                  <img src={project.imageUrl} alt="Main Evidence" className="w-full h-full object-cover" />
                </div>
                <p className="font-typewriter text-xs text-center mt-2 text-gray-500">EXHIBIT A: PROJECT OVERVIEW</p>
              </div>

              {/* Tech Stack Tag */}
              <div className="bg-stone-200 p-4 border border-stone-300 relative">
                <div className="absolute -top-3 left-4 bg-black text-white px-2 text-xs font-bold uppercase">Forensic Tools</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="border border-black px-2 py-1 text-xs font-mono bg-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Report */}
            <div className="lg:col-span-7 font-serif text-lg leading-relaxed space-y-8">
              
              <section>
                <h3 className="font-typewriter font-bold text-xl uppercase border-b border-gray-400 mb-3 inline-block">1. Incident Synopsis</h3>
                <p className="text-justify">
                  {project.synopsis}
                </p>
              </section>

              <section className="bg-white/50 p-6 border-l-4 border-red-800">
                <h3 className="font-typewriter font-bold text-xl uppercase mb-3">2. Investigation Findings</h3>
                <p className="mb-4">
                  <span className="font-bold">Challenges:</span> {project.challenges}
                </p>
                <p>
                  <span className="font-bold">Verdict:</span> {project.findings}
                </p>
              </section>

              {project.link && (
                <div className="pt-4">
                  <a href={project.link} className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-bold font-typewriter uppercase tracking-widest hover:bg-red-700 transition-colors">
                    Access External Files <ExternalLink size={16} />
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Form Component: Anonymous Tip ---

const AnonymousTipForm = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('submitted'), 1500);
  };

  if (formState === 'submitted') {
    return (
      <div className="bg-paper p-8 border-2 border-black shadow-lg text-center transform rotate-1 max-w-lg mx-auto">
        <div className="inline-block border-[4px] border-green-800 text-green-800 px-6 py-2 font-typewriter font-bold text-2xl mb-4 -rotate-3">
          TIP RECEIVED
        </div>
        <p className="font-serif text-xl">
          Your information has been logged. <br/> Stay safe out there.
        </p>
        <button onClick={() => setFormState('idle')} className="mt-6 text-sm font-mono underline">Submit another tip</button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbf9] p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] border border-gray-400 relative max-w-2xl mx-auto transform -rotate-1">
      {/* Decorative Tape */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/80 rotate-2 shadow-sm border border-yellow-200/50 backdrop-blur-sm"></div>

      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-headline font-bold mb-2">ANONYMOUS TIP LINE</h3>
        <p className="font-typewriter text-sm text-red-700 uppercase tracking-widest">*** Use secure channels only ***</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 font-typewriter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Informant Name (Optional)</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b-2 border-black py-2 px-1 focus:outline-none focus:border-red-700 transition-colors text-lg"
              placeholder="John Doe"
            />
          </div>
          <div className="relative">
            <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Contact Method (Email)</label>
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-b-2 border-black py-2 px-1 focus:outline-none focus:border-red-700 transition-colors text-lg"
              placeholder="secure@email.com"
            />
          </div>
        </div>

        <div className="relative mt-8">
          <label className="block text-xs font-bold uppercase mb-1 text-gray-500">The Tip (Message)</label>
          <textarea 
            required
            rows={4}
            className="w-full bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] border-2 border-gray-300 p-4 focus:outline-none focus:border-black transition-colors text-lg leading-8"
            placeholder="I have information about a project..."
          ></textarea>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="hidden md:block">
             <Fingerprint className="w-12 h-12 text-gray-200" />
          </div>
          <button 
            type="submit"
            className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg active:translate-y-1"
          >
            {formState === 'submitting' ? 'Transmitting...' : 'Submit Evidence'}
          </button>
        </div>
      </form>
      
      <div className="absolute bottom-4 right-4 text-[10px] text-gray-400 font-mono">
        FORM ID: 882-XJ
      </div>
    </div>
  );
};

// --- Main Application ---

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen text-ink font-mono relative overflow-x-hidden pb-20">
      {/* Grain/Noise Overlay */}
      <div className="texture-overlay"></div>

      {/* Modal Overlay */}
      {selectedProject && (
        <CaseFileModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* Header / Newspaper Name */}
      <header className="container mx-auto px-4 pt-8 pb-4 text-center border-b-[3px] border-black mb-8 relative z-10">
        <div className="flex justify-between items-end border-b border-black pb-2 mb-2">
          <span className="text-xs md:text-sm font-bold font-typewriter">VOL. CDXX</span>
          <span className="text-xs md:text-sm font-bold font-typewriter">{CURRENT_DATE}</span>
          <span className="text-xs md:text-sm font-bold font-typewriter">PRICE: $1.00</span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-cinzel tracking-wider leading-none mb-2">
          THE DEV CHRONICLES
        </h1>
        <div className="w-full h-px bg-black mb-1"></div>
        <div className="w-full h-[2px] bg-black mb-4"></div>
        <div className="flex justify-center gap-8 uppercase font-headline text-sm md:text-base italic">
          <span>Coding</span>
          <span className="text-red-700 px-2">●</span>
          <span>Design</span>
          <span className="text-red-700 px-2">●</span>
          <span>Architecture</span>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Lead Story */}
          <div className="lg:col-span-7 bg-paper p-6 md:p-8 shadow-cutout border-l border-r border-black relative">
            <h2 className="text-5xl md:text-6xl font-headline leading-tight mb-6 uppercase">
              Developer Wanted For Excessive Talent
            </h2>
            <div className="columns-1 md:columns-2 gap-6 text-justify font-serif text-lg leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-[-5px]">
                Authorities are on the lookout for <span className="font-bold bg-yellow-200 px-1">{SUSPECT_NAME}</span>, a frontend developer known for obsessive attention to UI details and dangerously clean code. Last seen crafting pixel-perfect interfaces in Lagos, Nigeria.
                Witnesses describe the suspect as specializes in transforming design mockups into flawless React applications. Known to spend hours adjusting margins and perfecting animations until every element aligns with mathematical precision. Witnesses report seeing him muttering about "responsive breakpoints" and "component reusability.
              </p>
              <p className="mt-4">
                <strong>WARNING:</strong> Subject is armed with a mechanical keyboard and highly dangerous knowledge of Javascript. Approach with a challenging project.
              </p>
            </div>
            <div className="mt-8 border-t-2 border-black pt-4 flex items-center gap-4">
              <span className="font-bold font-typewriter text-red-700 text-xl">STATUS:</span>
              <span className="bg-black text-white px-2 py-1 font-bold font-typewriter transform -rotate-1">AVAILABLE FOR HIRE</span>
            </div>
          </div>

          {/* Mugshot */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white p-4 shadow-floating transform rotate-2 border border-gray-300 relative">
              <PaperClip className="left-1/2 -translate-x-1/2 -top-4" />
              <div className="aspect-square w-full bg-gray-200 mb-4 overflow-hidden relative grayscale contrast-125">
                <img 
                  src="/assets/kingsleyt.jpg" 
                  alt="Suspect Mugshot" 
                  className="w-full h-full object-cover"
                />
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none"></div>
              </div>
              <div className="font-typewriter text-sm space-y-2 border-t-2 border-dashed border-gray-400 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">NAME:</span>
                  <span className="font-bold">{SUSPECT_NAME}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">OCCUPATION:</span>
                  <span className="font-bold">{OCCUPATION}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">LOCATION:</span>
                  <span className="font-bold">{LOCATION}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">KNOWN ALIASES:</span>
                  <span className="font-bold">"Sudo", "Admin"</span>
                </div>
              </div>
              <RedStamp text="CONFIDENTIAL" angle={-15} className="top-[10%] right-[10%]" />
            </div>
            
            {/* Taped Note */}
            <div className="absolute -bottom-12 -left-8 bg-yellow-100 p-4 shadow-md w-64 transform -rotate-3 font-handwriting border border-yellow-200 hidden md:block">
              <div className="absolute -top-3 left-1/2 w-8 h-8 bg-gray-200/50 rotate-45 backdrop-blur-sm"></div> {/* Tape */}
              <p className="font-typewriter text-xs text-red-800">
                "I solve problems others don't even know exist yet."
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24 relative">
           <div className="absolute -left-4 top-0 bottom-0 w-1 bg-red-800/20"></div>
           <div className="pl-8">
            <div className="flex items-center gap-4 mb-8">
              <Fingerprint className="w-8 h-8" />
              <h3 className="text-3xl font-headline uppercase border-b-2 border-black pb-1 inline-block">
                Forensic Evidence (Skills)
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SKILLS.map((skillGroup, idx) => (
                <div key={idx} className="bg-paper p-6 border border-gray-400 shadow-cutout relative group">
                  <div className="absolute top-0 right-0 p-2 opacity-50">
                    <span className="font-typewriter text-xs border border-black px-1">EXHIBIT {String.fromCharCode(65 + idx)}</span>
                  </div>
                  <h4 className="font-bold font-typewriter text-xl mb-4 underline decoration-red-700 underline-offset-4">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span key={skill} className="bg-white border border-gray-800 px-3 py-1 text-sm font-bold font-mono hover:bg-black hover:text-white transition-colors cursor-default shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
           </div>
        </section>

        {/* Case Files (Projects) */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <span className="bg-black text-white px-4 py-1 text-sm font-bold uppercase tracking-widest">Declassified Files</span>
            <h2 className="text-5xl md:text-7xl font-headline mt-4">CASE FILES</h2>
            <p className="font-serif italic mt-2 text-gray-600">Click a file to view the full investigation report.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
            {PROJECTS.map((project, index) => (
              <div 
                key={project.id} 
                className={`relative bg-white p-2 pb-8 shadow-floating transition-all duration-300 hover:-translate-y-2 cursor-pointer group ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Folder Tab Look */}
                <div className="absolute -top-6 left-0 bg-stone-200 h-6 w-1/3 border-t border-l border-r border-gray-300 rounded-t-sm group-hover:bg-stone-300 transition-colors">
                  <span className="px-4 text-xs font-bold text-gray-500 pt-1 block">{project.id}</span>
                </div>

                <div className="border border-gray-200 h-full p-4 bg-[#fafafa] group-hover:bg-white transition-colors">
                  <div className="flex justify-between items-start border-b-2 border-black pb-2 mb-4">
                    <div>
                      <h3 className="text-2xl font-headline font-bold">{project.title}</h3>
                      <span className="font-mono text-xs text-gray-500">{project.date}</span>
                    </div>
                    {project.classified && (
                      <div className="border border-red-600 text-red-600 px-2 py-0.5 text-xs font-bold uppercase rotate-12">
                        Restricted
                      </div>
                    )}
                  </div>

                  <div className="relative aspect-video mb-4 overflow-hidden border border-gray-800 bg-gray-900">
                     <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  </div>

                  <p className="font-serif text-lg leading-snug mb-4 text-gray-800 line-clamp-3">
                     {project.description}
                  </p>

                  <div className="mb-6">
                    <h5 className="text-xs font-bold uppercase text-gray-500 mb-2">Forensic Traces:</h5>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="text-xs font-mono border-b border-gray-400 pb-0.5 text-gray-600">
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="block w-full bg-black text-white text-center py-3 font-bold uppercase group-hover:bg-red-700 transition-colors font-typewriter tracking-widest flex items-center justify-center gap-2">
                    <Search className="w-4 h-4" /> Open File
                  </button>
                </div>
                
                {/* Coffee Stain */}
                {index === 1 && (
                   <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border-[12px] border-amber-900/20 blur-[2px] pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Manifesto */}
        <section className="max-w-3xl mx-auto mb-24 relative">
          <div className="absolute inset-0 bg-paper transform rotate-1 shadow-cutout border border-gray-300 z-0"></div>
          <div className="relative z-10 p-8 md:p-12 border-2 border-dashed border-gray-800 bg-paper/80 backdrop-blur-sm">
             <h3 className="text-center font-headline text-4xl mb-6">THE MANIFESTO</h3>
             <p className="font-typewriter text-xl md:text-2xl leading-relaxed text-center text-gray-800">
               "I believe code should be as clean as a freshly wiped crime scene. Every variable accounts for something. Every function has a motive. In a world of chaos, logic is the only law."
             </p>
             <div className="mt-8 flex justify-center">
               <div className="font-handwriting text-3xl text-blue-900 transform -rotate-6 font-cursive" style={{fontFamily: 'cursive'}}>
                 - Kingsley Dev
               </div>
             </div>
          </div>
        </section>

        {/* Contact Footer */}
        <footer className="border-t-4 border-black pt-12 pb-8 relative bg-stone-200 torn-edge">
          <div className="container mx-auto px-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left: Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl font-headline mb-4 uppercase">Get In Touch</h2>
                  <p className="font-serif text-xl mb-6 max-w-md">
                    Have a lead on a new project? Or just want to compare notes? My lines are open.
                  </p>
                  
                  <div className="space-y-4">
                    <a href="mailto:hello@example.com" className="flex items-center gap-4 text-xl font-bold hover:text-red-700 transition-colors group">
                      <div className="bg-black text-white p-2 rounded-full group-hover:bg-red-700 transition-colors">
                        <Mail size={20} />
                      </div>
                      <span>hello@example.com</span>
                    </a>
                    <div className="flex gap-4 mt-6">
                      {[
                        { icon: Github, label: "Github" },
                        { icon: Linkedin, label: "LinkedIn" },
                        { icon: Twitter, label: "Twitter" }
                      ].map((Social, i) => (
                        <a key={i} href="#" className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                          <Social.icon className="w-6 h-6" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-4 border-double border-gray-400 bg-[#f4f1ea] transform rotate-1 max-w-sm">
                   <h5 className="font-bold font-typewriter uppercase mb-2 text-red-800 flex items-center gap-2">
                    <AlertCircle size={16} /> Urgent Memo
                   </h5>
                   <p className="font-mono text-sm text-gray-700">
                     My schedule is filling up fast. Priority is given to interesting problems and high-impact cases.
                   </p>
                </div>
              </div>

              {/* Right: Anonymous Tip Form */}
              <div className="relative">
                <AnonymousTipForm />
              </div>

            </div>
            
            <div className="mt-24 text-center border-t border-gray-400 pt-8 font-mono text-xs text-gray-600 flex justify-center items-center gap-2">
              <span>© {new Date().getFullYear()} THE DAILY DEVELOPER. ALL RIGHTS RESERVED.</span>
              <span>|</span>
              <span>PRINTED IN NIGERIA</span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;