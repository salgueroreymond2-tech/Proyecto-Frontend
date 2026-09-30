import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../Navbar';

// Mock del context porque el Navbar usa useTournament (asumiendo que está exportado o se puede mockear)
vi.mock('../../context/TournamentContext', () => ({
  useTournament: () => ({
    isLoggedIn: false,
    currentUser: null,
  })
}));

describe('Navbar Component', () => {
  it('renders KAS logo text', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    // Verifica que el logo 'KAS' esté
    expect(screen.getByText('KAS')).toBeInTheDocument();
  });
});
