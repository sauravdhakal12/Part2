const DisplayMessage = ({ message }) => {
  if (message.message === null) {
    return null;
  }

  return <div className={message.type}>{message.message}</div>;
};

export default DisplayMessage;
