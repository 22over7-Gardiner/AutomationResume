import { User, Factory, Award, Cpu, Mail } from 'lucide-react';
import { RobotArmIcon } from './components/RobotArmIcon';
import type { NavSection } from './types';
export const SECTIONS: NavSection[] = [
 {id:'about',label:'About Me',short:'About',tagline:'Who I am',Icon:User},
 {id:'experience',label:'Experience',short:'Experience',tagline:'Where I have worked',Icon:Factory},
 {id:'certifications',label:'Certifications',short:'Certifications',tagline:'Training & credentials',Icon:Award},
 {id:'engineering',label:'Engineering',short:'Engineering',tagline:'Systems & process',Icon:Cpu},
 {id:'automation',label:'Automation',short:'Automation',tagline:'Robotics & vision',Icon:RobotArmIcon},
 {id:'contact',label:'Contact',short:'Contact',tagline:'Get in touch',Icon:Mail},
];
