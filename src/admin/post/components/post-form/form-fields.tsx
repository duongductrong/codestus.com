"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  TiptapButton,
  TiptapContent,
  TiptapDivider,
  TiptapDropdown,
  TiptapEditor,
  TiptapLabel,
  TiptapToolbar,
} from "@/components/ui/tiptap/tiptap"
import { Control, FieldErrors } from "react-hook-form"
import slugify from "slugify"
import { PostFormValues } from "../../schema/post-form"

interface FormFieldsProps {
  control: Control<PostFormValues>
  errors: FieldErrors<PostFormValues>
  autoGenerateSlug?: boolean
  isSubmitting?: boolean
  topActions?: React.ReactNode
  bottomActions?: React.ReactNode
}

export function FormFields({
  control,
  errors,
  autoGenerateSlug,
  isSubmitting,
  topActions,
  bottomActions,
}: FormFieldsProps) {
  return (
    <main className="space-y-4 grid grid-cols-[1fr_300px] gap-8">
      <article>
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TiptapEditor
                  onUpdate={(e) => {
                    field.onChange(e.editor.storage.markdown.getMarkdown())
                  }}
                  content={field.value as string}
                >
                  <TiptapToolbar className="sticky top-[47px] p-4 justify-center mb-8 bg-background z-10">
                    <TiptapButton action="undo">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapButton action="redo">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapDivider />
                    <TiptapDropdown
                      actions={[
                        "paragraph",
                        "heading1",
                        "heading2",
                        "heading3",
                        "heading4",
                        "heading5",
                        "heading6",
                        "divider",
                        "codeBlock",
                        "blockquote",
                      ]}
                    >
                      <TiptapLabel label=":icon :label" />
                    </TiptapDropdown>
                    <TiptapDivider />
                    <TiptapButton action="bold">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapButton action="italic">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapButton action="underline">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapButton action="strike">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapButton action="image">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapDivider />
                    <TiptapButton action="left">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapButton action="center">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapButton action="right">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapButton action="justify">
                      <TiptapLabel label=":icon" />
                    </TiptapButton>
                    <TiptapDropdown actions={["left", "center", "right", "justify"]}>
                      <TiptapLabel label=":icon :label" />
                    </TiptapDropdown>
                    <TiptapDivider />
                  </TiptapToolbar>
                  <TiptapContent className="prose dark:prose-invert max-w-full min-h-[500px] [&>.tiptap]:pb-52" />
                </TiptapEditor>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </article>

      <aside className="flex flex-col gap-4 sticky top-16 self-start">
        {topActions}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter post title"
                  {...field}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    field.onChange(e)
                    if (autoGenerateSlug) {
                      control._formValues.slug = slugify(e.target.value.toLowerCase())
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter post slug"
                  {...field}
                  disabled={autoGenerateSlug || isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select post status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value as string}
                  placeholder="Enter thumbnail URL"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value as string}
                  placeholder="Enter post description"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {bottomActions}
      </aside>
    </main>
  )
}
