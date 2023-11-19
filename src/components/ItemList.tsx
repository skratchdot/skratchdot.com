import Link from 'next/link';
import React from 'react';

type ItemListProps = {
  items: Array<string>;
  linkPrefix: string;
  title: string;
};

const ItemList = ({ items, linkPrefix, title }: ItemListProps) => {
  if (items.length) {
    return (
      <div className="clearfix sublist">
        <div className="sublist-title">
          <strong>
            <em>{title}:</em>
          </strong>
        </div>
        <div>
          {items.map((item, number) => (
            <React.Fragment key={item}>
              <Link href={`${linkPrefix}${item}`}>{item}</Link>
              {number < items.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ItemList;
