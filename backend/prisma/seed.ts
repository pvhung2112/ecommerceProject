import { prisma } from '../src/shared/database/prisma.client';

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

  // 2. Seed Categories
  const techCategory = await prisma.category.upsert({
    where: { slug: 'dien-tu-cong-nghe' },
    update: {},
    create: {
      title: 'Điện tử & Công nghệ',
      slug: 'dien-tu-cong-nghe',
      description: 'Các thiết bị công nghệ, điện thoại, máy tính',
      status: 'active',
    },
  });

  const fashionCategory = await prisma.category.upsert({
    where: { slug: 'thoi-trang-phu-kien' },
    update: {},
    create: {
      title: 'Thời trang & Phụ kiện',
      slug: 'thoi-trang-phu-kien',
      description: 'Quần áo, giày dép, phụ kiện thời trang',
      status: 'active',
    },
  });

  console.log('✅ Categories seeded successfully!');

  // 3. Seed Users & Profiles & Accounts
  const usersData = [
    {
      email: 'admin@ecommerce.com',
      roleId: adminRole.id,
      fullName: 'Nguyễn Văn Admin',
      phone: '0901234567',
      address: 'Hà Nội, Việt Nam',
    },
    {
      email: 'seller@ecommerce.com',
      roleId: sellerRole.id,
      fullName: 'Trần Thị Seller',
      phone: '0912345678',
      address: 'Đà Nẵng, Việt Nam',
    },
    {
      email: 'customer@ecommerce.com',
      roleId: customerRole.id,
      fullName: 'Lê Văn Customer',
      phone: '0923456789',
      address: 'TP. Hồ Chí Minh, Việt Nam',
    },
  ];

  let sellerUserId = '';

  for (const u of usersData) {
    let user = await prisma.user.findUnique({
      where: { email: u.email },
      include: { profile: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: u.email,
          status: 'active',
          roleId: u.roleId,
          profile: {
            create: {
              fullName: u.fullName,
              phone: u.phone,
              address: u.address,
            },
          },
          account: {
            create: {
              provider: 'local',
              providerAccountId: u.email,
              password: 'hashed_password_123',
            },
          },
        },
        include: { profile: true },
      });
    }

    if (u.email === 'seller@ecommerce.com') {
      sellerUserId = user.id;
    }
  }

  console.log('✅ Users, Profiles, and Accounts seeded successfully!');

  // 4. Seed Products
  const products = [
    {
      name: 'MacBook Pro 16 inch M3 Max',
      slug: 'macbook-pro-16-inch-m3-max',
      description: 'Laptop đỉnh cao cho lập trình viên và nhà sáng tạo nội dung chuyên nghiệp.',
      price: 3499.00,
      originalPrice: 3899.00,
      stock: 15,
      status: 'active',
      userId: sellerUserId,
      categoryId: techCategory.id,
    },
    {
      name: 'iPhone 16 Pro Max 256GB',
      slug: 'iphone-16-pro-max-256gb',
      description: 'Smartphone cao cấp với chip A18 Pro và camera nâng cấp toàn diện.',
      price: 1199.00,
      originalPrice: 1299.00,
      stock: 30,
      status: 'active',
      userId: sellerUserId,
      categoryId: techCategory.id,
    },
    {
      name: 'Tai nghe Sony WH-1000XM5',
      slug: 'tai-nghe-sony-wh-1000xm5',
      description: 'Tai nghe chống ồn chủ động tốt nhất thị trường với âm thanh Hi-Res.',
      price: 399.99,
      originalPrice: 449.99,
      stock: 50,
      status: 'active',
      userId: sellerUserId,
      categoryId: techCategory.id,
    },
  ];

  for (const prod of products) {
    const existing = await prisma.product.findFirst({
      where: { slug: prod.slug },
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
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
