import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TeamBadge } from '../TeamBadge';

// Mock de getTeamById para no depender de la lista real de equipos
import * as teamsData from '../../data/teams';

describe('TeamBadge Component', () => {
  it('renders nothing when no team or teamId is provided', () => {
    const { container } = render(<TeamBadge />);
    expect(container.firstChild).toBeNull();
  });

  it('renders an image when team logoUrl is provided', () => {
    const mockTeam = {
      id: 'test-team',
      name: 'Test Team',
      shortName: 'TST',
      code: 'TST',
      city: 'Test City',
      logoUrl: 'https://test.com/logo.png',
      stadium: 'Test Stadium',
      founded: 2000,
    };

    render(<TeamBadge team={mockTeam} size="lg" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://test.com/logo.png');
    expect(img).toHaveAttribute('alt', 'Test Team');
  });

  it('renders svg crest for Saprissa (sap) without logoUrl', () => {
    const sapTeam = {
      id: 'sap',
      name: 'Saprissa',
      shortName: 'SAP',
      code: 'SAP',
      city: 'Tibás',
      stadium: 'Saprissa',
      founded: 1935,
    };

    const { container } = render(<TeamBadge team={sapTeam} glow={true} />);
    
    // Debería renderizar un svg
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Verifica que el texto Saprissa esté en el SVG
    expect(screen.getByText('DEPORTIVO SAPRISSA')).toBeInTheDocument();
  });
});
