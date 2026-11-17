// Gemeinsame Stimme aller Videos (ElevenLabs).
export const VOICE = {
  voice_id: 'rKiu7lQ4c5P3az3745s3', // Carla Blum – Confident and Informative (de)
  model_id: 'eleven_multilingual_v2',
  voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.0, use_speaker_boost: true, speed: 1.05 },
};
// Absätze zu einem Sprechertext zusammensetzen
export const p = (...paras) => paras.map(s => s.trim().replace(/\s+/g, ' ')).join('\n\n');
