import React from 'react';
import TrasactionListItem from '../TransactionListItem';
import DateItem from '../DateItem';
import { normalizeTransactionsData } from '../../utils/fn';

const Transactions = ({ transactions }) => {
  let data = transactions.length ? normalizeTransactionsData(transactions) : [];

  return (
    <div>
      <ul>
        {data.map(({ key, value }, index) => (
          // no shorthand because of the key prop
          <React.Fragment key={`day_${index}`}>
            <DateItem date={key} />
            {value.map(transaction => <TrasactionListItem key={transaction.id} {...transaction} />)}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;