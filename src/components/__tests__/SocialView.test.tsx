import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SocialView } from '../SocialView';
import { TournamentProvider } from '../../context/TournamentContext';

// Mock del context
const mockAddSocialPost = vi.fn();
const mockToggleLikePost = vi.fn();

vi.mock('../../context/TournamentContext', () => ({
  useTournament: () => ({
    currentUser: {
      name: 'Test User',
      avatar: 'https://test.com/avatar.png',
      favoriteTeamId: 'sap',
    },
    socialPosts: [
      {
        id: '1',
        userName: 'Admin User',
        userAvatar: 'https://test.com/admin.png',
        userBadge: 'Admin',
        timeAgo: 'hace 5m',
        content: 'Este es un post de prueba',
        likes: 10,
        comments: 2,
        isLiked: false,
        matchInfo: { homeTeam: 'sap', awayTeam: 'lda', multiplier: 'x2' },
      },
      {
        id: '2',
        userName: 'Normal User',
        userAvatar: 'https://test.com/user.png',
        timeAgo: 'hace 1h',
        content: 'Post sin match info y sin badge',
        likes: 5,
        comments: 0,
        isLiked: true,
        streakInfo: { title: 'Racha de prueba', current: 3, target: 5 }
      },
      {
        id: '3',
        userName: 'Pro User',
        userAvatar: 'https://test.com/pro.png',
        timeAgo: 'hace 2h',
        content: 'Logro desbloqueado',
        likes: 20,
        comments: 1,
        isLiked: false,
        achievementInfo: { title: 'SNIPER', description: 'Acertaste 5' }
      }
    ],
    addSocialPost: mockAddSocialPost,
    toggleLikePost: mockToggleLikePost,
  })
}));

describe('SocialView Component', () => {
  it('renders the SocialView wall and posts', () => {
    render(<SocialView />);
    
    // Verifica que el título esté presente
    expect(screen.getByText('Muro de Momentos')).toBeInTheDocument();
    
    // Verifica que el post mockeado se renderice
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('Este es un post de prueba')).toBeInTheDocument();
    expect(screen.getByText('hace 5m')).toBeInTheDocument();
  });

  it('allows user to type and submit a new post', () => {
    render(<SocialView />);
    
    const input = screen.getByPlaceholderText('Comparte tu pronóstico o análisis de la fecha...');
    
    fireEvent.change(input, { target: { value: 'Nuevo pronóstico de prueba' } });
    expect(input).toHaveValue('Nuevo pronóstico de prueba');
    
    // El botón se habilita, podemos buscarlo por su tipo submit
    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    fireEvent.click(submitButton);
    expect(mockAddSocialPost).toHaveBeenCalledWith('Nuevo pronóstico de prueba');
  });

  it('allows user to like a post', () => {
    render(<SocialView />);
    
    // Encontrar el botón de me gusta (generalmente el que tiene el ícono Heart)
    // Buscamos por el texto de los likes "10"
    const likeButton = screen.getByText('10').closest('button');
    expect(likeButton).toBeInTheDocument();
    
    if (likeButton) {
      fireEvent.click(likeButton);
      expect(mockToggleLikePost).toHaveBeenCalledWith('1');
    }
  });

  it('does not allow submitting empty post', () => {
    const { container } = render(<SocialView />);
    
    const form = container.querySelector('form');
    if (form) {
      fireEvent.submit(form); // Se dispara el form directamente con input vacío
    }
    
    expect(mockAddSocialPost).not.toHaveBeenCalledWith('');
  });
});
