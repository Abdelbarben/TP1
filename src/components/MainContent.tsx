import styles from './MainContent.module.css';

interface Column {
  id: string;
  title: string;
  tasks: string[];
}

interface Props {
  columns: Column[];
}

export default function MainContent({ columns }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.board}>
        {columns.map(col => (
          <div key={col.id} className={styles.column}>
            <h3>{col.title} ({col.tasks.length})</h3>
            {col.tasks.map((task, i) => (
              <div key={i} className={styles.card}>{task}</div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}