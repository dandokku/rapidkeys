const EASY_WORDS = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what"
];

const MEDIUM_WORDS = [
    "ability", "absence", "academy", "account", "accused", "achieve", "acquire", "address", "advance", "adverse", "advisor", "against", "airline", "airport", "alcohol", "alleged", "already", "analyst", "ancient", "another"
];

const HARD_WORDS = [
    "idiosyncrasy", "unobtrusive", "recalcitrant", "obfuscated", "perspicacity", "quintessential", "superfluous", "vicissitude", "ephemeral", "cacophony", "deleterious", "fastidious", "gregarious", "inevitable", "magnanimous", "nefarious", "ostentatious", "paradigm", "raconteur", "ubiquitous"
];

export type Difficulty = 'easy' | 'medium' | 'hard';

export const generateWords = (count: number, difficulty: Difficulty = 'easy'): string[] => {
    const pool = difficulty === 'easy' ? EASY_WORDS : difficulty === 'medium' ? MEDIUM_WORDS : HARD_WORDS;
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
        result.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return result;
};
