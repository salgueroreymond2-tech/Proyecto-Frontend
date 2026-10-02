import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from './Icon';

export const GlobalTalkback: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesisSupported(true);
      
      const interval = setInterval(() => {
        setIsPlaying(window.speechSynthesis.speaking);
      }, 500);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const toggleTalkback = () => {
    if (!speechSynthesisSupported) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const mainContent = document.getElementById('main-content') || document.body;
    
    // Get all semantic sections
    const sections = Array.from(mainContent.querySelectorAll('header, nav, section, [role="region"], [role="navigation"]'));
    // If no sections found, treat main as one section
    if (sections.length === 0) sections.push(mainContent);

    // Get the current section to read based on index
    const sectionIndex = currentSectionIndex % sections.length;
    const currentSection = sections[sectionIndex];
    
    // Find interactive elements inside THIS section only
    const interactiveElements = currentSection.querySelectorAll('button, input, a[href]');
    const labels = Array.from(interactiveElements).map((el: any) => {
      if (el.tagName.toLowerCase() === 'input') return el.placeholder || el.name || 'Campo de entrada';
      return el.getAttribute('aria-label') || el.title || el.innerText || el.textContent;
    });

    const validLabels = labels
      .map(t => t ? t.trim() : '')
      .filter(t => t.length > 1 && !t.includes('http') && !t.includes('/'));

    const uniqueLabels = [...new Set(validLabels)];
    
    // Try to get a name for the section
    const sectionTitle = currentSection.querySelector('h1, h2, h3')?.textContent || currentSection.getAttribute('aria-label') || `Sección ${sectionIndex + 1}`;
    
    let textToRead = `En ${sectionTitle}, opciones: ` + (uniqueLabels.length > 0 ? uniqueLabels.join('. ') : 'Ninguna opción interactiva.');

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-ES';
    utterance.rate = 1.1;
    
    utterance.onend = () => {
      setIsPlaying(false);
      // Advance to next section for the next click
      setCurrentSectionIndex((prev) => prev + 1);
    };
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  if (!speechSynthesisSupported) return null;

  return (
    <button
      onClick={toggleTalkback}
      className={`fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-110 active:scale-95 border-2 ${
        isPlaying 
          ? 'bg-[#ecb1ff] text-black border-[#bf00ff] glow-purple animate-pulse' 
          : 'bg-[#140b16] text-[#00f0ff] border-[#00f0ff] glow-cyan-sm'
      }`}
      title={isPlaying ? 'Detener lectura en voz alta' : 'Leer opciones disponibles'}
      aria-label={isPlaying ? 'Detener lectura' : 'Leer opciones de la pantalla'}
    >
      {/* Swap Volume icons: if playing, show Volume2 (speaking), if stopped show VolumeX (muted) */}
      {isPlaying ? <Volume2 className="h-6 w-6" aria-hidden="true" /> : <VolumeX className="h-6 w-6" aria-hidden="true" />}
    </button>
  );
};
