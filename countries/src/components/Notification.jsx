/** @format */

const Notification = ({ message, type }) => {
  const styles = {
    text: {
      fontWeight: "bold",
      color: type === "error" ? "red" : type === "success" ? "green" : "orange",
    },
  };

  return (
    <div>
      <p style={styles.text}>{message}</p>
    </div>
  );
};

export default Notification;
