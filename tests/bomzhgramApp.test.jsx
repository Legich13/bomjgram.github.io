// @vitest-environment jsdom

import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '../src/App.yopta.jsx';

afterEach(() => {
  cleanup();
});

describe('Бомжграмм UI', () => {
  it('renders the instagram-like shell from seed data', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Лента района' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /У кого сегодня новая районная легенда/i })).toBeTruthy();
    expect(screen.getByText('Главный бродяга')).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Лавочная навигация' })).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Нижняя навигация' })).toBeTruthy();
    expect(screen.getAllByRole('article')).toHaveLength(10);
  });

  it('updates the active story when a different story is selected', () => {
    render(<App />);

    const storyButton = screen.getByRole('button', { name: 'История Лавка FM' });

    expect(storyButton.getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(storyButton);

    expect(storyButton.getAttribute('aria-pressed')).toBe('true');
  });

  it('toggles like and save state on a post card', () => {
    render(<App />);

    const likeButton = screen.getByRole('button', { name: /Лайкнуть пост Мамка 90\+/ });
    const postArticle = likeButton.closest('article');

    expect(postArticle).toBeTruthy();

    const scoped = within(postArticle);
    const saveButton = scoped.getByRole('button', { name: /Убрать пост из сейвов Мамка 90\+/ });

    expect(likeButton.getAttribute('aria-pressed')).toBe('false');
    expect(saveButton.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(likeButton);
    fireEvent.click(saveButton);

    expect(likeButton.getAttribute('aria-pressed')).toBe('true');
    expect(saveButton.getAttribute('aria-pressed')).toBe('false');
  });

  it('changes the active nav and feed heading from the sidebar', () => {
    render(<App />);

    const sidebar = screen.getByRole('navigation', { name: 'Лавочная навигация' });
    const rumorsButton = within(sidebar).getByRole('button', { name: /Слухи/ });

    fireEvent.click(rumorsButton);

    expect(rumorsButton.getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('heading', { name: 'Слухи у подъезда' })).toBeTruthy();
  });

  it('renders dedicated mobile chrome alongside the desktop shell', () => {
    render(<App />);

    expect(screen.getByRole('banner', { name: 'Шапка Бомжграмм' })).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Нижняя навигация' })).toBeTruthy();
  });
});
