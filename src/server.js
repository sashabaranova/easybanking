import { createServer, Model } from 'miragejs';
import formatRFC3339 from 'date-fns/formatRFC3339';


export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,
    namespace: 'api/v1/',

    models: {
      account: Model,
      transaction: Model
    },

    seeds(server) {
      server.db.loadData({
        accounts: [
          { name: 'Account 1', balance: 1000.00, currency: 'USD', id: 1 },
          { name: 'Account 2', balance: 5000.00, currency: 'USD', id: 2 },
          { name: 'Savings Account', balance: 0.00, currency: 'USD', id: 3 },
        ],
        transactions: [
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-04-20T10:00:00.000Z', id: 1, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-04-21T10:00:00.000Z', id: 2, accountId: 1 },
          { action: 'debit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-04-21T10:00:00.000Z', id: 3, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-04-22T10:00:00.000Z', id: 4, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-04-30T10:00:00.000Z', id: 5, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-05-11T10:00:00.000Z', id: 6, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-05-12T10:00:00.000Z', id: 7, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-05-25T10:00:00.000Z', id: 8, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-05-25T10:00:00.000Z', id: 9, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-05-27T10:00:00.000Z', id: 10, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-05-27T10:00:00.000Z', id: 11, accountId: 1 },
          { action: 'debit', desc: 'Incoming transfer', amount: 10, currency: 'USD', timestamp: '2021-05-28T10:00:00.000Z', id: 12, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-05-28T10:00:00.000Z', id: 13, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-05-28T10:00:00.000Z', id: 14, accountId: 1 },
          { action: 'debit', desc: 'Incoming transfer', amount: 10, currency: 'USD', timestamp: '2021-06-10T10:00:00.000Z', id: 15, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-13T10:00:00.000Z', id: 16, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-17T10:00:00.000Z', id: 17, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-18T16:00:00.000Z', id: 18, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-18T19:00:00.000Z', id: 19, accountId: 1 },
          { action: 'debit', desc: 'Incoming transfer', amount: 10, currency: 'USD', timestamp: '2021-06-19T13:00:00.000Z', id: 20, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: 10, currency: 'USD', timestamp: '2021-06-20T10:00:00.000Z', id: 21, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-21T07:00:00.000Z', id: 22, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-21T08:00:00.000Z', id: 23, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-21T10:00:00.000Z', id: 24, accountId: 1 },
          { action: 'debit', desc: 'Incoming transfer', amount: 10, currency: 'USD', timestamp: '2021-06-21T11:53:00.000Z', id: 25, accountId: 1 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-22T09:00:00.000Z', id: 26, accountId: 2 },
          { action: 'credit', desc: 'Payment', amount: -10, currency: 'USD', timestamp: '2021-06-22T10:00:00.000Z', id: 27, accountId: 1 },
        ]
      })
    },

    routes() {
      this.get('/accounts', (schema) => {
        return schema.db.accounts
      })

      this.post('/accounts', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        return schema.db.accounts.insert(attrs)
      })

      this.get('/accounts/:id', (schema, request) => {
        const accountId = request.params.id
        return schema.db.accounts.find(accountId)
      })

      this.get('/transactions/:accountId', (schema, request) => {
        const { limit, lastId } = request.queryParams;
        const id = parseInt(request.params.accountId);
        //sort dates in descending order
        const transactions = schema.db.transactions.filter(({ accountId }) => accountId === id)
          .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
        if (lastId === 'undefined') {
          return {
            transactions: transactions.splice(0, parseInt(limit)),
            hasMore: transactions.length > parseInt(limit)
          };
        } else {
          const nextBatchIndex = transactions.findIndex(item => item.id === parseInt(lastId));
          const nextBatch = transactions.splice(nextBatchIndex, nextBatchIndex + parseInt(limit))
          const hasMore = !!transactions[nextBatchIndex + parseInt(limit)];
          return {
            transactions: nextBatch,
            hasMore
          };
        }
      })

      this.post('/transactions', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const { accountFrom, accountTo, amount, description, currency } = attrs;

        const balance = schema.db.accounts.find(parseInt(accountFrom)).balance;
        // custom response to handle Mirage js issue
        if (balance < amount) {
          return { httpStatus: 400, message: 'You don\'t have enough funds.' };
        } else {
          const balanceTo = schema.db.accounts.find(parseInt(accountTo)).balance;
          // update balance
          schema.db.accounts.update(parseInt(accountFrom), { balance: balance - amount });
          schema.db.accounts.update(parseInt(accountTo), { balance: balanceTo + amount });

          const timestamp = formatRFC3339(new Date());
          const transactions = schema.db.transactions;
          let id = parseInt(transactions[transactions.length - 1].id);
          // adding new transactions to db
          schema.db.transactions.insert({ id: id + 1, action: 'credit', desc: description, amount: - amount, currency, accountId: parseInt(accountFrom), timestamp });
          schema.db.transactions.insert({ id: id + 2, action: 'debit', desc: description, amount, currency, accountId: parseInt(accountTo), timestamp });

          return { httpStatus: 201, message: 'Transaction successful.' };
        }
      })
    },
  })

  return server
}