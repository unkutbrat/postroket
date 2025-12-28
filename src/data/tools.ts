import { calculateCtcToInHand, calculateEmi, calculateGratuity, calculateGst, calculateHra, calculateIncomeTax, calculateLoanEligibility, calculatePf } from '@/src/lib/calculators';
import { formatCurrency } from '@/src/lib/utils';

export type ToolCategory = 'salary' | 'tax' | 'gst' | 'loan';

export type ToolDefinition = {
  slug: string;
  category: ToolCategory;
  popular?: boolean;
  order?: number;
  titles: Record<string, string>;
  description: Record<string, string>;
  faqs: Record<string, { question: string; answer: string }[]>;
  examples: Record<string, string[]>;
  inputs: { label: string; key: string; type: 'number' | 'checkbox' | 'select'; options?: { label: string; value: string }[] }[];
  compute: (payload: Record<string, any>) => Record<string, number | string | any>;
};

export const toolDefinitions: ToolDefinition[] = [
  {
    slug: 'ctc-to-inhand',
    category: 'salary',
    popular: true,
    order: 1,
    titles: {
      en: 'CTC to In-hand Salary',
      hi: 'CTC से हाथ में वेतन',
      or: 'CTC ରୁ ହାତେ ହେବା ବେତନ'
    },
    description: {
      en: 'Estimate monthly in-hand salary after PF, professional tax, and TDS.',
      hi: 'पीएफ, प्रोफेशनल टैक्स और टीडीएस के बाद मासिक इन-हैंड वेतन का अनुमान।',
      or: 'ପିଏଫ, ପ୍ରୋଫେସନାଲ କର ଓ TDS ପରେ ମାସିକ ହାତେ ବେତନ।'
    },
    faqs: {
      en: [
        { question: 'What is considered PF?', answer: 'Provident fund employee contribution calculated on your basic or capped base.' },
        { question: 'Is professional tax mandatory?', answer: 'States like Maharashtra, Karnataka levy professional tax; enter 0 if not applicable.' }
      ],
      hi: [
        { question: 'पीएफ कैसे गिना जाता है?', answer: 'बेसिक या कैप्ड बेस पर कर्मचारी पीएफ प्रतिशत से।' },
        { question: 'प्रोफेशनल टैक्स कब देना होता है?', answer: 'कुछ राज्यों में लागू होता है, नहीं है तो 0 रखें।' }
      ],
      or: [
        { question: 'ପିଏଫ କିପରି ଗଣିତ ?', answer: 'ମୂଳ ବେତନ କିମ୍ବା କ୍ୟାପ୍ ରେ କର୍ମଚାରୀ ପିଏଫ ପ୍ରତିଶତ।' },
        { question: 'ପ୍ରୋଫେସନାଲ କର କେବେ ଦେବେ?', answer: 'କିଛି ରାଜ୍ୟରେ ଲାଗୁହୁଏ, ନ ଥିଲେ 0 ଦିଅନ୍ତୁ।' }
      ]
    },
    examples: {
      en: ['Annual CTC ₹12,00,000 with 12% PF and ₹200 PT leads to ~₹72k in-hand per month.'],
      hi: ['₹12,00,000 CTC, 12% PF, ₹200 पीटी पर लगभग ₹72k मासिक इन-हैंड।'],
      or: ['₹12,00,000 CTC, 12% PF, ₹200 ପିଟିରେ ପ୍ରାୟ ₹72k ହାତେ।']
    },
    inputs: [
      { label: 'annualCtc', key: 'annualCtc', type: 'number' },
      { label: 'pfPercent', key: 'pfPercent', type: 'number' },
      { label: 'professionalTax', key: 'professionalTax', type: 'number' },
      { label: 'tds', key: 'tds', type: 'number' }
    ],
    compute: (payload) => calculateCtcToInHand({
      annualCtc: Number(payload.annualCtc || 0),
      pfPercent: Number(payload.pfPercent || 0),
      professionalTax: Number(payload.professionalTax || 0),
      tds: Number(payload.tds || 0)
    })
  },
  {
    slug: 'hra-calculator',
    category: 'salary',
    popular: true,
    order: 2,
    titles: {
      en: 'HRA Calculator',
      hi: 'HRA कैलकुलेटर',
      or: 'HRA କ୍ୟାଲକ୍ୟୁଲେଟର'
    },
    description: {
      en: 'Compute HRA exemption based on rent, metro status, and basic salary.',
      hi: 'किराया, मेट्रो स्थिति और बेसिक वेतन के आधार पर HRA छूट की गणना।',
      or: 'ଭଡ଼ା, ମେଟ୍ରୋ ସ୍ଥିତି ଓ ବେସିକ୍ ବେତନ ଅନୁସାରେ HRA ଛୁଟ।'
    },
    faqs: {
      en: [{ question: 'Metro definition?', answer: 'Delhi, Mumbai, Kolkata, Chennai are treated as metro for 50% cap.' }],
      hi: [{ question: 'मेट्रो की परिभाषा?', answer: 'दिल्ली, मुंबई, कोलकाता, चेन्नई 50% कैप के लिए मेट्रो हैं।' }],
      or: [{ question: 'ମେଟ୍ରୋ କେ?', answer: 'ଦିଲ୍ଲୀ, ମୁମ୍ବାଇ, କୋଲକାତା, ଚେନ୍ନାଇ ମେଟ୍ରୋ ଗଣାଯାଇ।' }]
    },
    examples: {
      en: ['Basic ₹40k, rent ₹18k, metro=yes → exemption ₹16k.'],
      hi: ['बेसिक ₹40k, किराया ₹18k, मेट्रो → छूट ₹16k।'],
      or: ['ବେସିକ୍ ₹40k, ଭଡ଼ା ₹18k, ମେଟ୍ରୋ → ଛୁଟ ₹16k।']
    },
    inputs: [
      { label: 'basicSalary', key: 'basic', type: 'number' },
      { label: 'hraReceived', key: 'hraReceived', type: 'number' },
      { label: 'rentPaid', key: 'rentPaid', type: 'number' },
      { label: 'metro', key: 'isMetro', type: 'checkbox' }
    ],
    compute: (payload) => calculateHra({
      basic: Number(payload.basic || 0),
      hraReceived: Number(payload.hraReceived || 0),
      rentPaid: Number(payload.rentPaid || 0),
      isMetro: Boolean(payload.isMetro)
    })
  },
  {
    slug: 'pf-calculator',
    category: 'salary',
    popular: false,
    order: 3,
    titles: { en: 'PF Calculator', hi: 'पीएफ कैलकुलेटर', or: 'ପିଏଫ କ୍ୟାଲକ୍ୟୁଲେଟର' },
    description: {
      en: 'Monthly and annual provident fund based on employee contribution.',
      hi: 'कर्मचारी योगदान के आधार पर मासिक और वार्षिक पीएफ।',
      or: 'କର୍ମଚାରୀ ଯୋଗଦାନ ଅନୁସାରେ ମାସିକ ଓ ବାର୍ଷିକ ପିଏଫ।'
    },
    faqs: { en: [], hi: [], or: [] },
    examples: { en: ['Basic ₹18k, 12% PF → ₹2,160 per month.'], hi: ['बेसिक ₹18k, 12% पीएफ → ₹2,160 प्रतिमाह।'], or: ['ବେସିକ୍ ₹18k, 12% ପିଏଫ → ₹2,160/ମାସ।'] },
    inputs: [
      { label: 'basicSalary', key: 'basic', type: 'number' },
      { label: 'employeePf', key: 'employeePercent', type: 'number' },
      { label: 'pfCap', key: 'cap', type: 'number' }
    ],
    compute: (payload) => calculatePf({
      basic: Number(payload.basic || 0),
      employeePercent: Number(payload.employeePercent || 0),
      cap: payload.cap ? Number(payload.cap) : 15000
    })
  },
  {
    slug: 'gratuity-calculator',
    category: 'salary',
    popular: false,
    order: 4,
    titles: { en: 'Gratuity Calculator', hi: 'ग्रेच्युटी कैलकुलेटर', or: 'ଗ୍ରାଟୁଇଟି ହିସାବ' },
    description: {
      en: 'Estimate gratuity payable using 15/26 rule.',
      hi: '15/26 नियम से देय ग्रेच्युटी का अनुमान।',
      or: '15/26 ନିୟମ ଅନୁସାରେ ଗ୍ରାଟୁଇଟି ଆନୁମାନ।'
    },
    faqs: { en: [], hi: [], or: [] },
    examples: { en: ['Basic+DA ₹30k, 7 years → ₹1,21,154.'], hi: ['बेसिक+DA ₹30k, 7 वर्ष → ₹1,21,154।'], or: ['ବେସିକ୍+DA ₹30k, 7 ବର୍ଷ → ₹1,21,154।'] },
    inputs: [
      { label: 'lastBasic', key: 'lastBasic', type: 'number' },
      { label: 'yearsService', key: 'years', type: 'number' }
    ],
    compute: (payload) => calculateGratuity({ lastBasic: Number(payload.lastBasic || 0), years: Number(payload.years || 0) })
  },
  {
    slug: 'emi-calculator',
    category: 'loan',
    popular: true,
    order: 5,
    titles: { en: 'EMI Calculator', hi: 'ईएमआई कैलकुलेटर', or: 'EMI କ୍ୟାଲକ୍ୟୁଲେଟର' },
    description: {
      en: 'Loan EMI with amortization schedule and totals.',
      hi: 'अमोर्टाइजेशन अनुसूची और कुल भुगतान के साथ ईएमआई।',
      or: 'ଅମୋର୍ଟାଇଜେସନ ତାଲିକା ସହିତ EMI।'
    },
    faqs: { en: [], hi: [], or: [] },
    examples: { en: ['₹5L, 10% rate, 36 months → EMI ₹16127.'], hi: ['₹5 लाख, 10% दर, 36 माह → EMI ₹16127।'], or: ['₹5ଲକ୍ଷ, 10% ହାର, 36 ମାସ → EMI ₹16127।'] },
    inputs: [
      { label: 'principal', key: 'principal', type: 'number' },
      { label: 'rate', key: 'annualRate', type: 'number' },
      { label: 'tenure', key: 'tenureMonths', type: 'number' }
    ],
    compute: (payload) => calculateEmi({
      principal: Number(payload.principal || 0),
      annualRate: Number(payload.annualRate || 0),
      tenureMonths: Number(payload.tenureMonths || 0)
    })
  },
  {
    slug: 'loan-eligibility',
    category: 'loan',
    popular: false,
    order: 6,
    titles: { en: 'Loan Eligibility', hi: 'ऋण पात्रता', or: 'ରିଣ ଯୋଗ୍ୟତା' },
    description: {
      en: 'Simple eligibility based on disposable income.',
      hi: 'उपलब्ध आय के आधार पर सरल पात्रता अनुमान।',
      or: 'ଉପଲବ୍ଧ ଆୟ ଆଧାରିତ ସହଜ ଯୋଗ୍ୟତା।'
    },
    faqs: { en: [], hi: [], or: [] },
    examples: { en: ['₹80k income, ₹10k obligations, 9% 60 months → ~₹31L'], hi: ['₹80k आय, ₹10k देनदारी, 9% 60 माह → ~₹31L'], or: ['₹80k ଆୟ, ₹10k ଦେୟ, 9% 60 ମାସ → ~₹31ଲକ୍ଷ'] },
    inputs: [
      { label: 'monthlyIncome', key: 'monthlyIncome', type: 'number' },
      { label: 'obligations', key: 'obligations', type: 'number' },
      { label: 'rate', key: 'rate', type: 'number' },
      { label: 'tenure', key: 'tenureMonths', type: 'number' }
    ],
    compute: (payload) => calculateLoanEligibility({
      monthlyIncome: Number(payload.monthlyIncome || 0),
      obligations: Number(payload.obligations || 0),
      rate: Number(payload.rate || 0),
      tenureMonths: Number(payload.tenureMonths || 0)
    })
  },
  {
    slug: 'gst-calculator',
    category: 'gst',
    popular: true,
    order: 7,
    titles: { en: 'GST Calculator', hi: 'जीएसटी कैलकुलेटर', or: 'GST କ୍ୟାଲକ୍ୟୁଲେଟର' },
    description: {
      en: 'Inclusive or exclusive GST with totals.',
      hi: 'इनक्लूसिव या एक्सक्लूसिव GST की गणना।',
      or: 'ଇନକ୍ଲୁସିଭ/ଏକ୍ସକ୍ଲୁସିଭ GST ହିସାବ।'
    },
    faqs: { en: [], hi: [], or: [] },
    examples: { en: ['₹1000 amount @18% exclusive → ₹1180 total.'], hi: ['₹1000 पर 18% जीएसटी → ₹1180 कुल।'], or: ['₹1000 ଉପରେ 18% GST → ₹1180 ସମଗ୍ର।'] },
    inputs: [
      { label: 'amount', key: 'amount', type: 'number' },
      { label: 'gstRate', key: 'rate', type: 'number' },
      { label: 'inclusive', key: 'inclusive', type: 'checkbox' }
    ],
    compute: (payload) => calculateGst({
      amount: Number(payload.amount || 0),
      rate: Number(payload.rate || 0),
      inclusive: Boolean(payload.inclusive)
    })
  },
  {
    slug: 'income-tax-estimator',
    category: 'tax',
    popular: true,
    order: 8,
    titles: { en: 'Income Tax Estimator', hi: 'आयकर अनुमानक', or: 'ଆୟକର ଅନୁମାନ' },
    description: {
      en: 'Old vs New regime comparison with standard deduction.',
      hi: 'पुरानी बनाम नई कर प्रणाली तुलना।',
      or: 'ପୁରୁଣା ବନାମ ନୂତନ କର ପ୍ରଣାଳୀ ତୁଳନା।'
    },
    faqs: { en: [], hi: [], or: [] },
    examples: { en: ['₹12L income → lower tax under new regime for most cases.'], hi: ['₹12 लाख आय → कई मामलों में नई प्रणाली कम टैक्स।'], or: ['₹12ଲକ୍ଷ ଆୟ → ବହୁତ କେସରେ ନୂତନ ପ୍ରଣାଳୀ କମ୍ କର।'] },
    inputs: [
      { label: 'amount', key: 'income', type: 'number' },
      { label: 'regime', key: 'regime', type: 'select', options: [{ label: 'old', value: 'old' }, { label: 'new', value: 'new' }] }
    ],
    compute: (payload) => calculateIncomeTax({ income: Number(payload.income || 0), regime: (payload.regime as 'old' | 'new') || 'new' })
  }
];

export function summarizeResult(result: Record<string, any>, locale: string) {
  const lines: string[] = [];
  Object.entries(result).forEach(([key, value]) => {
    if (typeof value === 'number') {
      lines.push(`${key}: ${formatCurrency(value, locale === 'en' ? 'en-IN' : `${locale}-IN`)}`);
    }
  });
  return lines;
}
