# 📝 RapidKeys Roadmap & Improvements

This file tracks potential features, technical enhancements, and UX improvements for future versions of RapidKeys.

## 🚀 Upcoming Features

- [ ] **Global Leaderboard**: Compare typing speeds with users worldwide via a backend integration (Firebase/Supabase).
- [ ] **Multiplayer Race**: Real-time typing battles against friends or random opponents.
- [ ] **Custom Text Mode**: Allow users to paste their own text or provide a URL to practice typing specific content.
- [ ] **Account System**: Save history, track progress over time with graphs, and earn achievements.
- [ ] **Daily Challenges**: Unique daily texts with specific difficulty modifiers.
- [ ] **More Languages**: Support for Spanish, French, German, and coding-specific modes (JavaScript, Python, etc.).

## 🎨 UI/UX Enhancements

- [ ] **More Themes**: Add curated color palettes (Cyberpunk, Retro, Nord, etc.) that users can switch between.
- [ ] **Sound Library**: Multiple keyboard sound profiles (Blue switches, Brown switches, silent, etc.).
- [ ] **Focus Mode**: Hide all UI elements except the text during typing.
- [ ] **Live Graph**: Show WPM fluctuation in real-time as a line chart at the bottom.
- [ ] **Confetti Variations**: Custom confetti effects based on WPM milestones (e.g., gold for 100+ WPM).

## 🛠️ Technical Improvements

- [ ] **Performance Optimization**: Virtualize the text rendering for extremely long typing sessions.
- [ ] **PWA Support**: Make the app installable on mobile and desktop for offline use.
- [ ] **Advanced Analytics**: Track "accuracy per finger" or "slowest keys" to help users improve specific weaknesses.
- [ ] **Unit Testing**: Add Vitest/Testing Library for core hooks (`useTypingTest`) and components.
- [ ] **E2E Testing**: Implement Playwright tests for critical flows.

## 🐛 Known Bugs

- [ ] Smoothness of the caret on extremely fast typing speeds (>150 WPM).
- [ ] Better handling of word-wrap and responsive text flow in the typing area.

---

Feel free to open an issue or pull request if you have more ideas!
