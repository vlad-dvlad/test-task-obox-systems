import styles from './hint-modal.module.scss';

const HintContent = () => {
  return (
    <div className={styles.textHint}>
      <span>
        You have entered the Hall of Zero Limits. Great things lie ahead for all
        who open themselves to finding their gift.
      </span>
      <span>
        This is an ever-changing space for creativity and growth. Here, you will
        find new insights and tools to help inspire you. After all, inspiration
        is the water every gift needs to grow.
      </span>
    </div>
  );
};

export default HintContent;
