export default () => ({
    db_port: process.env.DATABASE_PORT,
    db_name: process.env.DATABASE_NAME,
    db_user: process.env.DATABASE_USERNAME,
    db_password: process.env.DATABASE_PASSWORD,
    db_host: process.env.DATABASE_HOST,
})