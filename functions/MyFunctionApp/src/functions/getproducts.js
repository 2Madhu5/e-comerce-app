const { app } = require('@azure/functions');
const sql = require('mssql');

// SQL connection config
const config = {
    user: 'madhu',
    password: 'Subhash@123',
    server: 'subhasheco.database.windows.net',
    database: 'madhudb',
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

app.http('getproducts', {
    methods: ['GET' , 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Get products function called at "${request.url}"`);

        try {
            await sql.connect(config);
            const result = await sql.query`SELECT * FROM Products`;  // Make sure your DB has this table

            return {
                status: 200,
                jsonBody: result.recordset
            };
        } catch (err) {
            context.log('SQL Error:', err);
            return {
                status: 500,
                body: 'Failed to fetch products from database.'
            };
        }
    }
});

