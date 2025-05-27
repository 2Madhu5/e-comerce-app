const { app } = require('@azure/functions');
const sql = require('mssql');

// 👇 Replace these with your actual SQL server credentials
const config = {
    user: 'madhu',  // <-- Enter your SQL server username
    password: 'Subhash@123',  // <-- Enter your SQL server password
    server: 'subhasheco.database.windows.net',  // <-- Example: madhuserver.database.windows.net
    database: 'madhudb',  // <-- Enter your database name (e.g., madhudb)
    options: {
        encrypt: true, // required for Azure
        enableArithAbort: true
    }
};

app.http('submitorder', {
    methods: ['POST' , 'GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Submit order function called with url "${request.url}"`);

        const order = await request.json().catch(() => null);

        if (!order || !order.productId || !order.quantity) {
            return {
                status: 400,
                body: "Invalid order data. Please provide 'productId' and 'quantity'."
            };
        }

        try {
            // 👇 Connect to Azure SQL Database
            await sql.connect(config);

            // 👇 Insert order into the Orders table
            const result = await sql.query`
                INSERT INTO Orders (ProductId, Quantity) 
                VALUES (${order.productId}, ${order.quantity})`;

            return {
                status: 200,
                body: `Order received and saved: Product ID ${order.productId}, Quantity ${order.quantity}`
            };
        } catch (err) {
            context.log('SQL Error:', err);
            return {
                status: 500,
                body: 'Failed to save order to database.'
            };
        }
    }
});

