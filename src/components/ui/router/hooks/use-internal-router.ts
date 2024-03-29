import { useContext } from "react"
import { RouterContext } from "../providers/router-provider"

export const useInternalRouter = () => useContext(RouterContext)
