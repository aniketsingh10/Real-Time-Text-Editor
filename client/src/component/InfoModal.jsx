import styles from "./InfoModal.module.css";

function InfoModal({ closeModalCallback }) {
  return (
    <div className={styles.InfoModal}>
      <div className={styles.container}>
        <div className={`${styles.form} ${styles.login}`}>
          <div className={styles.title}>
            <h1>Real-Time Text Editor</h1>
          </div>

          <div className={styles.body}>
            <p>
              A real-time text editor is a software tool that allows users to
              create, edit, and format text in real-time
            </p>
            <p>
              You can connect with multiple users and work on the same document simultaneously
              with unique link, making it easier to collaborate on projects,
              share ideas, and make changes in real-time
            </p>
            <p>
              <p>Note :- The document may take some time to load </p>
            </p>
          </div>
          <div className={styles.buttons}>
              <input
                className={styles.backButton}
                onClick={closeModalCallback}
                type="button"
                value="Back"
              />
        </div>
      </div>
    </div>
  </div>
  );
}

export default InfoModal;
