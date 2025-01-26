import { Button, Typography, Result } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function NotFound() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); 
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <img
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?t=st=1737929731~exp=1737933331~hmac=5288b59e0f4ffe877669d1724d3785eb4114fb2bb6c725c7f95ba0d5bd80c370&w=740"
        alt="404 illustration"
        style={{
          maxWidth: "100%",
          height: "80%",
          marginBottom: 20,
          objectFit: "contain",
        }}
      />
      <Result
        title={<Title level={1} style={{ fontSize: "36px" }}>404</Title>}
        subTitle={
          <Paragraph style={{ fontSize: "16px", color: "rgba(0,0,0,0.45)" }}>
            Sorry, the page you visited does not exist.
          </Paragraph>
        }
        extra={
          <Button type="primary" size="large" onClick={handleBackHome}>
            Back to Home
          </Button>
        }
        style={{
          textAlign: "center",
          padding: 0,
        }}
      />
    </div>
  );
}
