import { defaultExams } from '../data/defaultExams.js';
import { Exam } from '../models/Exam.js';
import { Paragraph } from '../models/Paragraph.js';

const samplePassages = {
  English: 'Public service requires patience, accuracy and a strong sense of responsibility. A candidate preparing for a competitive examination should practise with discipline every day. Regular typing sessions improve rhythm and reduce avoidable mistakes. Focus first on accuracy, maintain a comfortable posture and let speed develop naturally through consistent effort.',
  Hindi: 'भारत एक विशाल और विविधताओं से भरा देश है। यहाँ अनेक भाषाएँ, संस्कृतियाँ और परंपराएँ एक साथ विकसित हुई हैं। नियमित अभ्यास से टाइपिंग की गति और शुद्धता दोनों में सुधार आता है। अभ्यर्थियों को परीक्षा के समान वातावरण में शांत मन से अभ्यास करना चाहिए।'
};

export async function ensureDefaultCatalogue({ logger = console } = {}) {
  let created = 0;
  let updated = 0;
  let paragraphsCreated = 0;

  for (const definition of defaultExams) {
    const existing = await Exam.findOne({ name: definition.name });
    const exam = existing
      ? await Exam.findByIdAndUpdate(existing._id, definition, { new: true, runValidators: true })
      : await Exam.create(definition);

    if (existing) updated += 1;
    else created += 1;

    const hasParagraph = await Paragraph.exists({ exam: exam._id });
    if (!hasParagraph) {
      await Paragraph.create({
        title: `${definition.name} Sample`,
        content: samplePassages[definition.language] || samplePassages.English,
        language: definition.language,
        exam: exam._id,
        difficulty: 'Medium'
      });
      paragraphsCreated += 1;
    }
  }

  logger.info?.(`Default catalogue ensured: ${created} created, ${updated} updated, ${paragraphsCreated} sample paragraphs created.`);
  return { created, updated, paragraphsCreated };
}
