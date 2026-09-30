import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as Icons from '../Icon';

describe('Icon Components', () => {
  it('renders Activity icon properly with material symbol', () => {
    const { container } = render(<Icons.Activity className="text-red-500" size={24} />);
    
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    
    // El texto interno (ligature) debe ser monitoring según iconNames
    expect(span).toHaveTextContent('monitoring');
    
    // Verifica que se aplica el className prop
    expect(span).toHaveClass('text-red-500');
    expect(span).toHaveClass('material-symbols-rounded');
    
    // Verifica el fontSize inline
    expect(span).toHaveStyle('font-size: 24px');
  });

  // Array dinámico de todos los íconos exportados en Icons
  const allIcons = Object.entries(Icons).filter(([key, value]) => typeof value === 'function');

  // vitest "describe.each" o "it.each" generará un test por cada ícono
  describe.each(allIcons)('Icon: %s', (iconName, IconComponent) => {
    it(`renders ${iconName} without crashing`, () => {
      const { container } = render(<IconComponent />);
      const span = container.querySelector('span');
      
      expect(span).toBeInTheDocument();
      expect(span).toHaveClass('material-symbols-rounded');
    });
  });
});
