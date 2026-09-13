import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SECTIONS } from '../navigation';
import type { SectionId } from '../types';
import { LandingPage } from './LandingPage';
import { SectionHeader } from './SectionHeader';
import { MobileMenu } from './MobileMenu';
import { AboutPage } from './AboutPage';
import { ExperiencePage } from './ExperiencePage';
import { CertificationsPage } from './CertificationsPage';
import { EngineeringPage } from './EngineeringPage';
import { AutomationPage } from './AutomationPage';
import { ContactPage } from './ContactPage';

function renderSection(id: SectionId): React.ReactElement {
  switch (id) {
    case 'about': return <AboutPage />;
    case 'experience': return <ExperiencePage />;
    case 'certifications': return <CertificationsPage />;
    case 'engineering': return <EngineeringPage />;
    case 'automation': return <AutomationPage />;
    case 'contact': return <ContactPage />;
  }
}
function initialTheme(): 'light'|'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function AppShell(): React.ReactElement {
  const [active,setActive]=React.useState<SectionId|null>(null);
  const [menuOpen,setMenuOpen]=React.useState(false);
  const [theme,setTheme]=React.useState<'light'|'dark'>(initialTheme);
  const reduce=useReducedMotion();
  React.useEffect(()=>{document.documentElement.classList.toggle('dark',theme==='dark');},[theme]);
  const goHome=()=>{setMenuOpen(false);setActive(null)};
  const goTo=(id:SectionId)=>{setMenuOpen(false);setActive(id)};
  const current=active?SECTIONS.find(s=>s.id===active)!:null;
  const fade=reduce?{initial:{opacity:1},animate:{opacity:1},exit:{opacity:1}}:{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8}};
  return <div className="flex h-full min-h-screen flex-col bg-background text-foreground">
    <AnimatePresence mode="wait" initial={false}>
      {current===null?<motion.div key="landing" className="flex min-h-screen flex-col" {...fade} transition={{duration:reduce?0:.25}}><LandingPage onSelect={goTo} theme={theme} onToggleTheme={()=>setTheme(t=>t==='dark'?'light':'dark')}/></motion.div>:
      <motion.div key={current.id} className="flex min-h-screen flex-col" {...fade} transition={{duration:reduce?0:.25}}><SectionHeader section={current} menuOpen={menuOpen} theme={theme} onBack={goHome} onToggleMenu={()=>setMenuOpen(v=>!v)} onToggleTheme={()=>setTheme(t=>t==='dark'?'light':'dark')}/><main className="min-h-0 flex-1 overflow-y-auto" tabIndex={0}>{renderSection(current.id)}</main></motion.div>}
    </AnimatePresence>
    <MobileMenu open={menuOpen} current={current?.id??'about'} onClose={()=>setMenuOpen(false)} onNavigate={goTo}/>
  </div>;
}
