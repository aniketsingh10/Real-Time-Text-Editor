import { Box, styled, Typography } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  background: "grey",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  height: 48,
  position:"sticky",
  top:0,
  zIndex:10,
}));

const Text = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  margin-left: 2rem;
  font-family: "Roboto", sans-serif;
`;

const InfoHeader = () => {
  return (
    <Container>
      <Text>Author :- Aniket Singh </Text>
    </Container>
  );
};

export default InfoHeader;
