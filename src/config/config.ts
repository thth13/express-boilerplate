export const mongoUri =
  process.env.mongoURI || 'mongodb://localhost:27017/databasename'
export const port = process.env.PORT || 8000
export const jwtSecret = process.env.JWT_SECRET || 'secretKeyy'
