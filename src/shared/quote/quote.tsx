import { type FC } from 'react';
import styles from './quote.module.scss';

interface IProps {
  title: string;
  quote: string;
  author: string;
}

const Quote: FC<IProps> = ({ title, quote, author }) => {
  return (
    <div className={styles.quoteBlock}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.author}>{author}</p>
      <p className={styles.text}>{quote}</p>
    </div>
  );
};

export default Quote;
