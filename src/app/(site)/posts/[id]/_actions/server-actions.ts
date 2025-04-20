"use server"

import postService from "@/services/post-service"

export const hitPageViewsAction = async (id: string) => postService.hitPageViews(id)
