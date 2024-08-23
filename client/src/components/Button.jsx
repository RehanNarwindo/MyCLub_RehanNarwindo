import Button from "react-bootstrap/Button";

function ButtonComponent({ buttonType, buttonVatiant, type }) {
  return (
    <>
      <Button variant={buttonVatiant} type={type}>
        {buttonType}
      </Button>
    </>
  );
}

export default ButtonComponent;
