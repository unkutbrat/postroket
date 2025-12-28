import { JobStatus, PaymentStatus, PaymentProvider } from '@prisma/client';
import { toolDefinitions } from './tools';

export const seedJobs = [
  {
    slug: 'store-supervisor',
    companyName: 'Metro Mart',
    title: 'Store Supervisor',
    description: 'Manage daily retail operations, billing, and inventory.',
    locationCity: 'Mumbai',
    locationState: 'Maharashtra',
    salaryMin: 25000,
    salaryMax: 32000,
    experienceMin: 2,
    experienceMax: 5,
    contactEmail: 'hr@metromart.example',
    contactPhone: '9000000000',
    featured: true,
    status: JobStatus.PUBLISHED,
    paymentStatus: PaymentStatus.PAID,
    paymentProvider: PaymentProvider.MANUAL
  },
  {
    slug: 'back-office-executive',
    companyName: 'FinAssist',
    title: 'Back Office Executive',
    description: 'Process MIS reports, vendor follow-ups, and reconciliations.',
    locationCity: 'Bhubaneswar',
    locationState: 'Odisha',
    salaryMin: 18000,
    salaryMax: 26000,
    experienceMin: 1,
    experienceMax: 3,
    contactEmail: 'talent@finassist.example',
    contactPhone: '9437000000',
    featured: false,
    status: JobStatus.PUBLISHED,
    paymentStatus: PaymentStatus.UNPAID,
    paymentProvider: PaymentProvider.MANUAL
  }
];

export const glossaryTerms: { term: string; definition: string; locale: string }[] = [
  { term: 'CTC', definition: 'Cost to company including fixed and variable pay.', locale: 'en' },
  { term: 'PF', definition: 'Provident Fund retirement savings contribution.', locale: 'en' },
  { term: 'HRA', definition: 'House Rent Allowance given for accommodation.', locale: 'en' },
  { term: 'TDS', definition: 'Tax deducted at source on salary or payments.', locale: 'en' },
  { term: 'GST', definition: 'Goods and Services Tax on supply of goods/services.', locale: 'en' },
  { term: 'EMI', definition: 'Equated monthly installment for a loan.', locale: 'en' },
  { term: 'CIBIL', definition: 'Credit score maintained by TransUnion CIBIL.', locale: 'en' },
  { term: 'Form 16', definition: 'TDS certificate issued by employer.', locale: 'en' },
  { term: 'Section 80C', definition: 'Income tax deduction for investments up to ₹1.5L.', locale: 'en' },
  { term: 'Standard deduction', definition: 'Flat ₹50,000 deduction for salaried taxpayers.', locale: 'en' },
  { term: 'Net take-home', definition: 'Salary credited after all deductions.', locale: 'en' },
  { term: 'Form 26AS', definition: 'Annual consolidated tax statement.', locale: 'en' },
  { term: 'UAN', definition: 'Universal Account Number for EPF members.', locale: 'en' },
  { term: 'GSTIN', definition: 'Unique Goods and Services Tax Identification Number.', locale: 'en' },
  { term: 'ITC', definition: 'Input Tax Credit on eligible business purchases.', locale: 'en' },
  { term: 'Basic salary', definition: 'Fixed pay component before allowances.', locale: 'en' },
  { term: 'Professional tax', definition: 'State-level tax on employment income.', locale: 'en' },
  { term: 'Surcharge', definition: 'Additional income tax for higher slabs.', locale: 'en' },
  { term: 'Notice period', definition: 'Time required before leaving a role.', locale: 'en' },
  { term: 'Offer letter', definition: 'Formal document offering employment.', locale: 'en' },
  { term: 'CTC', definition: 'कंपनी द्वारा कर्मचारी पर कुल खर्च।', locale: 'hi' },
  { term: 'PF', definition: 'भविष्य निधि योगदान।', locale: 'hi' },
  { term: 'HRA', definition: 'आवास किराए के लिए भत्ता।', locale: 'hi' },
  { term: 'TDS', definition: 'स्रोत पर कर कटौती।', locale: 'hi' },
  { term: 'GST', definition: 'माल और सेवा कर।', locale: 'hi' },
  { term: 'EMI', definition: 'समान मासिक किस्त।', locale: 'hi' },
  { term: 'नेट टेक-होम', definition: 'सभी कटौतियों के बाद खाता में आने वाला वेतन।', locale: 'hi' },
  { term: 'फॉर्म 16', definition: 'नियोक्ता द्वारा जारी टीडीएस प्रमाण पत्र।', locale: 'hi' },
  { term: 'फॉर्म 26AS', definition: 'वार्षिक एकीकृत कर विवरण।', locale: 'hi' },
  { term: 'युआएन', definition: 'ईपीएफ खाते के लिए यूनिवर्सल नंबर।', locale: 'hi' },
  { term: 'जीएसटीआईएन', definition: 'जीएसटी पंजीकरण की पहचान संख्या।', locale: 'hi' },
  { term: 'इनपुट टैक्स क्रेडिट', definition: 'व्यवसाय खरीद पर मिले जीएसटी का क्रेडिट।', locale: 'hi' },
  { term: 'बेसिक सैलरी', definition: 'भत्तों से पहले का निश्चित वेतन हिस्सा।', locale: 'hi' },
  { term: 'प्रोफेशनल टैक्स', definition: 'रोजगार आय पर राज्य स्तरीय कर।', locale: 'hi' },
  { term: 'नोटिस पीरियड', definition: 'त्यागपत्र से पहले आवश्यक समय।', locale: 'hi' },
  { term: 'ऑफर लेटर', definition: 'नौकरी प्रस्ताव का औपचारिक पत्र।', locale: 'hi' },
  { term: 'CTC', definition: 'କମ୍ପାନି ଖର୍ଚ୍ଚ ସହିତ ସମସ୍ତ ପ୍ୟାକେଜ୍।', locale: 'or' },
  { term: 'PF', definition: 'ଭବିଷ୍ୟତ ନିଧି ଅଂଶଦାନ।', locale: 'or' },
  { term: 'HRA', definition: 'ଭଡ଼ା ସହାୟତା ଭତ୍ତା।', locale: 'or' },
  { term: 'TDS', definition: 'ସ୍ରୋତରେ କର କଟୋଟା।', locale: 'or' },
  { term: 'GST', definition: 'ପଣ୍ୟ ଏବଂ ସେବା କର।', locale: 'or' },
  { term: 'EMI', definition: 'ସମାନ ମାସିକ କିଷ୍ତି।', locale: 'or' },
  { term: 'ଟେକ୍-ହୋମ', definition: 'ସମସ୍ତ କଟୋଟା ପରେ ଖାତାକୁ ଆସିବା ବେତନ।', locale: 'or' },
  { term: 'ଫର୍ମ 16', definition: 'ନିଯୁକ୍ତାଙ୍କ ଦ୍ୱାରା ଜାରି TDS ପ୍ରମାଣପତ୍ର।', locale: 'or' },
  { term: 'ଫର୍ମ 26AS', definition: 'ବାର୍ଷିକ ସଂକଳିତ କର ବିବରଣୀ।', locale: 'or' },
  { term: 'UAN', definition: 'EPF ସଦସ୍ୟଙ୍କ ୟୁନିଭର୍ସାଲ ଆକାଉଣ୍ଟ ନମ୍ବର।', locale: 'or' },
  { term: 'GSTIN', definition: 'ଜିଏସଟି ପଞ୍ଜିକରଣ ସଂଖ୍ୟା।', locale: 'or' },
  { term: 'ITC', definition: 'ଯୋଗ୍ୟ ବ୍ୟବସାୟ କିଣାରେ ମିଳୁଥିବା ଇନପୁଟ କର କ୍ରେଡିଟ।', locale: 'or' },
  { term: 'ମୂଳ ବେତନ', definition: 'ଭତ୍ତା ଆଗରୁ ନିର୍ଦ୍ଧାରିତ ବେତନ ଅଂଶ।', locale: 'or' },
  { term: 'ପ୍ରୋଫେସନାଲ କର', definition: 'ରୋଜଗାର ଆୟ ଉପରେ ରାଜ୍ୟ ସ୍ତରୀୟ କର।', locale: 'or' },
  { term: 'ନୋଟିସ୍ ପିରିଅଡ୍', definition: 'ଚାକିରି ଛାଡ଼ିବା ପୂର୍ବରୁ ଆବଶ୍ୟକ ସମୟ।', locale: 'or' },
  { term: 'ଅଫର ପତ୍ର', definition: 'ନିଯୁକ୍ତି ପାଇଁ ଔପଚାରିକ ପତ୍ର।', locale: 'or' }
];

export const seedToolBodies: Record<string, Record<string, string>> = toolDefinitions.reduce((acc, tool) => {
  acc[tool.slug] = {
    en: `${tool.titles.en} helps you plan salary and taxes with India focused rules.`,
    hi: `${tool.titles.hi} भारत केंद्रित नियमों के साथ वेतन और टैक्स समझने में मदद करता है।`,
    or: `${tool.titles.or} ଭାରତୀୟ ନିୟମ ଅନୁସାରେ ବେତନ ଓ କର ବୁଝିବାରେ ସାହାଯ୍ୟ କରେ।`
  };
  return acc;
}, {} as Record<string, Record<string, string>>);

export const letterTemplates = [
  {
    slug: 'offer-letter',
    title: { en: 'Offer Letter', hi: 'ऑफर लेटर', or: 'ଅଫର ପତ୍ର' },
    body: {
      en: 'We are pleased to offer you the role at Postroket effective immediately.',
      hi: 'हमें आपको यह भूमिका देने में खुशी है।',
      or: 'ଆମେ ଆପଣଙ୍କୁ ଏହି ଭୂମିକା ପାଇଁ ପ୍ରସନ୍ନତା ସହ ସୁଚନା ଦେଉଛୁ।'
    }
  },
  {
    slug: 'experience-letter',
    title: { en: 'Experience Letter', hi: 'अनुभव पत्र', or: 'ଅନୁଭବ ପତ୍ର' },
    body: {
      en: 'This certifies successful service with our organization.',
      hi: 'यह हमारे साथ सफल सेवा का प्रमाण है।',
      or: 'ଏହା ଆମ ସହିତ ସଫଳ ସେବାର ପ୍ରମାଣ ପତ୍ର।'
    }
  }
];
