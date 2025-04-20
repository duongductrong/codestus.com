"use client"

import { useEffect } from "react"
import { hitPageViewsAction } from "../_actions/server-actions"

export interface HitPageViewsProps {
  id: string
}

export const HitPageViews = ({ id }: HitPageViewsProps) => {
  useEffect(() => {
    ;(async () => {
      await hitPageViewsAction(id)
    })()
  }, [id])
  return null
}
