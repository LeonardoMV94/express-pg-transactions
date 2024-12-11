if (!process.env.DATABASE_URL) {
  console.log('env DATABASE_URL not found')
  process.exit(1)
}

const envs = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000
}

module.exports = envs
