import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Better Auth tables with admin plugin support
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  image: text("image"),
  role: text("role").default("user"), // Admin plugin: 'user' or 'admin'
  banned: integer("banned", { mode: "boolean" }).default(false), // Admin plugin: ban status
  banReason: text("ban_reason"), // Admin plugin: reason for ban
  banExpires: integer("ban_expires", { mode: "timestamp" }), // Admin plugin: ban expiration
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"), // Admin plugin: tracks admin impersonation
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Categories for Services and Blog Posts
export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Business Services
export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content"),
  icon: text("icon"),
  slug: text("slug").notNull().unique(),
  order: integer("order").default(0),
  categoryId: text("category_id").references(() => categories.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Blog Posts / Insights
export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  published: integer("published", { mode: "boolean" }).default(false),
  category: text("category").references(() => categories.id),
  authorId: text("author_id").references(() => user.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Leads / Consultation Inquiries
export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  companyName: text("company_name"),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull(),
  service: text("service"),
  description: text("description"),
  status: text("status").default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// FAQ Section
export const faqs = sqliteTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Testimonials
export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  role: text("role"),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  avatar: text("avatar"),
  approved: integer("approved", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Site Settings (Company Profile, etc.)
export const settings = sqliteTable("settings", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(), // e.g., 'company_profile_url'
  value: text("value"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Pricing Packages
export const pricingPackages = sqliteTable("pricing_packages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(), // e.g., 'Micro Mentoring'
  revenue: text("revenue").notNull(), // e.g., '< Rp 8 Miliar'
  price: text("price").notNull(), // e.g., 'Rp 2.000.000'
  period: text("period"), // e.g., '/bulan'
  focus: text("focus").notNull(), // Focus description
  icon: text("icon"), // Icon name
  popular: integer("popular", { mode: "boolean" }).default(false),
  color: text("color"), // e.g., 'border-emerald-500'
  buttonColor: text("button_color"), // e.g., 'bg-emerald-500 hover:bg-emerald-600'
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Industry Sectors (Bidang Usaha)
export const industrySectors = sqliteTable("industry_sectors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Scope of Work Categories
export const scopeCategories = sqliteTable("scope_categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(), // e.g., 'Aspek Pembukuan'
  description: text("description"),
  icon: text("icon"), // Icon name
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Scope of Work Items
export const scopeItems = sqliteTable("scope_items", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").references(() => scopeCategories.id),
  title: text("title").notNull(), // e.g., 'Mengajari'
  description: text("description").notNull(),
  icon: text("icon"), // Icon name
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Service Guarantees
export const guarantees = sqliteTable("guarantees", {
  id: text("id").primaryKey(),
  title: text("title").notNull(), // e.g., 'Transfer Knowledge'
  description: text("description").notNull(),
  icon: text("icon"), // Icon name
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
