import React, { useEffect, useState } from "react";
import { Activity, Bot, CheckCircle2, Database, FileBarChart, Code2, Mail, Menu, MonitorSmartphone, Network, ServerCog, ShieldCheck, X } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const layers = [
  [Database, "Manufacturing Data", "Synthetic equipment, process, and quality inputs."],
  [Network, "Connected Data Layer", "Validated data exchange between sources and services."],
  [Bot, "AI & Analytics", "Rules and AI-assisted interpretation generate technical insight."],
  [MonitorSmartphone, "Frontend Application", "Responsive views for status, trends, and exceptions."],
  [FileBarChart, "Automated Reporting", "Consistent summaries for technical and business audiences."]
];

const capabilities = [
  [ServerCog, "AI-enabled server", "A modular service concept for ingesting data, applying analytics, and returning structured results."],
  [MonitorSmartphone, "Frontend application", "A responsive engineering interface for status, trends, exceptions, and report outputs."],
  [FileBarChart, "Automated reporting", "A repeatable workflow that turns manufacturing information into a concise technical summary."]
];

function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => { fetch(`${import.meta.env.BASE_URL}data/process-trends.json`).then(r => r.json()).then(setData); }, []);
  const ActiveIcon = layers[active][0];
  return <main>
    <header>
      <a className="brand" href="#top"><span className="logo"><Activity size={20}/></span><span><b>DAVID GARDINER</b><small>Automation & Industry 4.0 Portfolio</small></span></a>
      <nav className={menu ? "open" : ""}>
        <a href="#project" onClick={()=>setMenu(false)}>Project</a><a href="#dashboard" onClick={()=>setMenu(false)}>Dashboard</a><a href="#architecture" onClick={()=>setMenu(false)}>Architecture</a><a href="#about" onClick={()=>setMenu(false)}>My Role</a>
      </nav>
      <button className="menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
    </header>

    <section id="top" className="hero wrap">
      <div><p className="eyebrow">CONNECTED MANUFACTURING PROOF OF CONCEPT</p><h1>Turning manufacturing data into <em>usable insight.</em></h1><p className="lead">A portfolio demonstration connecting an AI-enabled server, responsive frontend application, and automated reporting workflow into one Industry 4.0 concept.</p><div className="actions"><a className="primary" href="#project">Explore project</a><a className="secondary" href="#architecture">View architecture</a></div><p className="safe"><ShieldCheck size={17}/> Independent technical portfolio using synthetic data.</p></div>
      <div className="flow">{layers.slice(0,4).map(([Icon,title],i)=><React.Fragment key={title}><div className="flow-card"><Icon/><span>{title}</span><CheckCircle2 className="ok"/></div>{i<3&&<div className="line"/>}</React.Fragment>)}</div>
    </section>

    <section id="project" className="band"><div className="wrap"><p className="eyebrow">THE PROJECT</p><h2>One connected concept. Three portfolio capabilities.</h2><div className="grid3">{capabilities.map(([Icon,title,text])=><article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section id="dashboard" className="wrap section"><p className="eyebrow">SYNTHETIC DASHBOARD</p><h2>Example process visibility</h2><p className="intro">The chart below uses demonstration data only. It shows how a frontend can display process trends and support an AI-assisted summary.</p><div className="dashboard"><div className="chart"><ResponsiveContainer width="100%" height={300}><AreaChart data={data}><defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#67e8f9" stopOpacity={.5}/><stop offset="95%" stopColor="#67e8f9" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#24364b"/><XAxis dataKey="cycle" stroke="#94a3b8"/><YAxis stroke="#94a3b8"/><Tooltip contentStyle={{background:'#0b1827',border:'1px solid #26364a'}}/><Area type="monotone" dataKey="processIndex" stroke="#67e8f9" fill="url(#c)"/></AreaChart></ResponsiveContainer></div><div className="analysis"><Bot/><h3>Example AI summary</h3><p>Process performance remains stable across the demonstration window. The latest cycles show a modest upward trend with no simulated exception threshold crossed.</p><small>Pre-generated example. No live AI credentials are stored in this site.</small></div></div></section>

    <section id="architecture" className="band"><div className="wrap"><p className="eyebrow">SYSTEM ARCHITECTURE</p><h2>From source signal to decision support.</h2><div className="architecture"><div className="layer-list">{layers.map(([Icon,title],i)=><button className={active===i?"active":""} onClick={()=>setActive(i)} key={title}><Icon/><span>{String(i+1).padStart(2,'0')} · {title}</span></button>)}</div><div className="layer-detail"><ActiveIcon/><h3>{layers[active][1]}</h3><p>{layers[active][2]}</p><div className="notice"><ShieldCheck/> Portfolio-safe design using synthetic or anonymized information.</div></div></div></div></section>

    <section id="about" className="wrap section"><p className="eyebrow">MY CONTRIBUTION</p><h2>Technical leadership across the workflow.</h2><div className="grid2"><article><h3>Concept development</h3><p>Translate a manufacturing opportunity into a focused proof-of-concept scope and learning plan.</p></article><article><h3>System integration</h3><p>Connect data, server services, application workflows, visualization, and report outputs.</p></article><article><h3>User-centered design</h3><p>Present technical information clearly for engineering and operational audiences.</p></article><article><h3>Technical communication</h3><p>Explain architecture, assumptions, limitations, manufacturing value, and next steps.</p></article></div></section>

    <section className="contact wrap"><div><p className="eyebrow dark">PORTFOLIO CONVERSATION</p><h2>Discuss the path from prototype to scalable manufacturing capability.</h2></div><div className="contact-actions"><a href="mailto:David.Gardiner@nike.com"><Mail/> Email David</a><a href="https://github.com/22over7-Gardiner/AutomationResume" target="_blank" rel="noreferrer"><Code2/> View repository</a></div></section>
    <footer>© 2026 David Gardiner · No proprietary manufacturing data is displayed.</footer>
  </main>
}
export default App;
