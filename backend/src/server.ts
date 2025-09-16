import Fastify from 'fastify';
import cors from '@fastify/cors';
import { connectDB } from './database';
import { Terms } from './models/Terms';
import { Product } from './models/Product';

const fastify = Fastify({
  logger: true
});

// Register CORS
fastify.register(cors, {
  origin: true
});

// Routes
fastify.get('/api/terms/:language', async (request, reply) => {
  const { language } = request.params as { language: string };
  try {
    const terms = await Terms.findAll({
      where: { language },
      order: [['section', 'ASC'], ['order', 'ASC']]
    });
    return terms;
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch terms' });
  }
});

fastify.get('/api/products', async (request, reply) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']]
    });
    return products;
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch products' });
  }
});

fastify.put('/api/products/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const updates = request.body as Partial<Product>;
  
  try {
    await Product.update(updates, {
      where: { id: parseInt(id) }
    });
    const updated = await Product.findByPk(parseInt(id));
    return updated;
  } catch (error) {
    reply.code(500).send({ error: 'Failed to update product' });
  }
});

// Seed data function
async function seedData() {
  // Check if data exists
  const termsCount = await Terms.count();
  const productsCount = await Product.count();

  if (termsCount === 0) {
    // Seed Terms data
    const termsData = [
      // English terms
      { language: 'en', title: 'Terms of Service', content: 'Welcome to our service...', section: 'intro', order: 1 },
      { language: 'en', title: '1. Acceptance of Terms', content: 'By accessing and using this service...', section: 'terms', order: 2 },
      { language: 'en', title: '2. Use License', content: 'Permission is granted to temporarily...', section: 'terms', order: 3 },
      // Swedish terms
      { language: 'sv', title: 'Användarvillkor', content: 'Välkommen till vår tjänst...', section: 'intro', order: 1 },
      { language: 'sv', title: '1. Acceptans av villkor', content: 'Genom att få tillgång till och använda denna tjänst...', section: 'terms', order: 2 },
      { language: 'sv', title: '2. Användningslicens', content: 'Tillstånd ges att tillfälligt...', section: 'terms', order: 3 },
    ];
    await Terms.bulkCreate(termsData);
  }

  if (productsCount === 0) {
    // Seed Products data (20+ items)
    const productsData = [];
    for (let i = 1; i <= 25; i++) {
      productsData.push({
        articleNo: `123456789${i.toString().padStart(2, '0')}`,
        productService: i === 1 ? 'This is a test product with fifty characters this!' : 
                       i === 2 ? 'Sony DSLR 12345' : 
                       `Random product ${i}`,
        inPrice: 1500800 + (i * 1000),
        price: 1500800 + (i * 1500),
        unit: 'kilometers/hour',
        inStock: 1500800 + (i * 100),
        description: `This is the description with fifty characters this ${i}`
      });
    }
    await Product.bulkCreate(productsData);
  }
}

const start = async () => {
  try {
    await connectDB();
    await seedData();
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();