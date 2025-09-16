import { sequelize } from './';
import { Terms } from '../models/Terms';
import { Product } from '../models/Product';

const seedTermsData = [
  // English Terms
  {
    language: 'en',
    title: 'Terms of Service',
    content: 'Welcome to 123Fakturera. These Terms of Service ("Terms") govern your use of our invoicing and accounting services. By accessing or using our services, you agree to be bound by these Terms.',
    section: 'intro',
    order: 1
  },
  {
    language: 'en',
    title: '1. Acceptance of Terms',
    content: 'By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    section: 'terms',
    order: 2
  },
  {
    language: 'en',
    title: '2. Use License',
    content: 'Permission is granted to temporarily access and use our services for personal or business purposes. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy our proprietary content.',
    section: 'terms',
    order: 3
  },
  {
    language: 'en',
    title: '3. Privacy Policy',
    content: 'Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.',
    section: 'privacy',
    order: 4
  },
  {
    language: 'en',
    title: '4. User Accounts',
    content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.',
    section: 'accounts',
    order: 5
  },
  {
    language: 'en',
    title: '5. Payment Terms',
    content: 'Subscription fees are billed in advance on a monthly or annual basis. All payments are non-refundable except as required by law.',
    section: 'payment',
    order: 6
  },
  {
    language: 'en',
    title: '6. Prohibited Uses',
    content: 'You may not use our services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.',
    section: 'prohibited',
    order: 7
  },
  {
    language: 'en',
    title: '7. Disclaimer',
    content: 'The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, we exclude all representations and warranties relating to this service.',
    section: 'disclaimer',
    order: 8
  },
  {
    language: 'en',
    title: '8. Limitations',
    content: 'In no event shall our company or suppliers be liable for any damages arising out of the use or inability to use the materials on this service.',
    section: 'limitations',
    order: 9
  },
  {
    language: 'en',
    title: '9. Contact Information',
    content: 'If you have any questions about these Terms, please contact us at support@123fakturera.se',
    section: 'contact',
    order: 10
  },
  // Swedish Terms
  {
    language: 'sv',
    title: 'Användarvillkor',
    content: 'Välkommen till 123Fakturera. Dessa användarvillkor ("Villkor") reglerar din användning av våra fakturerings- och redovisningstjänster. Genom att få tillgång till eller använda våra tjänster samtycker du till att vara bunden av dessa villkor.',
    section: 'intro',
    order: 1
  },
  {
    language: 'sv',
    title: '1. Acceptans av villkor',
    content: 'Genom att få tillgång till och använda denna tjänst accepterar och samtycker du till att vara bunden av villkoren och bestämmelserna i detta avtal. Om du inte samtycker till att följa ovanstående, vänligen använd inte denna tjänst.',
    section: 'terms',
    order: 2
  },
  {
    language: 'sv',
    title: '2. Användningslicens',
    content: 'Tillstånd ges att tillfälligt få tillgång till och använda våra tjänster för personliga eller affärsändamål. Detta är beviljandet av en licens, inte en överföring av äganderätt.',
    section: 'terms',
    order: 3
  },
  {
    language: 'sv',
    title: '3. Integritetspolicy',
    content: 'Din användning av våra tjänster styrs också av vår integritetspolicy. Vänligen granska vår integritetspolicy som också styr webbplatsen och informerar användare om våra datainsamlingsmetoder.',
    section: 'privacy',
    order: 4
  },
  {
    language: 'sv',
    title: '4. Användarkonton',
    content: 'Du är ansvarig för att upprätthålla konfidentialiteten för ditt konto och lösenord. Du samtycker till att acceptera ansvar för alla aktiviteter som sker under ditt konto.',
    section: 'accounts',
    order: 5
  },
  {
    language: 'sv',
    title: '5. Betalningsvillkor',
    content: 'Prenumerationsavgifter faktureras i förskott på månads- eller årsbasis. Alla betalningar är icke-återbetalningsbara förutom när lagen kräver det.',
    section: 'payment',
    order: 6
  },
  {
    language: 'sv',
    title: '6. Förbjuden användning',
    content: 'Du får inte använda våra tjänster för något olagligt eller obehörigt ändamål och du får inte heller, i användningen av tjänsten, bryta mot några lagar i din jurisdiktion.',
    section: 'prohibited',
    order: 7
  },
  {
    language: 'sv',
    title: '7. Ansvarsfriskrivning',
    content: 'Informationen på denna tjänst tillhandahålls på "som den är" basis. I största möjliga utsträckning enligt lag utesluter vi alla representationer och garantier relaterade till denna tjänst.',
    section: 'disclaimer',
    order: 8
  },
  {
    language: 'sv',
    title: '8. Begränsningar',
    content: 'Under inga omständigheter ska vårt företag eller leverantörer vara ansvariga för några skador som uppstår på grund av användning eller oförmåga att använda materialet på denna tjänst.',
    section: 'limitations',
    order: 9
  },
  {
    language: 'sv',
    title: '9. Kontaktinformation',
    content: 'Om du har några frågor om dessa villkor, vänligen kontakta oss på support@123fakturera.se',
    section: 'contact',
    order: 10
  }
];

const seedProductsData = [
  {
    articleNo: '1234567890',
    productService: 'This is a test product with fifty characters this!',
    inPrice: 900500,
    price: 1500800,
    unit: 'kilometers/hour',
    inStock: 2500600,
    description: 'This is the description with fifty characters this'
  },
  {
    articleNo: '1234567891',
    productService: 'Sony DSLR 12345',
    inPrice: 15000,
    price: 15000,
    unit: 'kilometers/hour',
    inStock: 1500800,
    description: 'Professional camera equipment for photography'
  },
  {
    articleNo: '1234567892',
    productService: 'Random product',
    inPrice: 1234,
    price: 1234,
    unit: 'pieces',
    inStock: 50,
    description: 'A random product for testing purposes'
  },
  {
    articleNo: '2345678901',
    productService: 'Microsoft Office 365 Business Premium',
    inPrice: 250,
    price: 350,
    unit: 'licenses/month',
    inStock: 1000,
    description: 'Complete office suite for business productivity'
  },
  {
    articleNo: '3456789012',
    productService: 'Dell XPS 15 Laptop',
    inPrice: 15000,
    price: 18500,
    unit: 'pieces',
    inStock: 25,
    description: 'High-performance laptop for professionals'
  },
  {
    articleNo: '4567890123',
    productService: 'Consulting Services - Senior Developer',
    inPrice: 800,
    price: 1200,
    unit: 'hours',
    inStock: 160,
    description: 'Expert development and technical consultation'
  },
  {
    articleNo: '5678901234',
    productService: 'Adobe Creative Cloud Complete',
    inPrice: 450,
    price: 599,
    unit: 'licenses/month',
    inStock: 500,
    description: 'Full creative suite for design professionals'
  },
  {
    articleNo: '6789012345',
    productService: 'iPhone 15 Pro Max 256GB',
    inPrice: 12000,
    price: 14999,
    unit: 'pieces',
    inStock: 50,
    description: 'Latest flagship smartphone from Apple'
  },
  {
    articleNo: '7890123456',
    productService: 'Samsung Galaxy S24 Ultra',
    inPrice: 11000,
    price: 13999,
    unit: 'pieces',
    inStock: 45,
    description: 'Premium Android smartphone with S Pen'
  },
  {
    articleNo: '8901234567',
    productService: 'Web Hosting Premium Plan',
    inPrice: 50,
    price: 99,
    unit: 'months',
    inStock: 9999,
    description: 'Unlimited bandwidth and storage hosting'
  },
  {
    articleNo: '9012345678',
    productService: 'Project Management Training Course',
    inPrice: 2500,
    price: 3999,
    unit: 'seats',
    inStock: 100,
    description: 'PMP certification preparation course'
  },
  {
    articleNo: '0123456789',
    productService: 'Electric Standing Desk',
    inPrice: 3500,
    price: 4999,
    unit: 'pieces',
    inStock: 30,
    description: 'Adjustable height desk for ergonomic workspace'
  },
  {
    articleNo: '1122334455',
    productService: 'Herman Miller Aeron Chair',
    inPrice: 8000,
    price: 11999,
    unit: 'pieces',
    inStock: 15,
    description: 'Premium ergonomic office chair'
  },
  {
    articleNo: '2233445566',
    productService: 'Cloud Storage - 1TB Annual',
    inPrice: 800,
    price: 1199,
    unit: 'years',
    inStock: 5000,
    description: 'Secure cloud storage with automatic backup'
  },
  {
    articleNo: '3344556677',
    productService: 'Slack Business+ Subscription',
    inPrice: 120,
    price: 180,
    unit: 'users/month',
    inStock: 2000,
    description: 'Team collaboration and communication platform'
  },
  {
    articleNo: '4455667788',
    productService: 'Zoom Business License',
    inPrice: 150,
    price: 199,
    unit: 'hosts/month',
    inStock: 1500,
    description: 'Video conferencing solution for businesses'
  },
  {
    articleNo: '5566778899',
    productService: 'SEO Optimization Package',
    inPrice: 5000,
    price: 7500,
    unit: 'projects',
    inStock: 20,
    description: 'Complete SEO audit and optimization service'
  },
  {
    articleNo: '6677889900',
    productService: 'Social Media Management',
    inPrice: 2000,
    price: 3000,
    unit: 'accounts/month',
    inStock: 50,
    description: 'Full social media management and content creation'
  },
  {
    articleNo: '7788990011',
    productService: 'Legal Consultation Services',
    inPrice: 1500,
    price: 2500,
    unit: 'hours',
    inStock: 80,
    description: 'Corporate legal advisory and documentation'
  },
  {
    articleNo: '8899001122',
    productService: 'Accounting Software Pro',
    inPrice: 300,
    price: 499,
    unit: 'licenses/year',
    inStock: 1000,
    description: 'Complete accounting solution for small business'
  },
  {
    articleNo: '9900112233',
    productService: 'Security System Installation',
    inPrice: 8000,
    price: 12000,
    unit: 'installations',
    inStock: 25,
    description: 'Complete office security system with cameras'
  },
  {
    articleNo: '0011223344',
    productService: 'Data Backup Service Enterprise',
    inPrice: 500,
    price: 799,
    unit: 'servers/month',
    inStock: 100,
    description: 'Automated backup with disaster recovery'
  },
  {
    articleNo: '1123456789',
    productService: 'Virtual Private Server - Pro',
    inPrice: 200,
    price: 349,
    unit: 'months',
    inStock: 500,
    description: 'High-performance VPS with dedicated resources'
  },
  {
    articleNo: '2234567890',
    productService: 'Email Marketing Platform',
    inPrice: 250,
    price: 399,
    unit: 'accounts/month',
    inStock: 200,
    description: 'Advanced email marketing with automation'
  },
  {
    articleNo: '3345678901',
    productService: 'Custom Software Development',
    inPrice: 1000,
    price: 1500,
    unit: 'hours',
    inStock: 320,
    description: 'Tailored software solutions for your business'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Sync models (create tables if not exist)
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');
    
    // Seed Terms
    await Terms.bulkCreate(seedTermsData);
    console.log(`✅ Seeded ${seedTermsData.length} terms`);
    
    // Seed Products
    await Product.bulkCreate(seedProductsData);
    console.log(`✅ Seeded ${seedProductsData.length} products`);
    
    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();