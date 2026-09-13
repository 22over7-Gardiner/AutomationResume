import type { ComponentType } from 'react';
export type SectionId = 'about'|'experience'|'certifications'|'engineering'|'automation'|'contact';
export type IconType = ComponentType<{ className?: string }>;
export interface NavSection { id:SectionId; label:string; short:string; tagline:string; Icon:IconType; }
export interface ProjectEntry { title:string; category:string; summary:string; tags:string[]; }
export interface ExperienceEntry { role:string; company:string; location:string; period:string; summary:string; highlights:string[]; }
export interface Certification { name:string; issuer:string; year:string; status:'Certified'|'In progress'; }
export interface ContactLink { label:string; value:string; href:string; Icon:IconType; note?:string; planned?:boolean; }
