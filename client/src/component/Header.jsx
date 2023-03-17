import { AppBar, Toolbar, styled } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "@mui/material";
import { useState } from 'react';
import InfoModal from "./InfoModal";
const StyledApp = styled(AppBar)`
  background: #000;
  height: 60px;
  position: sticky;
  z-index: 1000;
  top: 0;
`;

const MenuIcon = styled(Menu)`
  text-align: center;
  border:none;
`;

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <StyledApp position="relative">
      <Toolbar>
        <MenuIcon onClick={() => {
              setModalOpen(true);
            }}
        />
        
        {modalOpen && (
            <InfoModal
              closeModalCallback={() => setModalOpen(false)}
            />
          )}
        <h2 style={{ margin: "auto" }}>Real Time Text Editor</h2>
        <Link
          style={{ textAlign: "right", color: "#fff" }}
          href="https://github.com/aniketsingh10/Real-Time-Text-Editor"
          target="_blank"
        >
          {" "}
          Github{" "}
        </Link>
      </Toolbar>
    </StyledApp>
  );
};

export default Header;
