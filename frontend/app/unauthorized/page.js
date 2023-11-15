import Link from 'next/link';
import styles from './Unauthorized.module.css'; // Assuming you have a CSS module for this component

export default function Unauthorized() {
  return (
    <main className={styles.container}>
      <div>
        <h1>401 - Unauthorized</h1>
        <p>You do not have permissions to view this page.</p>
        <Link href="/">Click here to return to home.</Link>
      </div>
    </main>
  );
}