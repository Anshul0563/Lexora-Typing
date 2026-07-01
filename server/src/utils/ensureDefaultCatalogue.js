import { defaultExams } from '../data/defaultExams.js';
import { Exam } from '../models/Exam.js';
import { Paragraph } from '../models/Paragraph.js';

const samplePassages = {
  English: 'Public service requires patience, accuracy and a strong sense of responsibility. A candidate preparing for a competitive examination should practise with discipline every day. Regular typing sessions improve rhythm and reduce avoidable mistakes. Focus first on accuracy, maintain a comfortable posture and let speed develop naturally through consistent effort.',
  Hindi: 'भारत एक विशाल और विविधताओं से भरा देश है। यहाँ अनेक भाषाएँ, संस्कृतियाँ और परंपराएँ एक साथ विकसित हुई हैं। नियमित अभ्यास से टाइपिंग की गति और शुद्धता दोनों में सुधार आता है। अभ्यर्थियों को परीक्षा के समान वातावरण में शांत मन से अभ्यास करना चाहिए।'
};

export async function ensureDefaultCatalogue({ logger = console } = {}) {
  const names = defaultExams.map((exam) => exam.name);
  const catalogueWrite = await Exam.bulkWrite(defaultExams.map((exam) => ({ updateOne: { filter: { name: exam.name }, update: { $setOnInsert: exam }, upsert: true } })), { ordered: false });

  const exams = await Exam.find({ name: { $in: names } }).select('_id name language').lean();
  const examIdsWithParagraphs = new Set((await Paragraph.distinct('exam', { exam: { $in: exams.map((exam) => exam._id) } })).map(String));
  const paragraphs = exams.filter((exam) => !examIdsWithParagraphs.has(String(exam._id))).map((exam) => ({
    title: `${exam.name} Sample`, content: samplePassages[exam.language] || samplePassages.English,
    language: exam.language, exam: exam._id, difficulty: 'Medium'
  }));
  if (paragraphs.length) await Paragraph.insertMany(paragraphs, { ordered: false });

  const created = catalogueWrite.upsertedCount || 0;
  logger.info?.(`Default catalogue ensured: ${created} exams and ${paragraphs.length} sample paragraphs created.`);
  return { created, updated: 0, paragraphsCreated: paragraphs.length };
}
