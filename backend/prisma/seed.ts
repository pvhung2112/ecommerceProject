import { prisma } from '../src/infrastructure/database/prisma.client';

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Roles (ADMIN, SELLER, CUSTOMER)
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Quản trị viên toàn quyền hệ thống',
    },
  });

  const sellerRole = await prisma.role.upsert({
    where: { name: 'SELLER' },
    update: {},
    create: {
      name: 'SELLER',
      description: 'Người bán hàng / Chủ shop',
    },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: 'CUSTOMER' },
    update: {},
    create: {
      name: 'CUSTOMER',
      description: 'Khách hàng mua sắm',
    },
  });

  console.log('✅ Roles seeded successfully!');

  // 2. Seed Users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      name: 'Nguyen Van Admin',
      email: 'admin@ecommerce.com',
      password: 'hashed_password_123', // Tạm thời dùng password mẫu
      roleId: adminRole.id,
    },
  });

  const sellerUser = await prisma.user.upsert({
    where: { email: 'seller@ecommerce.com' },
    update: {},
    create: {
      name: 'Tran Thi Seller',
      email: 'seller@ecommerce.com',
      password: 'hashed_password_123',
      roleId: sellerRole.id,
    },
  });

  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@ecommerce.com' },
    update: {},
    create: {
      name: 'Le Van Customer',
      email: 'customer@ecommerce.com',
      password: 'hashed_password_123',
      roleId: customerRole.id,
    },
  });

  console.log('✅ Users seeded successfully!');

  // 3. Seed Products (thuộc sở hữu của Seller)
  const products = [
    {
      name: 'MacBook Pro 16 inch M3 Max',
      price: 3499.00,
      userId: sellerUser.id,
    },
    {
      name: 'iPhone 16 Pro Max 256GB',
      price: 1199.00,
      userId: sellerUser.id,
    },
    {
      name: 'Tai nghe Sony WH-1000XM5',
      price: 399.99,
      userId: sellerUser.id,
    },
  ];

  for (const prod of products) {
    // Tìm xem product có trùng tên và userId chưa, nếu chưa có thì tạo
    const existing = await prisma.product.findFirst({
      where: { name: prod.name, userId: prod.userId },
    });
    if (!existing) {
      await prisma.product.create({
        data: prod,
      });
    }
  }

  console.log('✅ Products seeded successfully!');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  });
