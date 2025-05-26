/** @format */

const Notification = ({ msg }) => {
  const styles = {
    text: {
      fontWeight: "bold",
    },
    error: {
      color: "red",
    },
    success: {
      color: "green",
    },
    warning: {
      color: "orange",
    },
  };

  if (msg === null) return null;

  return (
    <div style={styles.text}>
      <p
        style={
          msg.type === "error"
            ? styles.error
            : msg.type === "warning"
            ? styles.warning
            : styles.success
        }
      >
        {msg.text}
      </p>
    </div>
  );
};

export default Notification;
