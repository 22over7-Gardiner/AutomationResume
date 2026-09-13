import React from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import {
  Pencil,
  Check,
  RotateCw,
  Bot,
  Workflow,
  ScanLine,
  Gauge,
  Database,
  TrendingUp,
  Code2,
  Package,
  Calculator,
  Cpu,
  Wrench,
  Wifi,
  Radar,
  Eye,
  ScanSearch,
  Barcode,
  Network,
  LayoutDashboard,
  BellRing,
  Table2,
  BarChart3,
  ClipboardList,
  GitBranch,
  Sparkles,
  Recycle,
  Factory,
  Rocket,
} from 'lucide-react';

const BOX = 24;
const FLOOR = 205;
const BELT_TOP = 150;

const BOX_FLOOR = { x: 84, y: FLOOR - BOX };
const BOX_BELT = { x: 118, y: BELT_TOP - BOX };
const BOX_SCAN = { x: 190, y: BELT_TOP - BOX };
const BOX_EXIT = { x: 450, y: BELT_TOP - BOX };

const SHO = { x: 50, y: 188 };
const L1 = 52;
const L2 = 52;
const TIP_NEUTRAL = { x: 34, y: 124 };
const TIP_GRAB = { x: 96, y: 181 };
const TIP_BELT = { x: 130, y: 126 };

type ObjKey = 'robot' | 'conveyor' | 'scanner' | 'monitor' | 'server' | 'tv';

const OBJECTS: Record<ObjKey, { title: string; eyebrow: string; bullets: string[] }> = {
  robot: {
    title: 'Robotics',
    eyebrow: 'Industrial automation',
    bullets: [
      'Denso & ABB 6-axis robots',
      'Programming in WinCaps III & RobotStudio',
      'Robot cell integration & teach/path programming',
      'Pick-and-place & material handling',
      'RPA feasibility & ROI analysis',
    ],
  },
  conveyor: {
    title: 'Conveyor & Connectivity',
    eyebrow: 'Controls & IIoT',
    bullets: [
      'PLC logic & line controls',
      'Pneumatic, hydraulic & electromechanical systems',
      'Automated conveyor troubleshooting',
      'IoT / IIoT device connectivity',
      'Value-stream tracking (VST) & sensor integration',
    ],
  },
  scanner: {
    title: 'Machine Vision',
    eyebrow: 'Inspection & traceability',
    bullets: [
      'Cognex machine-vision systems',
      'Automated inspection & defect detection',
      'Barcode / traceability & data capture',
      'Vision-guided robotics',
      'Intranet data integration',
    ],
  },
  monitor: {
    title: 'HMI & SCADA',
    eyebrow: 'Operator interfaces',
    bullets: [
      'HMI design & operator interfaces',
      'SCADA monitoring & alarm management',
      'Real-time production dashboards (OEE)',
      'SAP, Smartsheet, Wrike, JMP & Excel',
      'Data visualization & reporting',
    ],
  },
  server: {
    title: 'Data & Backend',
    eyebrow: 'Infrastructure',
    bullets: [
      'SQL databases & data pipelines',
      'Automated data collection & reporting',
      'Octoplant automated backup & revision control',
      'Version control for controls code',
      'Applied AI tools for analysis',
    ],
  },
  tv: {
    title: 'Metrics & Industry 4.0',
    eyebrow: 'Continuous improvement',
    bullets: [
      'KPIs & OEE improvement metrics',
      'Lean & Six Sigma continuous improvement',
      'Throughput & cycle-time gains (proof of concept)',
      'Industry 4.0 / IIoT architecture',
      'Digital transformation roadmaps',
    ],
  },
};

const ICONS: Record<ObjKey, React.ComponentType<{ className?: string }>> = {
  robot: Bot,
  conveyor: Workflow,
  scanner: ScanLine,
  monitor: Gauge,
  server: Database,
  tv: TrendingUp,
};

type IconType = React.ComponentType<{ className?: string }>;

function iconForBullet(text: string): IconType {
  const t = text.toLowerCase();
  const has = (s: string) => t.includes(s);
  if (has('sql') || has('database')) return Database;
  if (has('octoplant') || has('backup') || has('revision') || has('version control')) return GitBranch;
  if (has('barcode') || has('traceability')) return Barcode;
  if (has('inspection') || has('defect')) return ScanSearch;
  if (has('cognex') || has('vision')) return Eye;
  if (has('industry 4.0')) return Factory;
  if (has('rpa') || has('roi') || has('feasibility')) return Calculator;
  if (has('wincaps') || has('robotstudio') || has('programming') || has('code')) return Code2;
  if (has('denso') || has('abb') || has('robot')) return Bot;
  if (has('pick-and-place') || has('material handling') || has('handling')) return Package;
  if (has('plc')) return Cpu;
  if (has('pneumatic') || has('hydraulic') || has('electromechanical') || has('troubleshoot')) return Wrench;
  if (has('iot') || has('iiot') || has('connectivity')) return Wifi;
  if (has('sensor') || has('vst') || has('value-stream')) return Radar;
  if (has('hmi') || has('interface')) return LayoutDashboard;
  if (has('scada') || has('alarm')) return BellRing;
  if (has('dashboard')) return LayoutDashboard;
  if (has('sap') || has('excel') || has('smartsheet') || has('jmp') || has('wrike')) return Table2;
  if (has('data collection')) return ClipboardList;
  if (has('visualization') || has('chart') || has('report')) return BarChart3;
  if (/\bai\b/.test(t) || has('artificial')) return Sparkles;
  if (has('intranet') || has('network') || has('integration')) return Network;
  if (has('kpi') || has('oee') || has('metric')) return Gauge;
  if (has('lean') || has('six sigma') || has('continuous improvement')) return Recycle;
  if (has('throughput') || has('cycle')) return TrendingUp;
  if (has('transformation') || has('roadmap')) return Rocket;
  return Check;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function elbowPoint(tx: number, ty: number): { x: number; y: number } {
  const dx = tx - SHO.x;
  const dy = ty - SHO.y;
  let d = Math.hypot(dx, dy);
  d = Math.max(0.001, Math.min(d, L1 + L2 - 0.001));
  const ux = dx / d;
  const uy = dy / d;
  const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
  const mx = SHO.x + a * ux;
  const my = SHO.y + a * uy;
  return { x: mx + h * uy, y: my - h * ux };
}

function initialContent(): Record<ObjKey, string[]> {
  return Object.fromEntries(
    (Object.keys(OBJECTS) as ObjKey[]).map((k) => [k, [...OBJECTS[k].bullets]]),
  ) as Record<ObjKey, string[]>;
}

function loadBest(): number | null {
  try {
    const v = localStorage.getItem('automation-best');
    return v ? Number(v) : null;
  } catch {
    return null;
  }
}

function detectRotatePhase(): 'rotate' | 'ready' {
  if (typeof window === 'undefined') return 'ready';
  const portrait = window.matchMedia('(orientation: portrait)').matches;
  const small = window.matchMedia('(max-width: 900px)').matches;
  return portrait && small ? 'rotate' : 'ready';
}

function Obj({
  label,
  onSelect,
  children,
}: {
  label: string;
  onSelect: () => void;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <g
      role="button"
      aria-label={label}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{ cursor: 'pointer', outline: 'none', pointerEvents: 'auto' }}
    >
      {children}
    </g>
  );
}

export function AutomationScene(): React.ReactElement {
  const reduce = useReducedMotion();
  const dscale = reduce ? 0.15 : 1;

  const [step, setStep] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [beam, setBeam] = React.useState(false);
  const [monitorOn, setMonitorOn] = React.useState(false);
  const [wifi, setWifi] = React.useState(false);
  const [tvOn, setTvOn] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [best, setBest] = React.useState<number | null>(loadBest);

  const [content, setContent] = React.useState<Record<ObjKey, string[]>>(initialContent);
  const [selected, setSelected] = React.useState<ObjKey | null>(null);
  const [focus, setFocus] = React.useState<ObjKey | null>(null);
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const [size, setSize] = React.useState({ w: 340, h: 256 });
  const [phase, setPhase] = React.useState<'rotate' | 'flash' | 'ready'>(detectRotatePhase);

  const scoreRef = React.useRef(0);
  scoreRef.current = score;
  const bestRef = React.useRef(best);
  bestRef.current = best;
  const countRef = React.useRef(0);
  countRef.current = count;
  const boxStartRef = React.useRef(Date.now());
  const phaseRef = React.useRef(phase);
  phaseRef.current = phase;
  const sizeRef = React.useRef(size);
  sizeRef.current = size;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const userResizedRef = React.useRef(false);

  const boxX = useMotionValue(BOX_FLOOR.x);
  const boxY = useMotionValue(BOX_FLOOR.y);
  const tipX = useMotionValue(TIP_NEUTRAL.x);
  const tipY = useMotionValue(TIP_NEUTRAL.y);
  const elbowX = useTransform([tipX, tipY], ([tx, ty]: number[]) => elbowPoint(tx, ty).x);
  const elbowY = useTransform([tipX, tipY], ([tx, ty]: number[]) => elbowPoint(tx, ty).y);

  const scanP = useMotionValue(0);
  const scanLX = useTransform(scanP, [0, 0.5, 1], [214, 224, 230]);
  const scanLY = useTransform(scanP, [0, 0.5, 1], [116, 141, 137]);
  const scanLO = useTransform(scanP, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const serverP = useMotionValue(0);
  const srvLX = useTransform(serverP, [0, 0.5, 1], [284, 298, 314]);
  const srvLY = useTransform(serverP, [0, 0.5, 1], [143, 151, 150]);
  const srvLO = useTransform(serverP, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const palletX = useMotionValue(-160);
  const palletO = useMotionValue(0);

  const run = (mv: any, to: any, opts: any) => (animate(mv, to, opts) as any).finished;

  React.useEffect(() => {
    const land = window.matchMedia('(orientation: landscape)');
    const onChange = () => {
      if (phaseRef.current === 'rotate' && land.matches) {
        setPhase('flash');
        window.setTimeout(() => setPhase('ready'), 1000);
      }
    };
    land.addEventListener('change', onChange);
    return () => land.removeEventListener('change', onChange);
  }, []);

  // Default the panel width so its right edge reaches the monitor's first third
  // (the HMI screen spans viewBox x 234–278 within a 420-wide scene).
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const HMI_FIRST_THIRD = (234 + 44 / 3) / 420;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const w = e.contentRect.width;
        if (w > 0 && !userResizedRef.current) {
          const targetW = clamp(Math.round(HMI_FIRST_THIRD * w - 12), 200, Math.round(w - 24));
          const targetH = clamp(Math.round(targetW * 0.62), 190, 340);
          setSize({ w: targetW, h: targetH });
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ---- skills panel ----
  const applyDraft = (key: ObjKey, text: string) => {
    setContent((prev) => ({
      ...prev,
      [key]: text
        .split('\n')
        .map((s) => s.replace(/^[-•\s]+/, '').trim())
        .filter(Boolean),
    }));
  };
  const select = (key: ObjKey) => {
    if (editing && selected) applyDraft(selected, draft);
    setEditing(false);
    setSelected(key);
    setFocus(key);
  };
  const startEdit = () => {
    if (!selected) return;
    setDraft(content[selected].join('\n'));
    setEditing(true);
  };
  const saveEdit = () => {
    if (selected) applyDraft(selected, draft);
    setEditing(false);
  };
  const onResizeDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    userResizedRef.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const { w, h } = sizeRef.current;
    const move = (ev: PointerEvent) => {
      setSize({ w: clamp(w + ev.clientX - startX, 190, 520), h: clamp(h + ev.clientY - startY, 130, 420) });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  // ---- line animation steps ----
  const doPick = async () => {
    setBusy(true);
    boxStartRef.current = Date.now();
    await Promise.all([
      run(tipX, TIP_GRAB.x, { duration: 0.55 * dscale, ease: 'easeInOut' }),
      run(tipY, TIP_GRAB.y, { duration: 0.55 * dscale, ease: 'easeInOut' }),
    ]);
    select('robot');
    await wait(120 * dscale + 30);
    await Promise.all([
      run(tipX, [TIP_GRAB.x, 112, TIP_BELT.x], { duration: 1.0 * dscale, times: [0, 0.5, 1], ease: 'easeInOut' }),
      run(tipY, [TIP_GRAB.y, 106, TIP_BELT.y], { duration: 1.0 * dscale, times: [0, 0.5, 1], ease: 'easeInOut' }),
      run(boxX, [BOX_FLOOR.x, 100, BOX_BELT.x], { duration: 1.0 * dscale, times: [0, 0.5, 1], ease: 'easeInOut' }),
      run(boxY, [BOX_FLOOR.y, 106, BOX_BELT.y], { duration: 1.0 * dscale, times: [0, 0.5, 1], ease: 'easeInOut' }),
    ]);
    await wait(120 * dscale + 30);
    await Promise.all([
      run(tipX, TIP_NEUTRAL.x, { duration: 0.6 * dscale, ease: 'easeInOut' }),
      run(tipY, TIP_NEUTRAL.y, { duration: 0.6 * dscale, ease: 'easeInOut' }),
    ]);
    setStep(1);
    setBusy(false);
  };

  const doConvey = async () => {
    setBusy(true);
    select('conveyor');
    await run(boxX, BOX_SCAN.x, { duration: 1.3 * dscale, ease: 'linear' });
    setStep(2);
    setBusy(false);
  };

  const doScan = async () => {
    setBusy(true);
    select('scanner');
    setBeam(true);
    await wait(650 * dscale + 80);
    setBeam(false);
    setCount((c) => c + 1);
    await run(scanP, 1, { duration: 1.7 * dscale, ease: 'linear' });
    scanP.set(0);
    setMonitorOn(true);
    setStep(3);
    setBusy(false);
  };

  const doMonitor = async () => {
    setBusy(true);
    select('monitor');
    await Promise.all([
      run(boxX, BOX_EXIT.x, { duration: 3.0 * dscale, ease: 'linear' }),
      run(serverP, 1, { duration: 1.9 * dscale, ease: 'linear' }),
    ]);
    serverP.set(0);
    // a box has gone through — add the seconds it took × the number of boxes through
    const secs = Math.max(1, Math.round((Date.now() - boxStartRef.current) / 1000));
    const ns = scoreRef.current + secs * countRef.current;
    setScore(ns);
    const nb = Math.max(bestRef.current ?? 0, ns);
    setBest(nb);
    try {
      localStorage.setItem('automation-best', String(nb));
    } catch {
      /* ignore */
    }
    setStep(4);
    setBusy(false);
  };

  const doServer = async () => {
    setBusy(true);
    select('server');
    setWifi(true);
    setTvOn(true); // stays on from now on
    await wait(700 * dscale + 120);
    setStep(5);
    setBusy(false);
  };

  const doNext = async () => {
    setBusy(true);
    select('tv');
    palletO.set(1);
    await run(palletX, 0, { duration: 0.9 * dscale, ease: 'easeOut' });
    boxX.set(BOX_FLOOR.x);
    boxY.set(BOX_FLOOR.y);
    setMonitorOn(false);
    await wait(280 * dscale + 60);
    await run(palletX, -160, { duration: 0.9 * dscale, ease: 'easeIn' });
    palletO.set(0);
    setStep(0);
    setBusy(false);
  };

  const act = (objKey: 'robot' | 'box' | ObjKey) => {
    const infoKey: ObjKey = objKey === 'box' ? 'conveyor' : objKey;
    setFocus(infoKey);
    const active =
      !busy &&
      ((step === 0 && (objKey === 'robot' || objKey === 'box')) ||
        (step === 1 && (objKey === 'conveyor' || objKey === 'box')) ||
        (step === 2 && objKey === 'scanner') ||
        (step === 3 && objKey === 'monitor') ||
        (step === 4 && objKey === 'server') ||
        (step === 5 && objKey === 'tv'));
    // Out-of-order (explore) clicks open the panel immediately. For the active
    // step, the panel is revealed from inside the animation sequence instead.
    if (!active) {
      select(infoKey);
      return;
    }
    if (step === 0) doPick();
    else if (step === 1) doConvey();
    else if (step === 2) doScan();
    else if (step === 3) doMonitor();
    else if (step === 4) doServer();
    else if (step === 5) doNext();
  };

  const isNext = (k: 'robot' | 'box' | ObjKey): boolean => {
    if (busy) return false;
    switch (step) {
      case 0:
        return k === 'robot' || k === 'box';
      case 1:
        return k === 'conveyor' || k === 'box';
      case 2:
        return k === 'scanner';
      case 3:
        return k === 'monitor';
      case 4:
        return k === 'server';
      case 5:
        return k === 'tv';
      default:
        return false;
    }
  };
  const sel = (k: 'robot' | 'box' | ObjKey) => (isNext(k) ? 'stroke-primary' : 'stroke-foreground');

  return (
    <div
      ref={containerRef}
      className="relative aspect-[420/240] w-full overflow-hidden rounded-lg border border-border bg-surface"
    >
      <svg
        viewBox="0 0 420 240"
        className="absolute inset-0 z-20 h-full w-full"
                role="img"
        aria-label="Automation line — click each machine"
      >
        <line x1="0" y1={FLOOR} x2="420" y2={FLOOR} className="stroke-border" strokeWidth={2} />

        {/* TV */}
        <Obj label="TV — send next box / metrics" onSelect={() => act('tv')}>
          <g>
            <rect x="300" y="24" width="104" height="66" rx="4" className={`fill-surfaceAlt ${sel('tv')}`} strokeWidth={2} />
            <rect x="306" y="30" width="92" height="54" rx="2" className={tvOn ? 'fill-background' : 'fill-surfaceAlt'} stroke="none" />
            {tvOn && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 * dscale }}>
                <text x="309" y="41" className="fill-foreground" fontSize="8" fontWeight="700">
                  Best {best == null ? '—' : best} · Score {score}
                </text>
                <circle cx="317" cy="69" r="8" className="fill-none stroke-foregroundMuted" strokeWidth={2} />
                <path d="M317 69 L317 61 A8 8 0 0 1 324 72 Z" className="fill-primary" stroke="none" />
                <polyline points="336,55 348,49 360,55 374,47" className="fill-none stroke-primary" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                <rect x="340" y="73" width="7" height="8" className="fill-foregroundMuted" stroke="none" />
                <rect x="351" y="69" width="7" height="12" className="fill-foregroundMuted" stroke="none" />
                <rect x="362" y="64" width="7" height="17" className="fill-foregroundMuted" stroke="none" />
                <rect x="373" y="71" width="7" height="10" className="fill-foregroundMuted" stroke="none" />
              </motion.g>
            )}
            <rect x="346" y="90" width="12" height="6" className="fill-foreground" stroke="none" />
          </g>
        </Obj>

        {/* Conveyor */}
        <Obj label="Conveyor — connectivity" onSelect={() => act('conveyor')}>
          <g>
            <rect x="108" y={BELT_TOP} width="384" height="16" rx="8" className={`fill-surfaceAlt ${sel('conveyor')}`} strokeWidth={2} />
            <circle cx="120" cy={BELT_TOP + 8} r="6" className={`fill-surface ${sel('conveyor')}`} strokeWidth={2} />
            <circle cx="150" cy={BELT_TOP + 8} r="6" className={`fill-surface ${sel('conveyor')}`} strokeWidth={2} />
            <circle cx="180" cy={BELT_TOP + 8} r="6" className={`fill-surface ${sel('conveyor')}`} strokeWidth={2} />
            <line x1="140" y1={BELT_TOP + 16} x2="140" y2={FLOOR} className={sel('conveyor')} strokeWidth={2} />
            <line x1="360" y1={BELT_TOP + 16} x2="360" y2={FLOOR} className={sel('conveyor')} strokeWidth={2} />
          </g>
        </Obj>

        {/* Box */}
        <Obj label="Box — connectivity" onSelect={() => act('box')}>
          <motion.g style={{ x: boxX, y: boxY }}>
            <rect width={BOX} height={BOX} rx="3" className={`fill-surface ${sel('box')}`} strokeWidth={2} />
            <path d={`M0 7 H${BOX} M12 0 V${BOX}`} className="stroke-foregroundMuted" strokeWidth={1.5} opacity={0.55} />
          </motion.g>
        </Obj>

        {/* Monitor */}
        <Obj label="Monitor — HMI & SCADA" onSelect={() => act('monitor')}>
          <g>
            <rect x="240" y="176" width="30" height="3" rx="1" className="fill-foreground" stroke="none" />
            <line x1="255" y1="156" x2="255" y2="176" className="stroke-foreground" strokeWidth={3} />
            <rect x="230" y="118" width="52" height="38" rx="3" className={`fill-surface ${sel('monitor')}`} strokeWidth={2} />
            <rect x="234" y="122" width="44" height="30" rx="2" className={monitorOn ? 'fill-background' : 'fill-surfaceAlt'} stroke="none" />
            {monitorOn ? (
              <motion.g
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 * dscale }}
                style={{ transformOrigin: '256px 137px', transformBox: 'view-box' } as any}
              >
                <rect x="238" y="128" width="18" height="18" rx="2" className="fill-surface stroke-primary" strokeWidth={2} />
                <path d="M238 133 H256 M247 128 V146" className="stroke-foregroundMuted" strokeWidth={1.5} opacity={0.6} />
                <text x="262" y="142" className="fill-foreground" fontSize="12" fontWeight="700">#{count}</text>
              </motion.g>
            ) : (
              <path d="M240 145 H274 M240 138 H274 M240 131 H262" className="stroke-foregroundMuted" strokeWidth={1.5} opacity={0.5} />
            )}
          </g>
        </Obj>

        {/* Server */}
        <Obj label="Server stack — data & backend" onSelect={() => act('server')}>
          <g>
            <rect x="312" y="116" width="40" height="86" rx="3" className={`fill-surface ${sel('server')}`} strokeWidth={2} />
            {[126, 142, 158, 174].map((y) => (
              <g key={y}>
                <rect x="318" y={y} width="28" height="10" rx="1.5" className="fill-surfaceAlt stroke-foreground" strokeWidth={1.5} />
                <circle cx="322" cy={y + 5} r="1.6" className={tvOn ? 'fill-primary' : 'fill-foregroundMuted'} stroke="none" />
              </g>
            ))}
            <rect x="318" y="190" width="28" height="6" rx="1.5" className="fill-surfaceAlt stroke-foreground" strokeWidth={1.5} />
          </g>
        </Obj>

        {/* Wi-Fi */}
        {wifi && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.1 * dscale, repeat: Infinity }}>
            <circle cx="332" cy="110" r="1.8" className="fill-primary" stroke="none" />
            <path d="M327 106 A5.5 5.5 0 0 1 337 106" className="fill-none stroke-primary" strokeWidth={2} strokeLinecap="round" />
            <path d="M322 102 A11 11 0 0 1 342 102" className="fill-none stroke-primary" strokeWidth={2} strokeLinecap="round" />
          </motion.g>
        )}

        {/* Wires */}
        <path d="M214 116 C 214 133, 226 143, 230 137" className="fill-none stroke-border" strokeWidth={2} />
        <path d="M282 143 C 294 151, 304 152, 314 150" className="fill-none stroke-border" strokeWidth={2} />

        {/* Scanner */}
        <Obj label="Barcode scanner — vision systems" onSelect={() => act('scanner')}>
          <g>
            <line x1="202" y1="116" x2="202" y2={BELT_TOP} className="stroke-foreground" strokeWidth={2} />
            <rect x="185" y="96" width="34" height="20" rx="3" className={`fill-surface ${sel('scanner')}`} strokeWidth={2} />
            <line x1="191" y1="106" x2="213" y2="106" className="stroke-foregroundMuted" strokeWidth={2} />
          </g>
        </Obj>

        {beam && (
          <path
            d={`M196 116 L${BOX_SCAN.x} ${BOX_SCAN.y} L${BOX_SCAN.x + BOX} ${BOX_SCAN.y} L208 116 Z`}
            className="fill-primary"
            stroke="none"
            opacity={0.4}
          />
        )}

        {/* Robot arm */}
        <Obj label="Robot arm — robotics" onSelect={() => act('robot')}>
          <g>
            <path d="M32 205 L38 186 H62 L68 205 Z" className={`fill-surface ${sel('robot')}`} strokeWidth={2} />
            <motion.line x1={SHO.x} y1={SHO.y} x2={elbowX} y2={elbowY} className={sel('robot')} strokeWidth={6} strokeLinecap="round" />
            <motion.line x1={elbowX} y1={elbowY} x2={tipX} y2={tipY} className={sel('robot')} strokeWidth={6} strokeLinecap="round" />
            <circle cx={SHO.x} cy={SHO.y} r="5" className={`fill-surface ${sel('robot')}`} strokeWidth={2} />
            <motion.circle cx={elbowX} cy={elbowY} r="4" className={`fill-surface ${sel('robot')}`} strokeWidth={2} />
            <motion.g style={{ x: tipX, y: tipY }}>
              <path d="M-4 -2 L-2 5 M4 -2 L2 5" className={sel('robot')} strokeWidth={2.5} strokeLinecap="round" />
              <circle cx="0" cy="0" r="3" className={`fill-surface ${sel('robot')}`} strokeWidth={2} />
            </motion.g>
          </g>
        </Obj>

        {/* Travelling lights */}
        <motion.g style={{ x: scanLX, y: scanLY, opacity: scanLO }}>
          <circle r="8" className="fill-primary" stroke="none" opacity={0.25} />
          <circle r="4" className="fill-primary" stroke="none" />
        </motion.g>
        <motion.g style={{ x: srvLX, y: srvLY, opacity: srvLO }}>
          <circle r="8" className="fill-primary" stroke="none" opacity={0.25} />
          <circle r="4" className="fill-primary" stroke="none" />
        </motion.g>

        {/* Reset pallet */}
        <motion.g style={{ x: palletX, opacity: palletO }}>
          <rect x="58" y="192" width="34" height="13" rx="2" className="fill-surface stroke-foreground" strokeWidth={2} />
          <circle cx="66" cy="207" r="4" className="fill-surfaceAlt stroke-foreground" strokeWidth={2} />
          <circle cx="84" cy="207" r="4" className="fill-surfaceAlt stroke-foreground" strokeWidth={2} />
          <rect x="66" y="180" width="18" height="14" rx="2" className="fill-surface stroke-foreground" strokeWidth={2} />
        </motion.g>
      </svg>

      {/* Prompt before anything selected */}
      {focus === null && phase === 'ready' && (
        <div className="pointer-events-none absolute left-[36%] top-[24%] z-10 w-[62%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
            Click the Robot to learn about David’s automation skillset
          </p>
        </div>
      )}

      {/* Floating skills panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
            animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
            exit={{ scaleX: 0, scaleY: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top left', width: size.w, height: size.h }}
            className="absolute left-3 top-3 z-10 flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surfaceAlt px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-primary ring-1 ring-border">
                  {React.createElement(ICONS[selected], { className: 'h-4 w-4' })}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foregroundMuted">
                    {OBJECTS[selected].eyebrow}
                  </span>
                  <span className="truncate font-display text-base font-semibold leading-tight tracking-tight text-foreground">
                    {OBJECTS[selected].title}
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={editing ? saveEdit : startEdit}
                aria-label={editing ? 'Save skills' : 'Edit skills'}
                className="flex h-8 w-8 min-h-[32px] min-w-[32px] shrink-0 items-center justify-center rounded-full text-foregroundMuted outline-none transition-colors hover:bg-surface hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
              >
                {editing ? <Check className="h-4 w-4" aria-hidden="true" /> : <Pencil className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4" tabIndex={0}>
              {editing ? (
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  autoFocus
                  spellCheck={false}
                  aria-label="Edit skills, one per line"
                  className="h-full w-full resize-none rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="One skill per line"
                />
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {content[selected].map((item, i) => (
                    <li key={`${item}-${i}`} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-surfaceAlt text-primary">
                        {React.createElement(iconForBullet(item), { className: 'h-3.5 w-3.5' })}
                      </span>
                      <span className="text-sm leading-snug text-foreground">{item}</span>
                    </li>
                  ))}
                  {content[selected].length === 0 && (
                    <li className="text-sm text-foregroundMuted">No skills yet — tap the pencil to add some.</li>
                  )}
                </ul>
              )}
            </div>
            <div
              onPointerDown={onResizeDown}
              aria-hidden="true"
              className="absolute bottom-0 right-0 flex h-5 w-5 cursor-nwse-resize items-end justify-end p-1"
            >
              <svg viewBox="0 0 10 10" className="h-3 w-3 text-foregroundMuted">
                <path d="M9 1 L1 9 M9 5 L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile rotate prompt */}
      {phase === 'rotate' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
          <motion.div
            animate={reduce ? {} : { rotate: [0, 0, -90, -90, 0] }}
            transition={{ duration: 2.6, times: [0, 0.25, 0.55, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'center' }}
          >
            <svg viewBox="0 0 48 72" className="h-20 w-20 text-primary" aria-hidden="true">
              <rect x="10" y="4" width="28" height="64" rx="5" className="fill-surface stroke-current" strokeWidth={3} />
              <line x1="20" y1="61" x2="28" y2="61" className="stroke-current" strokeWidth={3} strokeLinecap="round" />
            </svg>
          </motion.div>
          <div className="flex items-center gap-2 text-foreground">
            <RotateCw className="h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-display text-base font-semibold">Rotate your device to landscape</p>
          </div>
          <p className="max-w-xs text-sm text-foregroundMuted">The automation line is best explored sideways.</p>
        </div>
      )}

      {/* Poka-yoke flash */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, times: [0, 0.2, 0.7, 1] }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-primary"
          >
            <span className="font-display text-2xl font-semibold tracking-tight text-accentForeground sm:text-3xl">
              Poka-yoke
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
