import { relations } from "drizzle-orm"
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

/**
 *
 * ==============================
 * Primary Tables
 * ==============================
 */

export const topicTable = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export const tagTable = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export const postStatus = pgEnum("post_status", ["draft", "published"])

export const postTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  content: text("content"),
  views: integer("views").default(0),
  status: postStatus("status").notNull().default("draft"),
  publishAt: timestamp("publish_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

  topicId: integer("topic_id").references(() => topicTable.id, { onDelete: "set null" }),
})

/**
 *
 * ==============================
 * Relations Tables
 * ==============================
 */

export const postTagsTable = pgTable("post_tags", {
  id: serial("id").primaryKey(),
  postId: serial("post_id")
    .notNull()
    .references(() => postTable.id),
  tagId: serial("tag_id")
    .notNull()
    .references(() => tagTable.id),
})

export const tagRelations = relations(tagTable, ({ many }) => ({
  posts: many(postTagsTable),
}))

export const postRelations = relations(postTable, ({ many, one }) => ({
  tags: many(postTagsTable),
  topic: one(topicTable, {
    fields: [postTable.topicId],
    references: [topicTable.id],
  }),
}))

export const postTagsRelations = relations(postTagsTable, ({ one }) => ({
  post: one(postTable, {
    fields: [postTagsTable.postId],
    references: [postTable.id],
  }),
  tag: one(tagTable, {
    fields: [postTagsTable.tagId],
    references: [tagTable.id],
  }),
}))

export const topicRelations = relations(topicTable, ({ many }) => ({
  posts: many(postTable),
}))

export const userTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  password: text("password").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

/**
 *
 * ==============================
 * Table Types
 * ==============================
 */

export type Post = typeof postTable.$inferSelect
export type Tag = typeof tagTable.$inferSelect
export type PostTag = typeof postTagsTable.$inferSelect
export type Topic = typeof topicTable.$inferSelect
export type User = typeof userTable.$inferSelect
export type NewUser = typeof userTable.$inferInsert
