export const isProduction = () => process.env.APP_ENV === "production"
export const isDevelopment = () => process.env.APP_ENV === "development"

export const environmentMode = {
  production: isProduction,
  development: isDevelopment,
}
