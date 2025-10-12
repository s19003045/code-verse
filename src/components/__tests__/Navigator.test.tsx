import { describe, expect, beforeEach, it, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Navigator from '../Navigator';
import { useWorldStore } from '@store/worldStore';
import type { AppItem } from '@types/app';

const mockApps: AppItem[] = [
  {
    id: 'creative-city',
    title: 'Creative City',
    description: 'Party games and collaboration demos',
    tags: ['Party', 'Collaboration'],
    position: [-20, 0, 10],
    icon: '/cards/creative-city.png',
    link: 'https://example.com/creative-city'
  },
  {
    id: 'ai-plateau',
    title: 'AI Plateau',
    description: 'Pose analysis',
    tags: ['AI', 'Coaching'],
    position: [10, 0, -15],
    icon: '/cards/ai-plateau.png',
    link: 'https://example.com/ai-plateau'
  }
];

let setAutoModeMock: ReturnType<typeof vi.fn>;
let teleportMock: ReturnType<typeof vi.fn>;
let selectAppMock: ReturnType<typeof vi.fn>;
let triggerSfxMock: ReturnType<typeof vi.fn>;
let toggleLowPowerMock: ReturnType<typeof vi.fn>;
let resetCameraMock: ReturnType<typeof vi.fn>;

describe('Navigator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setAutoModeMock = vi.fn();
    teleportMock = vi.fn();
    selectAppMock = vi.fn();
    triggerSfxMock = vi.fn();
    toggleLowPowerMock = vi.fn();
    resetCameraMock = vi.fn();

    useWorldStore.setState((state) => ({
      ...state,
      apps: mockApps,
      appsLoaded: true,
      autoMode: false,
       lowPowerMode: false,
      teleportTo: teleportMock,
      selectApp: selectAppMock,
      setAutoMode: setAutoModeMock,
       triggerSfx: triggerSfxMock,
       toggleLowPowerMode: toggleLowPowerMock,
       resetCamera: resetCameraMock
    }));
  });

  it('filters apps by search query', () => {
    render(<Navigator />);

    const search = screen.getByPlaceholderText(/search experiences/i);
    fireEvent.change(search, { target: { value: 'ai' } });

    expect(screen.getByRole('button', { name: /AI Plateau/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Creative City/i })).not.toBeInTheDocument();
  });

  it('toggles tag filter', () => {
    render(<Navigator />);

    const tagGrid = screen.getAllByTestId('tag-grid')[0];
    const teleportGrid = screen.getAllByTestId('teleport-grid')[0];

    const tagButton = within(tagGrid).getAllByRole('button', { name: /^AI$/i })[0];
    fireEvent.click(tagButton);
    expect(within(teleportGrid).getAllByRole('button', { name: /AI Plateau/i }).length).toBeGreaterThan(0);
    expect(within(teleportGrid).queryByRole('button', { name: /Creative City/i })).toBeNull();
  });

  it('toggles auto tour mode', () => {
    render(<Navigator />);

    const button = screen.getAllByRole('button', { name: /Auto Tour/i })[0];
    fireEvent.click(button);
    expect(setAutoModeMock).toHaveBeenCalledWith(true);
  });

  it('renders skeleton when loading', () => {
    useWorldStore.setState((state) => ({ ...state, appsLoaded: false }));
    render(<Navigator loading />);

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});
